import typescript from "rollup-plugin-ts"
import { lezer } from "@lezer/generator/rollup"

const typescriptPlugin = typescript(
	{
	// "include": ["src/*.ts"],
	tsconfig: {
		"strict": true,
		"target": "es6",
		"module": "es2020",
		"newLine": "lf",
		"declaration": true,
		"moduleResolution": "node"
	}
})

const factory = 
	(data) => {
		const baseDir = data.baseDir;
		const conf = {
			input: baseDir + "/src/index.ts",
			external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
			output: [
				{ file: baseDir + "/dist/index.cjs", format: "cjs" },
				{ dir: baseDir + "/dist", format: "es" }
			],
			plugins: [ lezer(), typescriptPlugin ]
		}
		return conf;
	};

export default factory;



