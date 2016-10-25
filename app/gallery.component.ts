/**
 * Created by nogalavi on 18/10/2016.
 */
import {Component, Input} from '@angular/core'
import {GetPicturesService} from "./get-pictures.service";
import {PagerService} from "./pager.service";
import {Picture} from "./picture";


@Component({
  selector: 'gallery',
  templateUrl: './app/gallery.component.html',
  styleUrls: ['./app/gallery.css'],
  inputs: ['feedUrl', 'isSearchable', 'isPaginationEnabled', 'defaultResultsPerPage', 'isSortable', 'rotateSeconds'],
})

export class GalleryComponent {

  // Input variables
  feedUrl:string;
  backupFeedUrl:string = "./app/assets/json/pictures.json";
  isSearchable:boolean = true;
  isPaginationEnabled:boolean = true;
  isSortable:boolean = true;

  defaultResultsPerPage:number = 10;
  resultsPerPage:number;
  rotateSeconds:number = 4;


  pictures:Picture[]; // All pictures array (excluding blacklist)
  picturesToPresent:Picture[]; // Array of pictures in the current page
  relevantPictures:Picture[]; // pictures from pictures array that are relevant to search and sort

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

  // Blacklist variables
  blacklist:{[id: number]: boolean}; // {88: true, 89: true} doesn't allow duplicate keys

  pictureHooveredIndex:number; // The hoovered picture will have an "erase" button
  isPicturesReceived:boolean = false; // will update once, when pictures are received from get-pictures service.


  constructor(private getPicturesService:GetPicturesService, private pagerService:PagerService) {
  }


  ngOnInit() {
    let localStorageBlacklist = localStorage.getItem('blacklist');
    this.blacklist = localStorageBlacklist ? JSON.parse(localStorageBlacklist) : {};
    this.resultsPerPage = this.defaultResultsPerPage;
    this.loadPictures();
  }



  private handleLoadPicturesError(error:any) {
    console.log(error + "\n An error with the given url has occurred. Will load default images.");
    this.feedUrl = this.backupFeedUrl;
    this.loadPictures();
  }


  private loadPictures() {
    this.getPicturesService.getPictures(this.feedUrl).subscribe(
      (pictures) => {
        this.isPicturesReceived = true;
        this.pictures = pictures;
        this.relevantPictures = this.pictures.slice(0); // copy pictures array
        this.updateRelevantData();
      },
      (err) => {
        this.handleLoadPicturesError(err)
      }
    );
  }


  /**
   * Calculates the pictures that should be presented currently, for example if
   * pagination is disables, it will be all relevant pictures.
   * Updates "this.picturesToPresent" in place.
   */
  private setPicturesToPresent() {
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


  private addToBlackList(id:number) {
    this.blacklist[id] = true;
    localStorage.setItem('blacklist', JSON.stringify(this.blacklist));
  }


  /**
   * This is a function that updates relevant data array,
   * and it is used after events like init, search, sort - or any event that changes the pictures displayed.
   */
  private updateRelevantData() {

    let notInBlacklist = (picture:Picture) => {
      return !this.blacklist[picture.id]
    };
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


  /**
   * Functions starting with "perform" are invoked by a DOM event.
   * The function deletes the picture from the currrent page by
   * Updating relevantData.
   */
  performDeletePicture(id:number) {
    this.addToBlackList(id);
    this.updateRelevantData();
  }


  performSetPage(pageNumber:number) {
    // Should be used only when pagination is enabled
    this.currentPage = pageNumber;
    this.picturesToPresent = this.calculateCurrentPage();
  }


  private calculateCurrentPage() {
    this.pager = this.pagerService.getPager(this.relevantPictures.length, this.currentPage, this.resultsPerPage);

    if (this.currentPage < 1 || this.currentPage > this.pager.totalPages) {
      return;
    }
    return this.relevantPictures.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  performSearch(searchTerm:string) {
    this.searchTerm = searchTerm;
    if (this.searchTerm == "") {
      this.relevantPictures = this.pictures.slice(0) //copy pictures array;
    }
    this.currentPage = 1; // in any case, after changing this field, move to first page.
    this.updateRelevantData();
  }


  private searchPictures():Picture[] {
    let result:Picture[] = [];
    for (var picture of this.pictures) {
      if (picture.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())) {
        result.push(picture);
      }
    }
    return result;
  }


  performChangeResultsPerPage(resultsPerPage:string) {
    if (resultsPerPage == "") {
      this.resultsPerPage = this.defaultResultsPerPage;
    } else {
      this.resultsPerPage = parseInt(resultsPerPage);
    }
    this.performSetPage(1);
  }


  /**
   * Returns only relevant results for the "results per page" dropdown.
   * For example, if only 5 pictures are relevant, then 10, 15, 20 will be emitted.
   */
  calacResultsPerPageOptions():number[] {
    let allOptions = [5, 10, 15, 20];
    let relevantOptions:number[] = [];

    for (var i = 0; i < allOptions.length; i++) {
      var currentOptionIsRelevant:boolean;
      currentOptionIsRelevant = this.relevantPictures.length >= allOptions[i] &&
        this.defaultResultsPerPage != allOptions[i];
      if (currentOptionIsRelevant) {
        relevantOptions.push(allOptions[i]);
      }
    }
    return relevantOptions;
  }


  performSort(sortProperty:string) {
    this.sortProperty = sortProperty;
    if (this.sortProperty == "") {
      this.relevantPictures = this.pictures.slice(0);
    }
    this.updateRelevantData();
  }


  private sortRelevantPictures() {
    var x = this;

    this.relevantPictures.sort(
      function (picture1, picture2) {
        var compare1:any, compare2:any;
        if (x.sortProperty.localeCompare("date") == 0) {
          compare1 = new Date(picture1.date);
          compare2 = new Date(picture2.date);
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


  performShowSlideShow() {
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


  performShowBigImage(indexChosen:number) {
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


  performCloseModal() {
    this.isModalShown = false;
    this.bigShowCurrentIndex = 0;
    if (this.isBigShowAutoRotated) {
      this.resetInterval();
    }
  }


  onPictureMouseEnter(hooveredIndex:number) {
    this.pictureHooveredIndex = hooveredIndex;
  }


  onPictureMouseLeave() {
    this.pictureHooveredIndex = -1;
  }

}
