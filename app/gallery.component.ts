/**
 * Created by nogalavi on 18/10/2016.
 */

import {Component, Input} from 'angular2/core'
import {PaginationComponent} from "./pagination.component";
import {GalleryService} from "./gallery.service";

@Component({
    selector: 'gallery',
    template: `
    <h2> Noga's Gallery </h2>
    <h1> feed url: {{ feedUrl }} </h1>
    <h1> search: {{ searchInput }} </h1>
    <h1> pagination: {{ paginationInput }} </h1>
    <h1> results per page: {{ resultsPerPageInput }} </h1>
    <h1> sorting input: {{ sortingInput }} </h1>
    <h1> rotate time input: {{ rotateTimeInput }} </h1>
    <pagination [pictures] =  pictures > </pagination>

    `,
    inputs: ['feedUrl', 'searchInput', 'paginationInput', 'resultsPerPageInput', 'sortingInput', 'rotateTimeInput'],
    directives: [PaginationComponent],
    providers: [GalleryService]
})

export class GalleryComponent {

    searchInput = true;
    paginationInput = true;
    resultsPerPageInput = 10;
    sortingInput = true;
    rotateTimeInput = 4;
    feedUrl;
    pictures;

    constructor (galleryService: GalleryService) {

        //galleryService.getFeedFromUrl(this.feedUrl).subscribe( res => this.feed = res);
        this.pictures = galleryService.getPictures(this.feedUrl);
    }




    //feed (String/Array) - path to load the json from / array of images
    //search (Boolean default:true) - show a search box
    //pagination (Boolean default true) - show a pagination component in the gallery.
    //results-per-page (Number, default 10) - number of results on each page of the gallery
    //sorting (Boolean default true) - allow the user to sort by the images elements (title, date)
    //auto-rotate-time (Number default 4) - Time for image slideshow mode
}