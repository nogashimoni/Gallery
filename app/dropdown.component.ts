/**
 * Created by nogalavi on 21/10/2016.
 */

import {Component, EventEmitter} from "angular2/core";

@Component({
    selector: "drop-down",
    template:`
        <div>
        <h8> {{title}} </h8>
        <select #result (change)="update.emit(result.value)" [disabled]="disabled" >
            <option value = ""> {{defaultOptionText}} </option>
            <option *ngFor="#option of options" > {{option}} </option>
        </select>
        </div>`,
    inputs: ['title', 'options', 'defaultOptionText', 'disabled'],
    outputs: ['update']
})

export class DropDown {
    title: string
    options: string[]
    defaultOptionText: string;
    disabled: boolean;

    public update = new EventEmitter();

    ngOnInit() {
        this.update.emit("");
    }

}