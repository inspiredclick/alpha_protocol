import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true, // generate declaration files.
  outDir: "dist",
  clean: true, // clean the output directory before building
});