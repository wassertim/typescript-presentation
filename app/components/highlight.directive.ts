import {Directive, ElementRef, Input} from 'angular2/core';
import Prism from '../tds/prism';


@Directive({
    selector: '[highlight]'
})
export class HighlightDirective {
    constructor(el: ElementRef) {              
      Prism.highlightElement(el.nativeElement);
    }
}
