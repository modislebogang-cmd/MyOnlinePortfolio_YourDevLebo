// measure3.mjs — time config load, plugin creation and server startup.
import { performance } from "node:perf_hooks";

const t0 = performance.now();
const mark = (label) =>
  console.log(`${label}: ${Math.round(performance.now() - t0)} ms`);

setTimeout(() => {
  mark("HARD TIMEOUT");
  process.exit(1);
}, 60000).unref();

const vite = await import("vite");
mark("import vite");

const mod = await vite.loadConfigFromFile(
  { command: "serve", mode: "development" },
  process.cwd() + "\\vite.config.js",
  undefined,
  "silent",
);
mark(`loadConfigFromFile (config: ${process.env.CFG || "vite.config.js"})`);
console.log(
  "plugins:",
  mod.config.plugins.flat().map((p) => p?.name),
);

const server = await vite.createServer({
  configFile: false,
  root: process.cwd(),
  logLevel: "info",
  config: mod.config,
});
mark("createServer WITH plugins");
await server.close();
mark("closed");
process.exit(0);
