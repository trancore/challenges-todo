import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
	},
	build: {
		target: "es2022",
		cssMinify: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/react-dom")) return "react-dom";
					if (id.includes("node_modules/react/")) return "react";
				},
			},
		},
	},
});
