import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained .next/standalone/server.js that can run as a
  // plain, persistent Node process — what Hostinger's Node.js app hosting
  // (and most non-serverless hosts) expect, since they run one long-lived
  // process rather than Vercel-style per-request functions.
  output: "standalone",
};

export default nextConfig;
