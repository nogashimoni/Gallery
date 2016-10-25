import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<gallery
    [feedUrl] = url
    [isSearchable] = isSearchable
    [isPaginationEnabled] = isPaginationEnabled
    [defaultResultsPerPage] = resultsPerPage
    [rotateSeconds] = rotateSeconds
    [isSortable] = isSortable
    ></gallery>`
})
export class AppComponent {
    isSearchable: boolean = true;
    isPaginationEnabled: boolean = true;
    resultsPerPage: number = 9;
    rotateSeconds: number = 5;
    isSortable: boolean = true;
    url: string = "https://s3.amazonaws.com/yotpo-public/images.json";
}
