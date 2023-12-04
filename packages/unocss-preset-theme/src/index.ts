import { name } from "../package.json";
import { type Preset, definePreset } from "@unocss/core";
import { parseCssColor } from "@unocss/rule-utils";

type Colors = {
	[key: string]:
		| (Colors & {
				DEFAULT?: string;
		  })
		| string;
};

export type PresetTheme = object & {
	colors?: Colors;
};
export type PresetThemeDefinitions<Theme extends PresetTheme> = {
	[Name: string]: Theme;
};

export type PresetThemeOptions<
	Theme extends PresetTheme,
	Themes extends PresetThemeDefinitions<Theme> = PresetThemeDefinitions<Theme>,
> = {
	prefix?: `--${string}`;
	default?: keyof Themes;
	themes: Themes;
};

export default function preset<
	Theme extends PresetTheme,
	Themes extends PresetThemeDefinitions<Theme> = PresetThemeDefinitions<Theme>,
>({ prefix = "--un-theme", default: normal = "default", themes }: PresetThemeOptions<Theme, Themes>): Preset<Theme> {
	function get(name: string, fallback?: string) {
		const { type = "rgb" } = parseCssColor(fallback) ?? {};
		const method =
			type.at(-1) === "a"
				? type.slice(0, -1) // Remove alpha channel as this will be done by unocss
				: type;
		return `${method}(var(${prefix}-${name}))`;
	}

	function set(name: string[], value: string) {
		const { components = [] } = parseCssColor(value) ?? {};
		return `${prefix}-${name.join("-")}: ${components.join(" ")};`;
	}

	const { colors = {} } = themes[normal] ?? {
		colors: {},
	};

	const theme: Required<PresetTheme> = { colors: {} };
	for (const [key, value] of Object.entries(colors)) {
		if (value === undefined || value === null) {
			continue;
		}
		if (typeof value === "string") {
			theme.colors[key] = get(`colors-${key}`, value);
		}
		if (typeof value === "object") {
			const nested: Record<string, string> = {};
			theme.colors[key] = nested;

			for (const [shade, color] of Object.entries(value)) {
				if (typeof color !== "string") {
					continue;
				}

				nested[shade] =
					shade === "DEFAULT" // Remap default values
						? get(`colors-${key}`, color)
						: get(`colors-${key}-${shade}`, color);
			}
		}
	}

	return definePreset({
		name,
		theme: theme as Theme,
		layers: {
			theme: 0,
			default: 1,
		},
		preflights: [
			{
				layer: "theme",
				getCSS: () => {
					return Object.entries(themes)
						.map(([name, theme]) => {
							function flatten(nested: Colors, keys: string[] = []): string {
								const items: string[] = [];

								for (const [key, value] of Object.entries(nested)) {
									if (value === undefined || value === null) {
										continue;
									}
									// Merge path
									const path = [...keys, key];
									if (typeof value === "string") {
										const variable = set(key === "DEFAULT" ? keys : path, value);
										items.push(variable);
									}
									if (typeof value === "object") {
										const variables = flatten(value, path);
										items.push(variables);
									}
								}

								return items.join("");
							}
							return `[data-theme="${name}"] {${flatten(theme)}}`;
						})
						.join("\n");
				},
			},
		],
	});
}
