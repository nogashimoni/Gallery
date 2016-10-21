import {Component} from 'angular2/core';
import {GalleryComponent} from './gallery.component'

@Component({
    selector: 'my-app',
    template: `<gallery
    feedUrl = "https://s3.amazonaws.com/yotpo-public/images.json"
    [isSearchable] = isSearchable
    [isPaginationEnabled] = isPaginationEnabled
    [resultsPerPage] = resultsPerPage
    [rotateTime] = rotateTime
    ></gallery>`,
    directives: [GalleryComponent]
})
export class AppComponent {

    isSearchable: boolean = true;
    isPaginationEnabled: boolean = true;
    resultsPerPage: number = 4;
    rotateTime: number = 2;

}