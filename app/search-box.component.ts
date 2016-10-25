/**
 * Created by nogalavi on 20/10/2016.
 */
import {Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "search-box",
    template:  `<div id="search-component">
                    Search:
                    <input #input type = "text" (input)="update.emit(input.value)"  [readOnly] = disabled/>
                </div>
                `,
    outputs: ['update'],
    inputs: ['disabled']
})
export class SearchBox {
    public update = new EventEmitter();
    public disabled = false;

    ngOnInit() {
        this.update.emit("");
    }

}
