import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Import only the Phosphor icons we use. Without this every page compiles the whole icon set
    // (~13,000 modules), which made dev compiles take minutes.
    optimizePackageImports: ["@phosphor-icons/react", "@phosphor-icons/react/dist/ssr"],
  },
};

export default nextConfig;
