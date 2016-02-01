import {HighlightDirective} from './highlight.directive';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Component, DynamicComponentLoader} from "angular2/core";
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
  pages: IPage[] = [
    {
      name: 'Introduction',
      url: 'app/pages/introduction.html'
    },
    {
      name: 'Basic Types',
      url: 'app/pages/basic-types.html'
    },
    {
      name: 'Interfaces',
      url: 'app/pages/interfaces.html'
    },
    {
      name: 'Classes',
      url: 'app/pages/classes.html'
    },
    {
      name: 'Tools',
      url: 'app/pages/tools.html'
    }
  ];
  pageIndex: number = 0;

  constructor(
    private loader: DynamicComponentLoader,
    private injector: Injector,
    private http: Http,
    routeParams: RouteParams
  ) {
    this.pageIndex = +routeParams.get('id');
  }

  ngOnInit() {
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
