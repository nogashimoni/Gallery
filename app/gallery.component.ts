/**
 * Created by nogalavi on 18/10/2016.
 */

import {Component, Input} from 'angular2/core'
import {GetPicturesService} from "./get-pictures.service";
import {PagerService} from "./pager.service";
import {Picture} from "./picture";
import {SearchBox} from "./search-box.component";

@Component({
    selector: 'gallery',
    templateUrl: './app/gallery.component.html',
    inputs: ['feedUrl', 'isSearchable', 'isPaginationEnabled', 'resultsPerPage', 'isSortable', 'rotateTime'],
    providers: [GetPicturesService, PagerService],
    directives: [SearchBox],
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

    // Search variables
    relevantPictures: Picture[];

    constructor (getPicturesService: GetPicturesService, private pagerService: PagerService) {
        //getPicturesService.getFeedFromUrl(this.feedUrl).subscribe( res => this.feed = res);
        this.pictures = getPicturesService.getPictures(this.feedUrl);
        this.relevantPictures = this.pictures.slice(0); // copy pictures array
    }


    ngOnInit() {
        this.setPicturesToPresent();
    }


    setPicturesToPresent() {
        if (this.relevantPictures.length == 0) {
            this.picturesToPresent = [];
            return;
        }
        if (this.isPaginationEnabled) {
            this.setPage(this.currentPage);
        } else {
            this.picturesToPresent = this.relevantPictures.slice(0);
        }
    }

    setPage(pageNumber: number) {
        this.currentPage = pageNumber;
        this.pager = this.pagerService.getPager(this.relevantPictures.length, pageNumber, this.resultsPerPage);

        if (pageNumber < 1 || pageNumber > this.pager.totalPages) {
            return;
        }
        this.picturesToPresent = this.relevantPictures.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    performSearch(searchTerm: string) {
        if (!searchTerm) {
            this.relevantPictures = this.pictures.slice(0) //copy pictures array;

        } else {

            this.relevantPictures = [];

            for (var picture of this.pictures) {
                if (picture.title.startsWith(searchTerm)) {
                    this.relevantPictures.push(picture);
                }
            }
        }

        this.setPicturesToPresent();
    }



}