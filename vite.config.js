import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
	                            base: process.env.NODE_ENV === "production" ? "/gcjzcz" : "/",
	                            plugins: [vue(),],
	                            resolve: {
		                            alias: {
			                            "@": resolve(__dirname, "src")
		                            }
	                            },
	                            server: {
		                            host: true,
		                            proxy: {
			                            "/api": {
				                            target: "http://kfq.kejin.net.cn:8001",
				                            changeOrigin: true,
				                            rewrite: (path) => path.replace(/^\/api/, "")
			                            }
		                            }
	                            },
	                            build: {
		                            outDir: "dist"
	                            }
                            });
