import {ElementRef} from 'angular2/core';

declare module Prism {
  export function highlightElement(element: any): any;
}

export default Prism;
