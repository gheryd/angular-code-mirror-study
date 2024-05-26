import typescript from "rollup-plugin-ts"
import {lezer} from "@lezer/generator/rollup"


export default (
  { baseDir }) => {
    return {
      input: baseDir+"/src/index.ts",
      external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
      output: [
        {file: baseDir+"/dist/index.cjs", format: "cjs"},
        {dir: baseDir+"/dist", format: "es"}
      ],
      plugins: [lezer(), typescript({
        // "include": ["src/*.ts"],
        tsconfig: {
            "strict": true,
            "target": "es6",
            "module": "es2020",
            "newLine": "lf",
            "declaration": true,
            "moduleResolution": "node"
          }        
        
      })]
    }
    
  }



