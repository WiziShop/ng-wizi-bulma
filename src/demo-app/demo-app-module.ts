import {ApplicationRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DemoApp} from './demo-app/demo-app';
import {NwbModule} from 'ng-wizi-bulma';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    NwbModule,
  ],
  declarations: [DemoApp],
  providers: [],
  entryComponents: [DemoApp],
})
export class DemoAppModule {
  constructor(private _appRef: ApplicationRef) {
  }

  ngDoBootstrap() {
    this._appRef.bootstrap(DemoApp);
  }
}
