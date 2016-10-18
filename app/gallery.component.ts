/**
 * Created by nogalavi on 18/10/2016.
 */

import {Component, Input} from 'angular2/core'
import {PageComponent} from "./page.component";

@Component({
    selector: 'gallery',
    template: `<h2> Noga's Gallery </h2>
    <h1> feed url: {{ feedUrl }} </h1>
    <h1> search: {{ searchInput }} </h1>
    <h1> pagination: {{ paginationInput }} </h1>
    <h1> results per page: {{ resultsPerPageInput }} </h1>
    <h1> sorting input: {{ sortingInput }} </h1>
    <h1> rotate time input: {{ rotateTimeInput }} </h1>
    <page [feed] =  feed > </page>

    `,
    inputs: ['feedUrl', 'searchInput', 'paginationInput', 'resultsPerPageInput', 'sortingInput', 'rotateTimeInput'],
    directives: [PageComponent]
})
export class GalleryComponent {

    searchInput = true;
    paginationInput = true;
    resultsPerPageInput = 10;
    sortingInput = true;
    rotateTimeInput = 4;
    feedUrl;

    feed =  [

    {   "title": "Blue river (much better in original size - press)",
        "url": "http://farm9.static.flickr.com/8305/7893507666_0d25cd9f30.jpg",
        "date": "Thu, 30 Aug 2012 10:41:00 -0400",
        "id": 0
    },

    {   "title": "Dangerously beautiful paths",
        "url": "http://farm8.static.flickr.com/7275/7550745422_3e323cd79e.jpg",
        "date": "Thu, 12 Jul 2012 03:27:00 -0400",
        "id": 1
    }

    ];






    //feed (String/Array) - path to load the json from / array of images
    //search (Boolean default:true) - show a search box
    //pagination (Boolean default true) - show a pagination component in the gallery.
    //results-per-page (Number, default 10) - number of results on each page of the gallery
    //sorting (Boolean default true) - allow the user to sort by the images elements (title, date)
    //auto-rotate-time (Number default 4) - Time for image slideshow mode
}