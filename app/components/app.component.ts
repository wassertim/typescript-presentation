import {RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {Component} from "angular2/core";
import {HTTP_PROVIDERS} from 'angular2/http';
import {PagesComponent} from './pages.component';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
@RouteConfig([
  {path:'/:id', name: 'Pages', component: PagesComponent}
])
export class AppComponent {}
