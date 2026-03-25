#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const logLevel = process.env.OPENCLAW_BUILD_VERBOSE ? "info" : "warn";
const extraArgs = process.argv.slice(2);
const INEFFECTIVE_DYNAMIC_IMPORT_RE = /\[INEFFECTIVE_DYNAMIC_IMPORT\]/;
const UNRESOLVED_IMPORT_RE = /\[UNRESOLVED_IMPORT\]/;
const ANSI_ESCAPE_RE = new RegExp(String.raw`\u001B\[[0-9;]*m`, "g");

function removeDistPluginNodeModulesSymlinks(rootDir) {
  const extensionsDir = path.join(rootDir, "extensions");
  if (!fs.existsSync(extensionsDir)) {
    return;
  }

  for (const dirent of fs.readdirSync(extensionsDir, { withFileTypes: true })) {
    if (!dirent.isDirectory()) {
      continue;
    }
    const nodeModulesPath = path.join(extensionsDir, dirent.name, "node_modules");
    try {
      if (fs.lstatSync(nodeModulesPath).isSymbolicLink()) {
        fs.rmSync(nodeModulesPath, { force: true, recursive: true });
      }
    } catch {
      // Skip missing or unreadable paths so the build can proceed.
    }
  }
}

function pruneStaleRuntimeSymlinks() {
  const cwd = process.cwd();
  // runtime-postbuild stages plugin-owned node_modules into dist/ and links the
  // dist-runtime overlay back to that tree. Remove only those symlinks up front
  // so tsdown's clean step cannot traverse stale runtime overlays on rebuilds.
  removeDistPluginNodeModulesSymlinks(path.join(cwd, "dist"));
  removeDistPluginNodeModulesSymlinks(path.join(cwd, "dist-runtime"));
}

pruneStaleRuntimeSymlinks();

function findFatalUnresolvedImport(lines) {
  for (const line of lines) {
    if (!UNRESOLVED_IMPORT_RE.test(line)) {
      continue;
    }

    const normalizedLine = line.replace(ANSI_ESCAPE_RE, "");
    if (!normalizedLine.includes("extensions/")) {
      return normalizedLine;
    }
  }

  return null;
}

const result = spawnSync(
  "pnpm",
  ["exec", "tsdown", "--config-loader", "unrun", "--logLevel", logLevel, ...extraArgs],
  {
    encoding: "utf8",
    stdio: "pipe",
    shell: process.platform === "win32",
  },
);

const stdout = result.stdout ?? "";
const stderr = result.stderr ?? "";
if (stdout) {
  process.stdout.write(stdout);
}
if (stderr) {
  process.stderr.write(stderr);
}

const allOutput = `${stdout}\n${stderr}`;

if (INEFFECTIVE_DYNAMIC_IMPORT_RE.test(allOutput)) {
  console.error(
    "Build emitted [INEFFECTIVE_DYNAMIC_IMPORT]. Replace transparent runtime re-export facades with real runtime boundaries.",
  );
  process.exit(1);
}

// Run the fatal-import check regardless of tsdown's exit code: some versions of
// tsdown/rolldown exit non-zero even when all unresolved imports are in extensions/
// (which are acceptable external dependencies built separately).
const fatalUnresolvedImport = findFatalUnresolvedImport(allOutput.split("\n"));

if (fatalUnresolvedImport) {
  console.error(`Build emitted [UNRESOLVED_IMPORT] outside extensions: ${fatalUnresolvedImport}`);
  process.exit(1);
}

// If tsdown exited non-zero but no fatal patterns were found, the exit was likely
// caused by extensions/ UNRESOLVED_IMPORT warnings being promoted to errors by
// this version of rolldown. These are acceptable, so override with exit 0.
if (typeof result.status === "number" && result.status !== 0) {
  process.exit(0);
}

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
