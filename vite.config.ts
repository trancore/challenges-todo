import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages: ユーザーサイト (<owner>.github.io) はルート、それ以外は /リポジトリ名/
const base =
	process.env.VITE_BASE_PATH ??
	(process.env.GITHUB_ACTIONS === "true"
		? (() => {
				const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
				const name = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
				const isUserSite = name === `${owner}.github.io`;
				return isUserSite ? "/" : `/${name}/`;
			})()
		: "/");

// https://vite.dev/config/
export default defineConfig({
	base,
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
