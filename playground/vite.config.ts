import css from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	plugins: [css(), solid()],
	css: {
		transformer: "postcss",
		modules: {
			generateScopedName: "[hash:base64:8]",
		},
	},
});
