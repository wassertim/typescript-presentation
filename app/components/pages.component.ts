import {HighlightDirective} from './highlight.directive';
import {RouteConfig, RouterOutlet, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Component, DynamicComponentLoader, OnInit, Injector} from "angular2/core";

interface IPage {
  id: number,
  name: string,
  url: string
}
@Component({
    selector: 'my-app',
    templateUrl: 'app/components/pages.component.html',
    directives: [HighlightDirective, ROUTER_DIRECTIVES]
})
export class PagesComponent implements OnInit {
  loader: DynamicComponentLoader;
  injector: Injector;
  pages: IPage[] = [
    {
      id: 0,
      name: 'Basic Types',
      url: 'app/pages/basic-types.html'
    },
    {
      id: 1,
      name: 'Interfaces',
      url: 'app/pages/interfaces.html'
    },
    {
      id: 2,
      name: 'Classes',
      url: 'app/pages/classes.html'
    }
  ];

  pageIndex: number = 0;

  constructor(dcl: DynamicComponentLoader, injector: Injector, routeParams: RouteParams) {
    this.loader = dcl;
    this.injector = injector;
    this.pageIndex = +routeParams.get('id');
  }

  ngOnInit() {
    window.fetch(this.pages[this.pageIndex].url).then((response) => {
      return response.text();
    }).then((body) => {
      this.loader.loadAsRoot(
        this.toComponent(body, [HighlightDirective]),
        '#main',
        this.injector
      );
    });
  }

  toComponent(template, directives = []) {
    @Component({ selector: 'fake-component', template, directives })
    class FakeComponent {}

    return FakeComponent;
  }
}
