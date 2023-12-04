# unocss-preset-theme

Inspired by [unocss-preset-theme](https://github.com/unpreset/unocss-preset-theme).

### Configuration

```ts
// uno.config.ts
import { defineConfig } from "unocss";
import presetTheme from "@diba1013/unocss-preset-theme";

export default defineConfig({
    plugins: [
        presetThemes({
			default: "dark",
			themes: {
				["dark"]: {
					colors: {
						primary: {
							border: #454743,
                        }
                    }
                }
            }
        })
    ]
})
```
