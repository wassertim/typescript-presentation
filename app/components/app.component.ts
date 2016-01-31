import {RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {Component} from "angular2/core";
import {PagesComponent} from './pages.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'/:id', name: 'Pages', component: PagesComponent}
])
export class AppComponent {
  pages = [
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
}
