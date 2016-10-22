import {PagerService} from "../app/pager.service";
/**
     * Created by nogalavi on 22/10/2016.
     */


describe('MyService Tests', () => {
    let service:PagerService = new PagerService();

    it('current page should be 1', () => {
        var pager = service.getPager(10,1,2);

        expect (pager.currentPage == 1);
    });
});
