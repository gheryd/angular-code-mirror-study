import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { EditorView, basicSetup } from "codemirror";
import { EditorStateConfig, Text,EditorState } from "@codemirror/state";
import { Lang1, Lang1Language } from "langs/lang1/dist";
import { autocompletion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import {syntaxTree} from "@codemirror/language";
import { Lang1Linter, handleSuggestLang1 } from "./lang1.tool";
import {linter, Diagnostic} from "@codemirror/lint"


@Component({
    selector: "editor-lang1",
    template: `
        <h2>Editor2: lang 1</h2>
        <div #codemirrorhost></div>
        
    `
})
export class EditorLang1Component implements AfterViewInit {
    
    @ViewChild("codemirrorhost") codemirrorhost!: ElementRef;
    

    private editor!: EditorView;


    ngAfterViewInit(): void {

        const lang1Completation = Lang1Language.data.of({
            autocomplete: (context: CompletionContext) => handleSuggestLang1(context)
        })

        const lang1Linter = linter( view => Lang1Linter(view) )

        const doc = Text.of(["prd()"]);
        const stateConfig: EditorStateConfig = {
            doc,
            extensions: [
                basicSetup,
                Lang1(),
                lang1Completation,
                lang1Linter
            ]
        };

        const state: EditorState = EditorState.create(stateConfig);
        this.editor = new EditorView({
            state,
            parent: this.codemirrorhost.nativeElement
        });

    }




    
}