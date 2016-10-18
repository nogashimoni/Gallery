/**
 * Created by nogalavi on 18/10/2016.
 */

import {Component, Input} from 'angular2/core'

@Component({
    selector: 'page',
    template: `<h2> This is a page component. the feed is: {{ feed }}  </h2>`,
    inputs: ['feed']

})

export class PageComponent {

}