#!/usr/bin/env node
// Confusion matrix for the routing-split cases. The harness keeps only
// pass/fail per grader, so the route each run actually took is read back from
// its trace. That needs the run to have been made with --keep-temp.
//
//   node plugins/trade/evals/scripts/routing-matrix.mjs <results-dir> [<results-dir> ...]
//
// Each results dir holds an aggregate-result.json. Several dirs (for example
// one per parallel shard) are merged. Traces are copied into
// <results-dir>/traces/ so the numbers survive a /tmp cleanup; a later
// re-run reads the copy. Exits 1 if any run's trace is missing.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dirs = process.argv.slice(2);
if (dirs.length === 0) {
  console.error("usage: routing-matrix.mjs <results-dir> [<results-dir> ...]");
  process.exit(1);
}
const evals = join(dirname(fileURLToPath(import.meta.url)), "..");
const labels = Object.fromEntries(
  JSON.parse(readFileSync(join(evals, "routing-split", "cases.json"), "utf8")).map((c) => [`split-${c.id}`, c]),
);
// daily-lookup shares daily.md, so the matrix scores it as daily; the lookup
// judge is reported as its own column. "none" means no commands file was read
// at all: correct only for the no-argument menu, otherwise the skill either
// never fired or fired and answered without loading its subcommand.
const ROUTE = (label) => ({ "daily-lookup": "daily", menu: "none" })[label] ?? label;
const COMMANDS = /references\/commands\/(\w+)\.md$/;

const rows = [];
let missing = 0;
for (const dir of dirs) {
  const agg = JSON.parse(readFileSync(join(dir, "aggregate-result.json"), "utf8"));
  for (const c of agg.cases) {
    const meta = labels[c.name];
    if (!meta) continue;
    (c.arms.with ?? []).forEach((run, i) => {
      const kept = join(dir, "traces", `${c.name}_rep${i}.jsonl`);
      const src = existsSync(kept) ? kept : run.tracePath;
      if (!src || !existsSync(src)) {
        console.error(`missing trace: ${c.name} rep ${i} (${run.tracePath}); was the run made with --keep-temp?`);
        missing++;
        return;
      }
      if (src !== kept) {
        mkdirSync(join(dir, "traces"), { recursive: true });
        copyFileSync(src, kept);
      }
      let predicted = "none";
      let toolCalls = 0;
      for (const line of readFileSync(kept, "utf8").split("\n")) {
        if (!line.startsWith('{"type":"assistant"')) continue;
        for (const b of JSON.parse(line).message.content ?? []) {
          if (b.type !== "tool_use") continue;
          toolCalls++;
          const m = typeof b.input?.file_path === "string" && b.input.file_path.match(COMMANDS);
          if (m && predicted === "none") predicted = m[1];
        }
      }
      const skillFired = /"name":"Skill","input":\{"skill":"(?:[\w-]+:)?trade"/.test(readFileSync(kept, "utf8")) || meta.prompt.startsWith("/trade");
      const g = Object.fromEntries(run.graders.map((x) => [x.name, x.passed]));
      rows.push({
        case: c.name,
        rep: i,
        label: meta.label,
        expected: ROUTE(meta.label),
        predicted,
        skill_fired: skillFired,
        route_ok: g["route-first"],
        lookup_ok: g["lookup-not-ladder"],
        error: run.error,
        tool_calls: toolCalls,
        cost_usd: run.costUsd + (run.judgeCostUsd ?? 0),
      });
    });
  }
}
if (missing) process.exit(1);

const routes = ["analysis", "daily", "report", "import", "setup", "none"];
const pct = (n, d) => (d ? `${((100 * n) / d).toFixed(0)}%` : "—");
const ok = rows.filter((r) => !r.error);
const lines = [];
lines.push(`# Routing split: ${ok.length} runs over ${new Set(ok.map((r) => r.case)).size} cases (${rows.length - ok.length} errored, excluded)`, "");
const acc = ok.filter((r) => r.predicted === r.expected).length;
// Wilson 95% interval on accuracy, so a shift can be read against the noise.
const z = 1.96, n = ok.length, p = acc / n;
const mid = (p + (z * z) / (2 * n)) / (1 + (z * z) / n);
const half = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / (1 + (z * z) / n);
lines.push(`**Accuracy ${pct(acc, n)}** (${acc}/${n}, 95% CI ${(100 * (mid - half)).toFixed(0)}–${(100 * (mid + half)).toFixed(0)}%)`, "");
const lk = ok.filter((r) => r.label === "daily-lookup");
if (lk.length) lines.push(`Lookup judge (daily-lookup cases): ${lk.filter((r) => r.lookup_ok).length}/${lk.length} pass`, "");

lines.push("| route | n | precision | recall |", "|---|---|---|---|");
for (const r of routes) {
  const tp = ok.filter((x) => x.expected === r && x.predicted === r).length;
  const pp = ok.filter((x) => x.predicted === r).length;
  const ap = ok.filter((x) => x.expected === r).length;
  lines.push(`| ${r} | ${ap} | ${pct(tp, pp)} | ${pct(tp, ap)} |`);
}
lines.push("", `Confusion matrix (rows = expected, columns = first commands file read):`, "");
const cols = [...routes, ...new Set(ok.map((x) => x.predicted).filter((x) => !routes.includes(x)))];
lines.push(`| expected \\ got | ${cols.join(" | ")} |`, `|---|${cols.map(() => "---").join("|")}|`);
for (const r of routes) lines.push(`| ${r} | ${cols.map((c) => ok.filter((x) => x.expected === r && x.predicted === c).length || "·").join(" | ")} |`);

const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
const cost = rows.reduce((s, r) => s + r.cost_usd, 0);
lines.push("", `Cost $${cost.toFixed(2)} total, $${median(rows.map((r) => r.cost_usd)).toFixed(2)} median/run · tool calls median ${median(ok.map((r) => r.tool_calls))}, max ${Math.max(...ok.map((r) => r.tool_calls))}`);

const wrong = ok.filter((r) => r.predicted !== r.expected || r.lookup_ok === false);
if (wrong.length) {
  lines.push("", "Misses:", "");
  for (const r of wrong) lines.push(`- ${r.case} rep ${r.rep}: expected ${r.expected}, got ${r.predicted}${r.predicted === "none" ? (r.skill_fired ? " (skill fired, no commands file read)" : " (skill never fired)") : ""}${r.lookup_ok === false ? " (lookup judge FAIL)" : ""} — ${labels[r.case].prompt.slice(0, 80).replace(/\n/g, " ")}`);
}
const out = lines.join("\n");
console.log(out);
writeFileSync(join(dirs[0], "routing-matrix.md"), out + "\n");
writeFileSync(join(dirs[0], "routing-matrix.jsonl"), rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
