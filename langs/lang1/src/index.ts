import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const Lang1Language = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        // Identifier: t.variableName,
        // Boolean: t.bool,
        String: t.string,
        ObjectName: t.className,
        FunctionName: t.keyword,
        LineComment: t.lineComment,
        ObjectSeparator: t.separator,
        Operator: t.operator,
        Invalid: t.invalid,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function Lang1() {
  return new LanguageSupport(Lang1Language)
}
