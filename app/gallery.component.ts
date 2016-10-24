/**
 * Created by nogalavi on 18/10/2016.
 */

import {Component, Input} from 'angular2/core'
import {GetPicturesService} from "./get-pictures.service";
import {PagerService} from "./pager.service";
import {Picture} from "./picture";
import {SearchBox} from "./search-box.component";
import {DropDown} from "./dropdown.component";

@Component({
    selector: 'gallery',
    templateUrl: './app/gallery.component.html',
    styleUrls: ['./app/gallery.css'],
    inputs: ['feedUrl', 'isSearchable', 'isPaginationEnabled', 'defaultResultsPerPage', 'isSortable', 'rotateSeconds'],
    providers: [GetPicturesService, PagerService],
    directives: [SearchBox, DropDown]
})

export class GalleryComponent {

    // Input variables
    feedUrl:string;
    isSearchable:boolean = true;
    isPaginationEnabled:boolean = true;
    isSortable:boolean = true;

    defaultResultsPerPage:number = 10;
    resultsPerPage:number = this.defaultResultsPerPage;
    rotateSeconds:number = 4;

    pictures:Picture[];
    picturesToPresent:Picture[];
    relevantPictures:Picture[]; // pictures relevant to search and sort

    // Paging variables
    pager:any = {};
    currentPage:number = 1;

    // Search variables
    searchTerm:string = "";

    // Sort variables
    sortProperty:string = "";

    // Slideshow and bigPicture variables
    isModalShown:boolean = false;
    isBigShowAutoRotated:boolean = true;
    bigShowCurrentIndex:number = 0;
    interval:any;


    // {88: true, 89: true}
    // [88, 89, 88]
    blacklist: {[id: number]: boolean};


    constructor(getPicturesService:GetPicturesService, private pagerService:PagerService) {
        //getPicturesService.getFeedFromUrl(this.feedUrl).subscribe( res => this.feed = res);
        this.pictures = getPicturesService.getPictures(this.feedUrl);
        this.relevantPictures = this.pictures.slice(0); // copy pictures array
        let localStorageBlacklist = localStorage.getItem('blacklist');
        this.blacklist = localStorageBlacklist ? JSON.parse(localStorageBlacklist) : {};
    }


    ngOnInit() {
        this.updateRelevantData();
    }


    setPicturesToPresent() {
        if (this.relevantPictures.length == 0) {
            this.picturesToPresent = [];
            return;
        }

        if (this.isPaginationEnabled) {
            this.picturesToPresent = this.calculateCurrentPage();
        } else {
            this.picturesToPresent = this.relevantPictures.slice(0);
        }
    }


    addToBlackList(id: number) {
        this.blacklist[id] = true;
        localStorage.setItem('blacklist', JSON.stringify(this.blacklist));
    }


    performDeletePicture(id: number) {
        this.addToBlackList(id);
        this.updateRelevantData();
    }


    private updateRelevantData() {
        let notInBlacklist = (picture) => { return !this.blacklist[picture.id] };
        this.pictures = this.pictures.filter(notInBlacklist);
        this.relevantPictures = this.relevantPictures.filter(notInBlacklist);

        if (this.isSearchable && this.searchTerm != "") {
            this.relevantPictures = this.searchPictures();
        }

        if (this.isSortable && this.sortProperty != "") {
            this.sortRelevantPictures();
        }

        this.setPicturesToPresent();
    };


    performSetPage(pageNumber: number) {
        // Should be used only when pagination is enabled
        this.currentPage = pageNumber;
        this.picturesToPresent = this.calculateCurrentPage();
    }


    calculateCurrentPage() {
        this.pager = this.pagerService.getPager(this.relevantPictures.length, this.currentPage, this.resultsPerPage);

        if (this.currentPage < 1 || this.currentPage > this.pager.totalPages) {
            return;
        }
        return this.relevantPictures.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    performSearch(searchTerm: string) {
        this.searchTerm = searchTerm;
        if (this.searchTerm == "") {
            this.relevantPictures = this.pictures.slice(0) //copy pictures array;
        }
        this.currentPage = 1; // in any case, after changing this field, move to first page.
        this.updateRelevantData();
    }


    searchPictures(): Picture[] {
        let result: Picture[] = [];
        for (var picture of this.pictures) {
            if (picture.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())) {
                result.push(picture);
            }
        }
        return result;
    }


    performChangeResultsPerPage(resultsPerPage: string) {
        if (resultsPerPage == "") {
            this.resultsPerPage = this.defaultResultsPerPage;
        } else {
            this.resultsPerPage = parseInt(resultsPerPage);
        }
        this.performSetPage(1);
    }


    calacResultsPerPageOptions(): number[] {
        let allOptions = [5, 10, 15, 20];
        let relevantOptions = [];

        for (var i=0; i<allOptions.length; i++) {
            var currentOptionIsRelevant:boolean;
            currentOptionIsRelevant = this.relevantPictures.length >= allOptions[i] &&
                this.defaultResultsPerPage != allOptions[i];
            if (currentOptionIsRelevant) {
                relevantOptions.push(allOptions[i]);
            }
        }
        return relevantOptions;
    }


    performSort(sortProperty: string) {
        this.sortProperty = sortProperty;
        if (this.sortProperty == "") {
            this.relevantPictures = this.pictures.slice(0);
        }
        this.updateRelevantData();
    }


    sortRelevantPictures() {
        var x = this;

        this.relevantPictures.sort(
            function (picture1, picture2) {
                var compare1, compare2:any;
                if (x.sortProperty.localeCompare("date") == 0) {
                    compare1 = picture1.date;
                    compare2 = picture2.date;
                } else if (x.sortProperty.localeCompare("title") == 0) {
                    compare1 = picture1.title;
                    compare2 = picture2.title;
                }
                if (compare1 == compare2) {
                    return 0;
                } else if (compare1 < compare2) {
                    return -1;
                } else {
                    return 1;
                }
            })
    }


    showSlideShow() {
        this.isModalShown = true;
        this.isBigShowAutoRotated = true;
        this.bigShowCurrentIndex = 0;
        this.interval = setInterval(() => {
                this.bigShowCurrentIndex = (this.bigShowCurrentIndex + 1) % this.relevantPictures.length
            },
            this.rotateSeconds * 1000);
        return;
    }


    private resetInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }


    showBigImage(indexChosen) {
        this.isModalShown = true;
        this.isBigShowAutoRotated = false;
        this.bigShowCurrentIndex = indexChosen;
    }


    updateBigShowCurrentPicture(newIndex:number) {
        if (newIndex >= this.relevantPictures.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = this.relevantPictures.length - 1;
        }
        this.bigShowCurrentIndex = newIndex;
    }


    closeModal() {
        this.isModalShown = false;
        this.bigShowCurrentIndex = 0;
        if (this.isBigShowAutoRotated) {
            this.resetInterval();
        }
    }


    //updatePicturesToPresentByRows() {
    //
    //    this.picturesToPresentByRows = [];
    //
    //    var numOfRows = Math.round(this.picturesToPresent.length / this.imagesPerRow);
    //    for (var i = 0; i < numOfRows; i++) {
    //        var start = (this.currentPage - 1) * this.resultsPerPage / 5;
    //        var end = Math.min(start+this.imagesPerRow, this.picturesToPresent.length );
    //        this.picturesToPresentByRows.push(this.picturesToPresent.slice(start, end));
    //    }
    //}
}