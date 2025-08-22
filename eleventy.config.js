import fs from "fs";
import path from "path";

import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { I18nPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
    //compile tailwind before eleventy processes the files
    eleventyConfig.on("eleventy.before", async () => {
        const tailwindInputPath = path.resolve("./src/styles/main.css");

        const tailwindOutputPath = "./_site/main.css";

        const cssContent = fs.readFileSync(tailwindInputPath, "utf8");

        const outputDir = path.dirname(tailwindOutputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const result = await processor.process(cssContent, {
            from: tailwindInputPath,
            to: tailwindOutputPath,
        });

        fs.writeFileSync(tailwindOutputPath, result.css);
    });

    const processor = postcss([
        //compile tailwind
        tailwindcss(),

        //minify tailwind css
        cssnano({
            preset: "default",
        }),
    ]);

    eleventyConfig.addPlugin(I18nPlugin, {
        defaultLanguage: "en",
        errorMode: "strict",
    });

    return {
        dir: { input: "src", output: "_site" },
    };
}
