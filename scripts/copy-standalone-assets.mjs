// Next.js's `output: "standalone"` build (next.config.ts) produces a
// self-contained .next/standalone/server.js, but deliberately leaves out
// static assets (public/, .next/static) to keep that bundle small. This
// copies them into place right after every build, since the standalone
// server expects to find them alongside itself. Runs automatically via
// npm's "postbuild" convention (see package.json) — no separate step for
// a host to remember to run.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");

if (!fs.existsSync(standaloneDir)) {
  console.warn(
    "[postbuild] .next/standalone not found — skipping asset copy. " +
      "Check next.config.ts has output: \"standalone\" set.",
  );
  process.exit(0);
}

const copies = [
  [path.join(root, "public"), path.join(standaloneDir, "public")],
  [path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static")],
];

for (const [from, to] of copies) {
  if (!fs.existsSync(from)) continue;
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true });
  console.log(`[postbuild] Copied ${path.relative(root, from)} -> ${path.relative(root, to)}`);
}
