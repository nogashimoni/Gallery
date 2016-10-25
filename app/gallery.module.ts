import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { GalleryComponent } from './gallery.component'
import { SearchBox } from "./search-box.component";
import { DropDown } from "./dropdown.component";
import { HttpModule } from '@angular/http';
import {GetPicturesService} from "./get-pictures.service";
import {PagerService} from "./pager.service";

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [GalleryComponent, SearchBox, DropDown],
  bootstrap: [GalleryComponent],
  providers: [GetPicturesService, PagerService],
  exports: [GalleryComponent, SearchBox, DropDown],
})
export class GalleryModule {
}
