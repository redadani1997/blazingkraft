import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig((configEnv) => {
  return {
    base: './',
    envDir: "./env-desktop",
    build: {
      outDir: "dist-desktop",
      rollupOptions: {
        input: {
          app: './index-desktop.html',
        },
      },
    },
    server: {
      port: 7766,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
    },
    plugins: [react()],
    // plugins: [react(), monacoEditorPlugin({publicPath: `${__dirname}/node_modules/monaco-editor`})],
    resolve: {
      alias: {
        oidc: resolve(__dirname, "src", "oidc"),
        scenes: resolve(__dirname, "src", "scenes"),
        redux_config: resolve(__dirname, "src", "redux"),
        common: resolve(__dirname, "src", "common"),
        hooks: resolve(__dirname, "src", "hooks"),
        assets: resolve(__dirname, "src", "assets"),
        kafka: resolve(__dirname, "src", "kafka"),
        rest: resolve(__dirname, "src", "rest")
      },
    },
    css: {
      modules: {
        generateScopedName: "[hash:base64:5]",
      },
    },
  };
});
