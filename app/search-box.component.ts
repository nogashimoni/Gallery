/**
 * Created by nogalavi on 20/10/2016.
 */
import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "search-box",
    template:  `<div id="search-component">
                    <input #input type = "text" (input)="update.emit(input.value)" />
                </div>
                `,
    outputs: ['update']
})
export class SearchBox {
    public update = new EventEmitter();

    ngOnInit() {
        this.update.emit("");
    }
}