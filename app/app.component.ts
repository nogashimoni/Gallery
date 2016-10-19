import {Component} from 'angular2/core';
import {GalleryComponent} from './gallery.component'

@Component({
    selector: 'my-app',
    template: `<gallery
    feedUrl = "https://s3.amazonaws.com/yotpo-public/images.json"
    searchInput = true
    paginationInput = true
    resultsPerPageInput = 4
    rotateTimeInput = 3
    ></gallery>`,
    directives: [GalleryComponent]
})
export class AppComponent { }