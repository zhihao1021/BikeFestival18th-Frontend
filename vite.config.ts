import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

import navBarMaxWidth from "./src/rwdSettings/navBar";

const scssOptions: Array<string> = [
  `@use "@/styles/colors" as *;`,
  `@use "@/styles/mixins" as *;`,
  `@use "@/styles/variables" as *;`,
  `$navbar-max-width: calc(${navBarMaxWidth} * $rem);`
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/BikeFestival18th/",
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `${scssOptions.join("\n")}\n`
      }
    }
  },
  define: {
    CHUNK_SIZE: 1000000,
    BUILD_TIME: Date.now().toString(),
    YEAR: new Date().getFullYear().toString(),
    VIDEO_LAST_CHANGE: 1740923848612,
    STATIC_LAST_CHANGE: 1741358307613,
    PDF_LAST_CHANGE: 1741185053541,
  },
  build: {
    cssMinify: "lightningcss",
  }
})

