/**
 * Created by nogalavi on 18/10/2016.
 */

import {Component, Input, OnInit} from 'angular2/core'
import {Picture} from "./picture";
import {PagerService} from './pager.service'
//import * as _ from 'underscore';


@Component({
    selector: 'pagination',
    templateUrl: './app/pagination.component.html',
    inputs: ['pictures'],
    providers: [PagerService]
})

export class PaginationComponent {

    constructor(private pagerService: PagerService) {}

    pictures: Picture[];
    pager: any = {};
    picturesOnPage: Picture[];

    ngOnInit() {
        this.setPage(1);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.pictures.length, page);

        // get current page of items
        this.picturesOnPage = this.pictures.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}




