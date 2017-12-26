import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {DialogDemo} from './features/dialog/dialog-demo';
import {FakeDialogDemoComponent} from './features/dialog/fake-dialog-demo.component';
import {SnackbarDemo} from './features/snackbar/snackbar-demo';
import {PaginatorDemo} from './features/paginator/paginator-demo';
import {SpinnerDemo} from './features/spinner/spinner-demo';
import {DropdownDemo} from './features/dropdown/dropdown-demo';
import {ProgressBarDemo} from './features/progress-bar/progress-bar-demo';
import {Home} from './features/home/home';
import {DebounceDemo} from './features/debounce/debounce-demo';
import {EditUserDialogDemoComponent} from './features/dialog/edit-user-dialog-demo.component';
import {ModalSearchDemo} from './features/modal-search/modal-search-demo';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NwbModule} from 'ng-wizi-bulma';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NwbModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    DialogDemo,
    FakeDialogDemoComponent,
    SnackbarDemo,
    PaginatorDemo,
    SpinnerDemo,
    DropdownDemo,
    ProgressBarDemo,
    Home,
    DebounceDemo,
    EditUserDialogDemoComponent,
    ModalSearchDemo,
  ],
  providers: [],
  entryComponents: [
    FakeDialogDemoComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
