import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { EditorView, basicSetup } from "codemirror";
import { EditorStateConfig, Text,EditorState } from "@codemirror/state";
import { EXAMPLE } from "langs/lang1/dist";


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
        const doc = Text.of(["prova"]);
        const stateConfig: EditorStateConfig = {
            doc,
            extensions: [
                basicSetup,
                EXAMPLE(), 
            ]
        };

        const state: EditorState = EditorState.create(stateConfig);
        this.editor = new EditorView({
            state,
            parent: this.codemirrorhost.nativeElement
        });

    }
}