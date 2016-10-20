/**
 * Created by nogalavi on 18/10/2016.
 */

import {Component, Input} from 'angular2/core'
import {GetPicturesService} from "./get-pictures.service";
import {PagerService} from "./pager.service";
import {Picture} from "./picture";

@Component({
    selector: 'gallery',
    templateUrl: './app/gallery.component.html',
    inputs: ['feedUrl', 'isSearchable', 'isPaginationEnabled', 'resultsPerPage', 'isSortable', 'rotateTime'],
    providers: [GetPicturesService, PagerService]
})

export class GalleryComponent {

    // Input variables
    feedUrl: string;
    isSearchable: boolean = true;
    isPaginationEnabled: boolean = true;
    resultsPerPage: number = 10;
    isSortable: boolean = true;
    rotateTime: number = 4;

    pictures: Picture[];
    picturesToPresent: Picture[];

    // Paging variables
    pager: any = {};
    currentPage: number = 1;

    constructor (getPicturesService: GetPicturesService, private pagerService: PagerService) {
        //getPicturesService.getFeedFromUrl(this.feedUrl).subscribe( res => this.feed = res);
        this.pictures = getPicturesService.getPictures(this.feedUrl);
    }


    ngOnInit() {
        this.setPicturesToPresent();
    }


    setPicturesToPresent() {
        if (this.isPaginationEnabled) {
            this.setPage(this.currentPage);
        } else {
            this.picturesToPresent = this.pictures;
        }
    }

    setPage(pageNumber: number) {
        this.currentPage = pageNumber;
        if (pageNumber < 1 || pageNumber > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.pictures.length, pageNumber, this.resultsPerPage);
        this.picturesToPresent = this.pictures.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    //search(input: string) {
    //    if (input != "") {
    //        this.setPicturesToPresent();
    //        return;
    //    }
    //
    //    let searchResult: Picture[] = [];
    //
    //    for ( let picture: Picture in this.pictures ) {
    //        if ( input in picture.title ) {
    //            searchResult.push(picture);
    //        }
    //    }
    //    this.picturesToPresent = searchResult;
    //}

}