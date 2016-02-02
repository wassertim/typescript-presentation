import {HighlightDirective} from './highlight.directive';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Component, DynamicComponentLoader} from "angular2/core";
import {PAGES} from '../data/pages';
import {OnInit, Injector} from 'angular2/core';

interface IPage {
  name: string,
  url: string
}
@Component({
    selector: 'my-app',
    templateUrl: 'app/components/pages.component.html',
    directives: [HighlightDirective, ROUTER_DIRECTIVES]
})
export class PagesComponent implements OnInit {
  pages: IPage[];
  pageIndex: number = 0;

  constructor(
    private loader: DynamicComponentLoader,
    private injector: Injector,
    private http: Http,
    routeParams: RouteParams
  ) {
    this.pageIndex = +routeParams.get('id');
  }

  getPages(): IPage[] {
    return PAGES;
  }

  ngOnInit() {
    this.pages = this.getPages();
    this.http.get(this.pages[this.pageIndex].url).toPromise().then(response => {
      return response.text();
    }).then(body => {
      this.loader.loadAsRoot(
        this.toComponent(body, [HighlightDirective]),
        '#main',
        this.injector
      );
    });
  }

  toComponent(template: string, directives = []) {
    @Component({ selector: 'fake-component', template, directives })
    class FakeComponent {}

    return FakeComponent;
  }
}
