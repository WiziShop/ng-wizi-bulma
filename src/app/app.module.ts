import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { DialogDemo } from './features/dialog/dialog-demo';
import { FakeDialogDemoComponent } from './features/dialog/fake-dialog-demo.component';
import { SnackbarDemo } from './features/snackbar/snackbar-demo';
import { PaginatorDemo } from './features/paginator/paginator-demo';
import { SpinnerDemo } from './features/spinner/spinner-demo';
import { TabsDemo } from './features/tabs/tabs-demo.component';
import { DropdownDemo } from './features/dropdown/dropdown-demo';
import { ProgressBarDemo } from './features/progress-bar/progress-bar-demo';
import { Home } from './features/home/home';
import { DebounceDemo } from './features/debounce/debounce-demo';
import { EditUserDialogDemoComponent } from './features/dialog/edit-user-dialog-demo.component';
import { ModalSearchDemo } from './features/modal-search/modal-search-demo';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SwitchDemo } from './features/switch/switch-demo';
import { DocPreviewComponent } from './doc-preview/doc-preview.component';
import { AlertDemo } from './features/alert/alert-demo';
import { TooltipDemo } from './features/tooltip/tooltip-demo';
import { AnimatedCardDemo } from './features/animated-card/animated-card-demo';
import { TableDemo } from './features/table/table-demo';
import { HttpClientModule } from '@angular/common/http';
import { SortDemo } from './features/sort/sort-demo';

import {
  NwbAlertModule,
  NwbAnimatedCardModule,
  NwbCommonModule,
  NwbDialogModule,
  NwbDropdownModule,
  NwbModalSearchModule,
  NwbPaginatorModule,
  NwbProgressBarModule,
  NwbSnackbarModule,
  NwbSortModule,
  NwbSwitchModule,
  NwbTabsModule
} from '@wizishop/ng-wizi-bulma';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CdkTableModule,

    NwbCommonModule,
    NwbAlertModule,
    NwbAnimatedCardModule,
    NwbDialogModule,
    NwbDropdownModule,
    NwbModalSearchModule,
    NwbPaginatorModule,
    NwbProgressBarModule,
    NwbSnackbarModule,
    NwbSortModule,
    NwbSwitchModule,
    NwbTabsModule
  ],
  declarations: [
    AppComponent,
    DocPreviewComponent,
    DialogDemo,
    FakeDialogDemoComponent,
    SnackbarDemo,
    PaginatorDemo,
    SpinnerDemo,
    TabsDemo,
    DropdownDemo,
    ProgressBarDemo,
    Home,
    DebounceDemo,
    EditUserDialogDemoComponent,
    ModalSearchDemo,
    SwitchDemo,
    AlertDemo,
    AnimatedCardDemo,
    TooltipDemo,
    TableDemo,
    SortDemo
  ],
  providers: [],
  entryComponents: [FakeDialogDemoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
