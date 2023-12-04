import { version } from "./package.json";
import { defineConfig } from "@diba1013/tscz";

const NAME = "ts";
const SOURCE = "src";

function input(name: string): string {
	return `${SOURCE}/${name}`;
}

export default defineConfig({
	name: NAME,
	entries: [
		{
			name: "index",
			input: input("index.ts"),
			output: ["cjs", "esm", "dts"],
		},
	],
	env: {
		__NAME__: NAME,
		__VERSION__: version,
	},
});
