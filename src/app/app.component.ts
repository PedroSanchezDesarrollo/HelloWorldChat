import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HelloWorldChat';

  constructor(public translate:TranslateService){
    translate.addLangs(['es','en']);
    translate.setDefaultLang('en');
  }
}
