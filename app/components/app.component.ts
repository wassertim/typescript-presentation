import {HighlightDirective} from './highlight.directive';
import {Component, DynamicComponentLoader, OnInit, Injector} from "angular2/core";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [HighlightDirective]
})
export class AppComponent implements OnInit {
  loader: DynamicComponentLoader;
  injector: Injector;
  pages = [
    {
      name: 'Basic Types',
      url: 'app/pages/basic-types.html'
    }
  ];

  constructor(dcl: DynamicComponentLoader, injector: Injector) {
    this.loader = dcl;
    this.injector = injector;
  }

  ngOnInit() {
    window.fetch(this.pages[0].url).then((response) => {
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
