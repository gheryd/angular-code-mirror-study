import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { EditorStateConfig, EditorState, Extension, Text } from "@codemirror/state";
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import { autocompletion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import {EditorView} from '@codemirror/view';
import {basicSetup} from "codemirror";
import {syntaxTree} from "@codemirror/language";

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

        const jsDocCompletions = javascriptLanguage.data.of({
            autocomplete: (context: CompletionContext) => this.suggest(context)
        })

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
                jsDocCompletions
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

    private suggest(context: CompletionContext): CompletionResult|null{
        // const r = context.tokenBefore(["variable", "keyword"]);
        const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)
        // console.log("node before",  nodeBefore.name, {nodeBefore});
        const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos)
        switch(nodeBefore.name){
            case "VariableDeclaration":
                return {
                    from: context.pos,
                    options: [
                        {displayLabel: "provaVar",label: "provaVar", type:"Variable", },
                        {displayLabel: "provinoVar", label: "provino", type:"Variable"},
    
                    ]
                }
            
            case "VariableDefinition":
                break;
            case "VariableName":
                break;
            case "Equals":
                return {
                    from: context.pos,
                    options: [
                        {displayLabel: "prova",label: "\"prova\"", type:"String", },
                        {displayLabel: "provino", label: "\"provino\"", type:"String"},
    
                    ]
                }
            case "String":
                const tagBefore = /"\w*$/.exec(textBefore);
                // console.log({tagBefore})
                return {
                    from: tagBefore ? nodeBefore.from + tagBefore.index : context.pos,
                    options: [
                        {displayLabel: "prova",label: "\"prova\"", type:"String", },
                        {displayLabel: "provino", label: "\"provino\"", type:"String"},
    
                    ]
                }
            
        }

        return null;
        
    }
}