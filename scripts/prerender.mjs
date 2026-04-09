/**
 * Static generation: renders selected routes via dist/server/entry-server.js
 * and writes HTML under dist/client (same asset URLs as SPA build).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const clientDir = path.join(root, "dist/client");
const configPath = path.join(root, "prerender.config.json");
const templatePath = path.join(clientDir, "index.html");

function routeToOutputFile(routePath) {
  if (routePath === "/") return "index.html";
  const clean = routePath.replace(/^\//, "").replace(/\/$/, "");
  return path.join(clean, "index.html");
}

function injectAppHtml(template, appHtml) {
  const marker = '<div id="root"></div>';
  if (!template.includes(marker)) {
    throw new Error(
      `Expected ${marker} in dist/client/index.html — adjust scripts/prerender.mjs if Vite changes the shell.`
    );
  }
  return template.replace(marker, `<div id="root">${appHtml}</div>`);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const baseTemplate = fs.readFileSync(templatePath, "utf-8");

/* AuthLayout pulls supabase during SSR chunk preload — Node has no Vite env unless set. */
if (!process.env.VITE_SUPABASE_URL) {
  process.env.VITE_SUPABASE_URL = "https://placeholder.supabase.co";
}
if (!process.env.VITE_SUPABASE_ANON_KEY) {
  process.env.VITE_SUPABASE_ANON_KEY = "ssg-prerender-placeholder-not-used-at-runtime";
}

const serverEntry = pathToFileURL(
  path.join(root, "dist/server/entry-server.js")
).href;
const { render } = await import(serverEntry);

for (const route of config.routes) {
  if (route.prerender === false) continue;
  const appHtml = await render(route.path);
  const html = injectAppHtml(baseTemplate, appHtml);
  const rel = routeToOutputFile(route.path);
  const outFile = path.join(clientDir, rel);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log(`SSG: ${route.path} -> ${rel}`);
}

if (config.notFound?.prerender) {
  const appHtml = await render(config.notFound.path);
  const html = injectAppHtml(baseTemplate, appHtml);
  const outFile = path.join(clientDir, config.notFound.output || "404.html");
  fs.writeFileSync(outFile, html);
  console.log(`SSG: 404 -> ${path.relative(clientDir, outFile)}`);
}
