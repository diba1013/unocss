import presetThemes from "@diba1013/unocss-preset-theme";
import { type Theme, default as presetMini } from "@unocss/preset-mini";
import { type UserConfig, defineConfig, presetWebFonts, transformerDirectives } from "unocss";

const colors = {
	// oklch(65% 0 0)
	gray: {
		50: "#FAFAFA",
		100: "#EDEDED",
		200: "#D4D4D4",
		300: "#BCBCBC",
		400: "#A4A4A4",
		500: "#8B8B8B",
		600: "#727272",
		700: "#5F5F5F",
		800: "#4B4B4B",
		900: "#3B3B3B",
	},
	// oklch(65% 0.075 275)
	product: {
		50: "#F9FAFD",
		100: "#ECEDF7",
		200: "#D1D3EC",
		300: "#B6BAE0",
		400: "#9AA1D5",
		500: "#7B87C8",
		600: "#666FA3",
		700: "#555C87",
		800: "#444969",
		900: "#363A52",
	},
	// oklch(65% 0.075 135)
	success: {
		50: "#F9FAF8",
		100: "#E9EFE6",
		200: "#CAD9C3",
		300: "#ACC3A0",
		400: "#8EAD7E",
		500: "#6F965A",
		600: "#5B7B4A",
		700: "#4C663D",
		800: "#3C5130",
		900: "#2F4026",
	},
	// oklch(65% 0.075 240)
	info: {
		50: "#F8FAFC",
		200: "#E8EEF4",
		300: "#C7D6E3",
		400: "#A7BFD3",
		500: "#86A8C3",
		600: "#6090B2",
		700: "#507692",
		800: "#446278",
		900: "#374D5E",
		100: "#2C3D4A",
	},
	// oklch(65% 0.075 105)
	warning: {
		50: "#FBFAF7",
		100: "#F0EEE5",
		200: "#DAD5C1",
		300: "#C3BC9D",
		400: "#ADA57B",
		500: "#958C57",
		600: "#7A7348",
		700: "#655F3D",
		800: "#504B31",
		900: "#3F3B28",
	},
	// oklch(65% 0.75 25)
	danger: {
		50: "#FDF9F8",
		100: "#F8EBE9",
		200: "#EDCDCA",
		300: "#E1B0AC",
		400: "#D4948F",
		500: "#C47570",
		600: "#A0615D",
		700: "#85514D",
		800: "#68403E",
		900: "#513331",
	},
};

const config: UserConfig<Theme> = defineConfig<Theme>({
	presets: [
		presetMini(), // Do not use full config for testing
		presetWebFonts({
			provider: "bunny",
			fonts: {
				sans: {
					name: "atkinson-hyperlegible",
					weights: [400],
				},
			},
		}),
		presetThemes({
			default: "tundra:light",
			themes: {
				["tundra:light"]: {
					colors: {
						primary: {
							border: colors.product[500],
							container: colors.product[200],
							text: colors.product[800],
						},
						secondary: {
							border: colors.gray[500],
							container: colors.gray[200],
							text: colors.gray[800],
						},
						neutral: {
							container: colors.gray[100],
							text: colors.gray[800],
						},
					},
				},
				["tundra:dark"]: {
					colors: {
						primary: {
							border: colors.product[600],
							container: colors.product[300],
							text: colors.product[900],
						},
						secondary: {
							border: colors.gray[800],
							container: colors.gray[900],
							text: colors.gray[100],
						},
						neutral: {
							container: colors.gray[700],
							text: colors.gray[100],
						},
					},
				},
				["forest:light"]: {
					colors: {
						primary: {
							border: colors.success[500],
							container: colors.success[200],
							text: colors.success[800],
						},
						secondary: {
							border: colors.success[300],
							container: colors.success[100],
							text: colors.success[700],
						},
						neutral: {
							container: colors.gray[100],
							text: colors.gray[800],
						},
					},
				},
				["forest:dark"]: {
					colors: {
						primary: {
							border: colors.success[600],
							container: colors.success[300],
							text: colors.success[900],
						},
						secondary: {
							border: colors.success[800],
							container: colors.success[900],
							text: colors.success[100],
						},
						neutral: {
							container: colors.gray[900],
							text: colors.gray[200],
						},
					},
				},
				["ocean:light"]: {
					colors: {
						primary: {
							border: colors.info[500],
							container: colors.info[200],
							text: colors.info[800],
						},
						secondary: {
							border: colors.warning[500],
							container: colors.warning[200],
							text: colors.warning[800],
						},
						neutral: {
							container: colors.gray[100],
							text: colors.gray[800],
						},
					},
				},
				["ocean:dark"]: {
					colors: {
						primary: {
							border: colors.info[600],
							container: colors.info[300],
							text: colors.info[900],
						},
						secondary: {
							border: colors.warning[700],
							container: colors.warning[300],
							text: colors.warning[800],
						},
						neutral: {
							container: colors.gray[900],
							text: colors.gray[200],
						},
					},
				},
			},
		}),
	],
	transformers: [transformerDirectives()],
});

export default config;
