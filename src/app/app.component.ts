import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import * as CodeMirror from 'codemirror';
import { EditorConfiguration } from 'codemirror';

@Component({
  selector: 'app-root',
  template: `
  <ngx-codemirror
    [(ngModel)]="content"
    [options]="options"
    (codeMirrorLoaded)="onLoaded($event)"
  ></ngx-codemirror>`,
})
export class AppComponent implements AfterViewInit {
  
  title = 'angular-code-mirror-study';
  content = `const v = "prova";
    function showV(){
      alert(v);
    }
  `;

  @ViewChild(CodemirrorComponent)
  editor!: CodemirrorComponent
  protected options: EditorConfiguration = {
    lineNumbers: true,
    theme: 'material',
    mode: 'javascript',
  }


  constructor(){

  }

  ngAfterViewInit(): void {
    this.editor.codeMirrorGlobal;
    console.log("ngAfterViewInit", {editor: this.editor,codeMirrorGlobal: this.editor.codeMirrorGlobal });
    
    
  }

  protected onLoaded(data: CodemirrorComponent){
    console.log("onLoaded", data.codeMirror);
    (window as any).gerry = data;
    console.log("CodeMirror", {CodeMirror});
  }
}
