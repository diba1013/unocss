import { name } from "../package.json";
import { type Preset, definePreset } from "@unocss/core";
import { parseCssColor } from "@unocss/rule-utils";

export type PresetThemeNestedObject = PresetThemeNested & {
	DEFAULT?: string;
};

// This must be an mapped object since it has circular references
// TODO disable eslint rule?
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type PresetThemeNested = {
	[key: string]: PresetThemeNestedObject | string;
};

export type PresetTheme = object & {
	colors?: PresetThemeNested;
};
export type PresetThemeDefinitions<Theme extends PresetTheme> = Record<string, Theme>;

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

	// TODO remove hard coded color variables and have a strategy for variables in place
	// TODO how deep do we want to unwrap here? currently depth = 1
	function replaceConstantWithVariable({ colors = {} }: Theme) {
		const theme: Required<PresetTheme> = { colors: {} };
		// TODO traversal can be extracted by providing generator with { namespace, key, value } or strategy-based?
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

		// Casting is necessary for type to become generic
		return theme as Theme;
	}

	function unwrapNestedVariables(nested: PresetThemeNested, keys: string[] = []): string[] {
		const items: string[] = [];
		// TODO traversal can be extracted by providing generator with { namespace, key, value, path, keys } or strategy-based?
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
				const variables = unwrapNestedVariables(value, path);
				items.push(...variables);
			}
		}

		return items;
	}

	return definePreset({
		name,
		theme: replaceConstantWithVariable(themes[normal] ?? {}),
		// Theme should come before everything else in this preset
		layers: {
			theme: 0,
			default: 1,
		},
		preflights: [
			{
				layer: "theme",

				// TODO Honor dark mode and proper default fallback?
				getCSS: () => {
					return Object.entries(themes)
						.map(([name, theme]) => {
							const lines = unwrapNestedVariables(theme);
							return `[data-theme="${name}"] {${lines.join("")}}`;
						})
						.join("\n");
				},
			},
		],
	});
}
