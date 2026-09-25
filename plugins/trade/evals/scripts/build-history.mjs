#!/usr/bin/env node
// Builds <case>/history.jsonl, the transcript `context.history_file` resumes,
// from the readable turns in <case>/history/*.md. Files are taken in name
// order; a name containing "assistant" is an assistant turn, anything else a
// user turn. Edit the .md files, then re-run:
//
//   node plugins/trade/evals/scripts/build-history.mjs plugins/trade/evals/<case>
//
// Output is deterministic (ids derive from the case name and turn index), so a
// rebuild without edits produces no diff.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const caseDir = process.argv[2];
if (!caseDir) {
  console.error("usage: build-history.mjs <case-dir>");
  process.exit(1);
}

const uuid = (seed) => {
  const h = createHash("sha256").update(seed).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
};

const caseName = basename(resolve(caseDir));
const sessionId = uuid(`session:${caseName}`);
const files = readdirSync(join(caseDir, "history"))
  .filter((f) => f.endsWith(".md"))
  .sort();
if (files.length === 0) {
  console.error(`no turns in ${join(caseDir, "history")}`);
  process.exit(1);
}

let parentUuid = null;
const lines = files.map((file, i) => {
  const role = file.includes("assistant") ? "assistant" : "user";
  const text = readFileSync(join(caseDir, "history", file), "utf8").trim();
  const id = uuid(`${caseName}:${i}:${role}`);
  const message =
    role === "user"
      ? { role: "user", content: text }
      : {
          id: `msg_${id.replaceAll("-", "").slice(0, 24)}`,
          type: "message",
          role: "assistant",
          model: "claude-opus-5-5",
          content: [{ type: "text", text }],
          stop_reason: "end_turn",
          stop_sequence: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        };
  const entry = {
    parentUuid,
    isSidechain: false,
    userType: "external",
    entrypoint: "cli",
    cwd: "/workspace",
    sessionId,
    version: "2.1.282",
    type: role,
    message,
    uuid: id,
    timestamp: new Date(Date.UTC(2026, 8, 24, 15, 0, 0) + i * 90_000).toISOString(),
  };
  parentUuid = id;
  return JSON.stringify(entry);
});

writeFileSync(join(caseDir, "history.jsonl"), `${lines.join("\n")}\n`);
console.log(`wrote ${join(caseDir, "history.jsonl")} (${lines.length} turns)`);
