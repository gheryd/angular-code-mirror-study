import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { EditorStateConfig, EditorState, Extension, Text } from "@codemirror/state";
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';
import {EditorView} from '@codemirror/view';
import {basicSetup} from "codemirror";

@Component({
    selector:"editor1",
    template: `
        <h2>Editor 1: javascript</h2>
        <button (click)="onClickReplace()">add comment</button>
        <button (click)="onClickReplaceCurrentPosition()">add comment current position</button>
        <div #codemirrorhost></div>
    `
})
export class Editor1Component implements AfterViewInit {
    
    @ViewChild("codemirrorhost") codemirrorhost!: ElementRef;
    
    private editor!: EditorView;
   
 
    ngAfterViewInit(): void {
        console.log("ngAfterViewInit");
        
        const doc = Text.of([
            `console.log("Hello, CodeMirror 6!");`,
            `const s = "ciao";`,
            `alert(s);`
        ])

        const stateConfig: EditorStateConfig = {
            doc,
            extensions: [
                basicSetup,
                javascript(), 
                autocompletion()
            ]
        };
        const state:EditorState = EditorState.create(stateConfig);
        this.editor = new EditorView({
            state,
            parent: this.codemirrorhost.nativeElement
        })
    }

    protected onClickReplace(){
        let transaction = this.editor.state.update({changes: {from: 0, insert: "//prova\n"}});
        this.editor.dispatch(transaction);
    }

    protected onClickReplaceCurrentPosition(){
        let transaction = this.editor.state.update({changes: {from: this.editor.state.selection.main.head, insert: "//prova current position\n"}});
        this.editor.dispatch(transaction);
    }
}