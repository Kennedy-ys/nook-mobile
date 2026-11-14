import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";

const CODE_EXTENSIONS = new Set([
  ".js", ".mjs", ".cjs", ".jsx", ".ts", ".mts", ".cts", ".tsx",
  ".json", ".css", ".scss", ".yml", ".yaml", ".sh", ".code-workspace"
]);
const SKIPPED_FILES = new Set(["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]);
const SELF = "scripts/check-integrity.mjs";
const MAX_LINE_LENGTH = 3000;
const INSTALL_HOOKS = ["preinstall", "install", "postinstall", "prepublish", "preprepare", "postprepare"];
const ALLOWED_PREPARE = new Set(["husky"]);

const HIDDEN_UNICODE = new RegExp(
  "[\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]"
);

const RULES = [
  { name: "code hidden after a long run of spaces", test: line => /\S[ \t]{40,}\S/.test(line) },
  { name: "eval or new Function", test: line => /\beval\s*\(|\bnew\s+Function\s*\(/.test(line) },
  { name: "decoding hidden strings (atob, fromCharCode, Buffer base64)", test: line => /\batob\s*\(|String\.fromCharCode\s*\(|Buffer\.from\([^)]*["']base64["']/.test(line) },
  { name: "long encoded blob", test: line => /[A-Za-z0-9+/]{200,}={0,2}/.test(line) },
  { name: "invisible or bidirectional unicode", test: line => HIDDEN_UNICODE.test(line) },
  { name: "global property set from a string", test: line => /\bglobal(This)?\s*(\.\w+|\["'`][^"'`]+["'`]\])\s*=\s*["'`]/.test(line) },
  { name: `line longer than ${MAX_LINE_LENGTH} characters`, test: line => line.length > MAX_LINE_LENGTH }
];

const ROOT_CONFIG_RULES = [
  { name: "require shim in a config or build script", test: line => /\bcreateRequire\b/.test(line) },
  { name: "process or network access in a config or build script", test: line => /["'](node:)?(child_process|http|https|net|dgram|vm|worker_threads)["']|\bfetch\s*\(/.test(line) }
];

function isRootConfig(path) {
  return (
    path.startsWith("scripts/") ||
    path.startsWith(".husky/") ||
    (!path.includes("/") && /\.config\.|^\.?[\w-]+rc\./.test(path)) ||
    path.startsWith("build/") ||
    path.startsWith("tools/")
  );
}

function rulesFor(path) {
  if (path === SELF) return [...RULES, ROOT_CONFIG_RULES[0]];
  return isRootConfig(path) ? [...RULES, ...ROOT_CONFIG_RULES] : RULES;
}

function filesToScan() {
  const output = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], { encoding: "utf8" });
  return output.split("\0").filter(Boolean).filter(p => !SKIPPED_FILES.has(p)).filter(p => CODE_EXTENSIONS.has(extname(p)) || p.startsWith(".husky/"));
}

function scanFile(path) {
  let text;
  try { text = readFileSync(path, "utf8"); } catch { return []; }
  const rules = rulesFor(path);
  const findings = [];
  text.split(/\r?\n/).forEach((line, idx) => {
    for (const r of rules) if (r.test(line)) findings.push(`${path}:${idx+1}  ${r.name}`);
  });
  return findings;
}

function checkInstallHooks() {
  if (!existsSync("package.json")) return [];
  const { scripts = {} } = JSON.parse(readFileSync("package.json", "utf8"));
  const findings = INSTALL_HOOKS.filter(h => scripts[h]).map(h => `package.json  "${h}" script runs on every npm install`);
  if (scripts.prepare && !ALLOWED_PREPARE.has(scripts.prepare)) findings.push(`package.json  unexpected "prepare" script: ${scripts.prepare}`);
  return findings;
}

function checkEditorTasks(files) {
  return files
    .filter(p => /\.(code-workspace)$/i.test(p) || /\.vscode\/tasks\.json$/.test(p))
    .filter(p => /"runOn"\s*:\s*"folderOpen"/.test(readFileSync(p, "utf8")))
    .map(p => `${p}  task runs automatically when the folder opens`);
}

const files = filesToScan();
const findings = [...files.flatMap(scanFile), ...checkInstallHooks(), ...checkEditorTasks(files)];

if (findings.length > 0) {
  console.error("Integrity check failed. Possible injected code:\n");
  for (const f of findings) console.error(`  ${f}`);
  console.error("\nDo not run the app. Compare these files with the last known good commit before continuing.");
  process.exit(1);
}

console.log(`Integrity check passed: ${files.length} files scanned, no injected code found.`);
