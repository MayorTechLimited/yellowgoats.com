import { I18nPlugin } from "@11ty/eleventy";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyVitePlugin, {
        viteOptions: defineConfig({
            plugins: [tailwindcss()],
        }),
    });
    eleventyConfig.addPlugin(I18nPlugin, {
        defaultLanguage: "en",
        errorMode: "allow-fallback",
    });
    eleventyConfig.addPassthroughCopy("src/main.css");
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    return {
        // passthroughFileCopy: true,
        dir: { input: "src", output: "_site" },
    };
}
