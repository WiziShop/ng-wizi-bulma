import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogDemo} from './features/dialog/dialog-demo';
import {SnackbarDemo} from './features/snackbar/snackbar-demo';
import {PaginatorDemo} from './features/paginator/paginator-demo';
import {SpinnerDemo} from './features/spinner/spinner-demo';
import {DropdownDemo} from './features/dropdown/dropdown-demo';
import {ProgressBarDemo} from './features/progress-bar/progress-bar-demo';
import {Home} from './features/home/home';
import {DebounceDemo} from './features/debounce/debounce-demo';
import {ModalSearchDemo} from './features/modal-search/modal-search-demo';


const appRoutes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'dialog',
    component: DialogDemo
  },
  {
    path: 'snackbar',
    component: SnackbarDemo
  },
  {
    path: 'paginator',
    component: PaginatorDemo
  },
  {
    path: 'spinner',
    component: SpinnerDemo
  },
  {
    path: 'dropdown',
    component: DropdownDemo
  },
  {
    path: 'progress-bar',
    component: ProgressBarDemo
  },
  {
    path: 'debounce',
    component: DebounceDemo
  },
  {
    path: 'modal-search',
    component: ModalSearchDemo
  },
  {
    path: '**',
    component: Home
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class DemoAppRoutingModule {
}
