import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {GalleryComponent} from './gallery.component'
import {SearchBox} from "./search-box.component";
import {DropDown} from "./dropdown.component";

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, GalleryComponent, SearchBox, DropDown ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
