import {Component} from 'angular2/core';
import {GalleryComponent} from './gallery.component'

@Component({
    selector: 'my-app',
    template: `<gallery
    feedUrl = "https://s3.amazonaws.com/yotpo-public/images.json"
    [isSearchable] = isSearchable
    [isPaginationEnabled] = isPaginationEnabled
    [defaultResultsPerPage] = resultsPerPage
    [rotateSeconds] = rotateSeconds
    [isSortable] = isSortable
    ></gallery>`,
    directives: [GalleryComponent]
})
export class AppComponent {

    isSearchable: boolean = true;
    isPaginationEnabled: boolean = true;
    resultsPerPage: number = 1;
    rotateSeconds: number = 2;
    isSortable: boolean = true;

}