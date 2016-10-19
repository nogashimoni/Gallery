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
    //directives: [PicturesComponent],
    providers: [GetPicturesService, PagerService]
})

export class GalleryComponent {

    feedUrl: string;
    isSearchable: boolean = true;
    isPaginationEnabled: boolean = true;
    resultsPerPage: number = 10;
    isSortable: boolean = true;
    rotateTime: number = 4;

    pictures: Picture[];
    pager: any = {};
    picturesOnPage: Picture[];

    constructor (getPicturesService: GetPicturesService, private pagerService: PagerService) {
        //getPicturesService.getFeedFromUrl(this.feedUrl).subscribe( res => this.feed = res);
        this.pictures = getPicturesService.getPictures(this.feedUrl);
    }


    ngOnInit() {
        if (!this.isPaginationEnabled) {this.resultsPerPage=this.pictures.length}
        this.setPage(1);
    }

    setPage(page: number) {

        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.pictures.length, page, this.resultsPerPage);

        // get current page of items
        this.picturesOnPage = this.pictures.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


}