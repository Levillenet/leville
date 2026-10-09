// Post-build: for every static route in App.tsx, write dist/<route>/index.html — a copy of
// dist/index.html plus <link rel="modulepreload"> tags for that route's page chunk and its
// static dependencies. The browser then fetches the page chunk in parallel with the entry
// bundle instead of discovering it only after React has started (removes one request waterfall).
// #root stays empty on purpose (static shells caused a CLS regression).
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const DIST = resolve("dist");
const manifestPath = resolve(DIST, ".vite/manifest.json");
if (!existsSync(manifestPath)) {
  console.log("generate-route-preloads: no manifest, skipping.");
  process.exit(0);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const template = readFileSync(resolve(DIST, "index.html"), "utf8");
const app = readFileSync(resolve("src/App.tsx"), "utf8");

// Entry chunk files are already preloaded by Vite's own tags.
const entry = Object.values(manifest).find((m) => m.isEntry);
const entryFiles = new Set();
const collect = (key, acc, seen = new Set()) => {
  if (seen.has(key) || !manifest[key]) return;
  seen.add(key);
  const m = manifest[key];
  acc.js.add(m.file);
  (m.css || []).forEach((c) => acc.css.add(c));
  (m.imports || []).forEach((k) => collect(k, acc, seen));
};
if (entry) {
  const acc = { js: new Set(), css: new Set() };
  const key = Object.keys(manifest).find((k) => manifest[k] === entry);
  collect(key, acc);
  acc.js.forEach((f) => entryFiles.add(f));
  acc.css.forEach((f) => entryFiles.add(f));
}

// component name -> manifest key
const lazyRe = /const (\w+) = lazy\(\(\) => import\("([^"]+)"\)\);/g;
const componentKey = {};
for (const [, name, spec] of app.matchAll(lazyRe)) {
  const base = "src/" + spec.replace(/^\.\//, "").replace(/^@\//, "");
  const key = [".tsx", ".ts", "/index.tsx"].map((e) => base + e).find((k) => manifest[k]);
  if (key) componentKey[name] = key;
}

const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g;
const skip = new Set(["/", "/seuratuki", "/en/club-support"]); // "/" is index.html itself; social pages own the other two
const written = new Set();
let count = 0;

for (const [, path, comp] of app.matchAll(routeRe)) {
  if (skip.has(path) || written.has(path)) continue;
  if (path.includes(":") || path.includes("*") || path.startsWith("/admin")) continue;
  const key = componentKey[comp];
  if (!key) continue;

  const acc = { js: new Set(), css: new Set() };
  collect(key, acc);
  const js = [...acc.js].filter((f) => !entryFiles.has(f));
  const css = [...acc.css].filter((f) => !entryFiles.has(f));
  if (!js.length) continue;

  const tags = [
    ...js.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
    ...css.map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
  ].join("\n    ");

  const html = template.replace("</head>", `    ${tags}\n  </head>`);
  const out = resolve(DIST, path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written.add(path);
  count++;
}

// The manifest is a build artefact; do not publish it.
rmSync(resolve(DIST, ".vite"), { recursive: true, force: true });
console.log(`generate-route-preloads: wrote ${count} route HTML files with page-chunk preloads.`);
