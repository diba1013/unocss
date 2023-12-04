import styles from "@/main.module.css";
import { type Component, For, createSelector, createSignal } from "solid-js";
import { render } from "solid-js/web";
import "@unocss/reset/tailwind-compat.css";
import "virtual:uno.css";

const element = document.querySelector("#app");
if (element === null) {
	throw new Error("cannot mount");
}

const ThemeCardPalette: Component = () => {
	return (
		<svg
			width="80"
			height="80"
			viewBox="0 0 82 82"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				class="fill-neutral-container"
				cx="41"
				cy="41"
				r="24"
			/>

			<path
				class="fill-primary-border stroke-primary-border"
				d="M21 6.35898C14.9192 9.86971 9.86972 14.9192 6.35899 21C2.84825 27.0808 1 33.9785 1 41C0.999999 48.0215 2.84825 54.9192 6.35898 61C9.86972 67.0808 14.9192 72.1303 21 75.641L29 61.7846C25.3515 59.6782 22.3218 56.6485 20.2154 53C18.1089 49.3515 17 45.2129 17 41C17 36.7871 18.109 32.6485 20.2154 29C22.3218 25.3515 25.3515 22.3218 29 20.2154L21 6.35898Z"
			/>
			<path
				class="fill-primary-text stroke-primary-border"
				d="M21 75.641C27.0808 79.1517 33.9785 81 41 81C48.0215 81 54.9192 79.1517 61 75.641C67.0808 72.1303 72.1303 67.0808 75.641 61C79.1517 54.9192 81 48.0215 81 41H65C65 45.2129 63.891 49.3515 61.7846 53C59.6782 56.6485 56.6485 59.6782 53 61.7846C49.3515 63.891 45.2129 65 41 65C36.7871 65 32.6485 63.891 29 61.7846L21 75.641Z"
			/>
			<path
				class="fill-primary-container stroke-primary-border"
				d="M81 41C81 33.9785 79.1517 27.0808 75.641 21C72.1303 14.9192 67.0808 9.86972 61 6.35898C54.9192 2.84825 48.0215 1 41 1C33.9785 1 27.0808 2.84825 21 6.35899L29 20.2154C32.6485 18.109 36.7871 17 41 17C45.2129 17 49.3515 18.109 53 20.2154C56.6485 22.3218 59.6782 25.3515 61.7846 29C63.891 32.6485 65 36.7871 65 41H81Z"
			/>
			<path
				class="fill-secondary-border stroke-secondary-border"
				d="M21 41C21 44.5107 21.9241 47.9596 23.6795 51C25.4349 54.0404 27.9596 56.5651 31 58.3205C34.0404 60.0759 37.4893 61 41 61C44.5107 61 47.9596 60.0759 51 58.3205L47 51.3923C45.1758 52.4455 43.1064 53 41 53C38.8936 53 36.8242 52.4455 35 51.3923C33.1758 50.3391 31.6609 48.8242 30.6077 47C29.5545 45.1758 29 43.1064 29 41L21 41Z"
			/>
			<path
				class="fill-secondary-text stroke-secondary-border"
				d="M51 23.6795C47.9596 21.9241 44.5107 21 41 21C37.4893 21 34.0404 21.9241 31 23.6795C27.9596 25.4349 25.4349 27.9596 23.6795 31C21.9241 34.0404 21 37.4893 21 41L29 41C29 38.8936 29.5545 36.8242 30.6077 35C31.6609 33.1758 33.1758 31.6609 35 30.6077C36.8242 29.5545 38.8936 29 41 29C43.1064 29 45.1758 29.5545 47 30.6077L51 23.6795Z"
			/>
			<path
				class="fill-secondary-container stroke-secondary-border"
				d="M51 58.3205C54.0404 56.5651 56.5651 54.0404 58.3205 51C60.0759 47.9596 61 44.5107 61 41C61 37.4893 60.0759 34.0404 58.3205 31C56.5651 27.9596 54.0404 25.4349 51 23.6795L47 30.6077C48.8242 31.6609 50.3391 33.1758 51.3923 35C52.4455 36.8242 53 38.8936 53 41C53 43.1064 52.4455 45.1758 51.3923 47C50.3391 48.8242 48.8242 50.3391 47 51.3923L51 58.3205Z"
			/>
		</svg>
	);
};

type ThemeDefinition = {
	id: string;
	name: string;
	description: string;
};

const ThemeCardDefinition: Component<ThemeDefinition> = (properties) => {
	return (
		<div class="flex flex-col w-26 p-3 gap-2 items-center">
			<span class="decoration-underline case-upper font-bold">{properties.name}</span>
			<ThemeCardPalette />
			<span class="text-xs text-center text-opacity-60">{properties.description}</span>
		</div>
	);
};

type ThemeCardProperties = {
	theme: ThemeDefinition;
	active: boolean;
	onClick: (id: string) => void;
};

const ThemeCard: Component<ThemeCardProperties> = (properties) => {
	return (
		<section
			class={styles["theme"]}
			data-theme={properties.theme.id}
		>
			<div class={[styles["card"], styles["primary"]].join(" ")}>
				<ThemeCardDefinition
					id={properties.theme.id}
					name={properties.theme.name}
					description={properties.theme.description}
				/>

				<button
					class={styles["button"]}
					type="button"
					onClick={[properties.onClick, properties.theme.id]}
					disabled={properties.active}
				>
					{properties.active ? "Active" : "Select"}
				</button>
			</div>
		</section>
	);
};

const App: Component = () => {
	const themes: ThemeDefinition[] = [
		{
			id: "tundra:light",
			name: "Tundra",
			description: "Light theme with a blueish accent",
		},
		{
			id: "tundra:dark",
			name: "Tundra",
			description: "Dark theme with a blueish accent",
		},
		{
			id: "forest:light",
			name: "Forest",
			description: "Light theme with fresh accent",
		},
		{
			id: "forest:dark",
			name: "Forest",
			description: "Dark theme with fresh accent",
		},
		{
			id: "ocean:light",
			name: "Ocean",
			description: "Light theme with sandy accent",
		},
		{
			id: "ocean:dark",
			name: "Ocean",
			description: "Dark theme with sandy accent",
		},
	];

	const [theme, setTheme] = createSignal("tundra:light");
	const active = createSelector(theme);

	return (
		<div
			class="grid content-center justify-center bg-neutral-container"
			data-theme={theme()}
		>
			<main class={[styles["card"], styles["secondary"]].join(" ")}>
				<div class="flex flex-row gap-4 p-3">
					<For each={themes}>
						{(theme) => (
							<ThemeCard
								theme={theme}
								active={active(theme.id)}
								onClick={setTheme}
							/>
						)}
					</For>
				</div>
			</main>

			<div class="flex flex-col gap-1 p-2 items-center">
				<button
					type="button"
					class={[styles["button"], styles["primary"]].join(" ")}
				>
					Random Button
				</button>
				<span class="text-sm text-neutral-text">This button does not do anything really</span>
			</div>
		</div>
	);
};

render(() => <App />, element);
