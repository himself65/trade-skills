#!/usr/bin/env node
// Generates the routing-split cases (split-<id>/) from routing-split/cases.json.
// cases.json is the source of truth: edit a prompt or label there, then re-run:
//
//   node plugins/trade/evals/scripts/build-routing-cases.mjs
//
// Every generated directory is deleted and rewritten, so never hand-edit a
// split-*/ file. Output is deterministic, so a rebuild without edits produces
// no diff.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const evals = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(evals, "routing-split");
const cases = JSON.parse(readFileSync(join(src, "cases.json"), "utf8"));

// The file each label must read first. daily-lookup shares daily.md: the
// one-print lookup protocol lives in its Arguments section.
const FILE = { analysis: "analysis", daily: "daily", "daily-lookup": "daily", report: "report", import: "import", setup: "setup" };

const READ = String.raw`"file_path"\s*:\s*"[^"]*references/commands/`;
// Anchored at the start of the trace; the tempered token refuses to step over
// any earlier commands/*.md Read, so this matches only the FIRST such Read.
const firstRead = (name) => `^(?:(?!${READ})[\\s\\S])*${READ}${name}\\.md"`;

const yamlStr = (s) => JSON.stringify(s);
const grader = (front, body) => `---\n${front.trim()}\n---\n\n${body.trim()}\n`;

const expected = {
  analysis: "Loads references/commands/analysis.md before any other commands/*.md file.",
  daily: "Loads references/commands/daily.md before any other commands/*.md file (the daily-read or single-name capital-flow exception).",
  "daily-lookup": "Loads references/commands/daily.md first and treats the question as a one-print lookup: answers about that print, then offers the full daily ladder instead of running it.",
  report: "Loads references/commands/report.md before any other commands/*.md file (the capital-flow exception or rule 2).",
  import: "Loads references/commands/import.md before any other commands/*.md file (the ingestion exception or rule 2).",
  setup: "Loads references/commands/setup.md before any other commands/*.md file.",
  menu: "Reads no commands/*.md file and renders the commands table as a menu.",
};

for (const d of readdirSync(evals)) if (d.startsWith("split-")) rmSync(join(evals, d), { recursive: true });

for (const c of cases) {
  const dir = join(evals, `split-${c.id}`);
  mkdirSync(join(dir, "graders"), { recursive: true });
  const tags = ["routing-split", c.label, c.source, ...(c.ambiguous ? ["judgment-call"] : [])];
  const desc = `Routing split: ${c.label}.${c.note ? ` ${c.note}.` : ""} Source: ${c.source === "real" ? "a prompt the user actually sent" : "synthesized to fill a thin route"}.`;
  writeFileSync(
    join(dir, "prompt.md"),
    `---\ndescription: ${yamlStr(desc)}\nexpected_outcome: ${yamlStr(expected[c.label])}\ntags: [${tags.join(", ")}]\nmax_turns: 12\ntimeout_seconds: 300\nallowed_tools: [Read, Glob, Grep, Skill]\n---\n\n${c.prompt}\n`,
  );

  if (c.label === "menu") {
    writeFileSync(
      join(dir, "graders", "route-first.md"),
      grader(
        `type: regex\ntarget: trace\npattern: '${READ}'\nmatch: not_contains\nweight: 2`,
        "Routing rule 1: no argument means the menu, so no commands/*.md file is loaded.",
      ),
    );
    writeFileSync(
      join(dir, "graders", "lists-commands.md"),
      grader(
        `type: regex\ntarget: last_message\npattern: '^(?=[\\s\\S]*\\bsetup\\b)(?=[\\s\\S]*\\bimport\\b)(?=[\\s\\S]*\\breport\\b)(?=[\\s\\S]*\\bdaily\\b)(?=[\\s\\S]*\\banalysis\\b)'`,
        "The reply renders the commands table: all five subcommand names appear.",
      ),
    );
  } else {
    writeFileSync(
      join(dir, "graders", "route-first.md"),
      grader(
        `type: regex\ntarget: trace\npattern: '${firstRead(FILE[c.label])}'\nweight: 2`,
        `Routing: the first commands/*.md file Read is ${FILE[c.label]}.md. Reading another commands file first counts as a misroute even if ${FILE[c.label]}.md is read later.`,
      ),
    );
  }

  if (c.label === "daily-lookup") {
    writeFileSync(
      join(dir, "graders", "lookup-not-ladder.md"),
      grader(
        "type: llm",
        `Context: the user asked about one specific print, contract or block: ${JSON.stringify(c.prompt)}. No market-data source was connected in this session, so no real data could be pulled. The expected behavior is a lookup of that one print, not a full daily state report. Length is not a criterion.

PASS if all of these hold:
- The reply stays on that one print or contract. It either says what it would check to identify it (time, size, fill versus the bid/ask, trade code or multi-leg package, the open-interest change, that contract's or expiry's IV), or says it cannot tell without data.
- The full daily read is at most offered as a next step.
- It does not state who traded or why as fact. Hedged possibilities (\"可能\", \"更可能\", \"could be\") and background on the name, such as past earnings moves, a recent convertible or a prior case study, are allowed.

FAIL if the reply is in substance a whole-name daily report or daily plan, meaning it covers two or more of: activity versus the name's own average, GEX or max pain, the dark-pool baseline, a named composite state. Also FAIL if it asserts a buyer, seller or directional intent as fact. Checking the IV of the print's own contract or expiry is part of the lookup and does not count toward the daily report.`,
      ),
    );
  }

  if (c.fixture) {
    mkdirSync(join(dir, "fixtures"));
    cpSync(join(src, "fixtures", c.fixture), join(dir, "fixtures", c.fixture));
    writeFileSync(
      join(dir, "scaffold.sh"),
      `#!/usr/bin/env bash\n# Puts the attachment the prompt @-mentions into the run workspace. The real\n# prompt pointed at ~/Downloads; the fixture is a short stand-in.\nset -euo pipefail\nhere="$(cd "$(dirname "$0")" && pwd)"\ncp "$here/fixtures/${c.fixture}" .\n`,
      { mode: 0o755 },
    );
  }
  if (c.history) {
    cpSync(join(src, "history", c.history), join(dir, "history"), { recursive: true });
    execFileSync(process.execPath, [join(evals, "scripts", "build-history.mjs"), dir]);
  }
  if (c.fixture || c.history) {
    const ctx = [
      c.fixture && "  # Needs --scaffold to place the @-mentioned attachment in the workspace.\n  scaffold_script: scaffold.sh",
      c.history && "  # Built from history/*.md by scripts/build-history.mjs. The prompt is the next user turn.\n  history_file: history.jsonl",
    ].filter(Boolean);
    writeFileSync(join(dir, "case.yaml"), `schema_version: "1.1"\nname: split-${c.id}\ncontext:\n${ctx.join("\n")}\n`);
  }
}
console.log(`wrote ${cases.length} split-* cases`);
