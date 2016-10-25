import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {enableProdMode} from "@angular/core";

import { GalleryModule } from './app.module';
import {AppModule} from "./app.module";

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
