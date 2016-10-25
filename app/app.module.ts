import { NgModule }      from '@angular/core';
import { GalleryModule } from './gallery.module'
import { AppComponent }         from './app.component';


@NgModule({
  imports: [GalleryModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

