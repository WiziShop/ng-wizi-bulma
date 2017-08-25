import {ApplicationRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DemoApp} from './demo-app';
import {NwbModule} from 'ng-wizi-bulma';
import {DemoAppRoutingModule} from './demo-app-routing.module';
import {DialogDemo} from './features/dialog/dialog-demo';
import {FakeDialogDemoComponent} from './features/dialog/fake-dialog-demo-component';
import {SnackbarDemo} from './features/snackbar/snackbar-demo';
import {PaginatorDemo} from './features/paginator/paginator-demo';
import {SpinnerDemo} from './features/spinner/spinner-demo';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    NwbModule,
    DemoAppRoutingModule,
  ],
  declarations: [
    DemoApp,
    DialogDemo,
    FakeDialogDemoComponent,
    SnackbarDemo,
    PaginatorDemo,
    SpinnerDemo,
  ],
  providers: [],
  entryComponents: [
    DemoApp,
    FakeDialogDemoComponent,
  ],
})
export class DemoAppModule {
  constructor(private _appRef: ApplicationRef) {
  }

  ngDoBootstrap() {
    this._appRef.bootstrap(DemoApp);
  }
}
