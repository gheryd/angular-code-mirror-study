import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Editor1Component } from './editor1.component';
import { EditorLang1Component } from './editor-lang1.component';

@NgModule({
  declarations: [
    AppComponent,
    Editor1Component,
    EditorLang1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
