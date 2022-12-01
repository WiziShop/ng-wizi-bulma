import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertDemo } from './features/alert/alert-demo';
import { AnimatedCardDemo } from './features/animated-card/animated-card-demo';
import { DatePickerDemo } from './features/date-picker/date-picker-demo';
import { DebounceDemo } from './features/debounce/debounce-demo';
import { DialogDemo } from './features/dialog/dialog-demo';
import { DropdownDemo } from './features/dropdown/dropdown-demo';
import { EditInPlaceDemo } from './features/edit-in-place/edit-in-place-demo';
import { Home } from './features/home/home';
import { ModalSearchDemo } from './features/modal-search/modal-search-demo';
import { PaginatorDemo } from './features/paginator/paginator-demo';
import { ProgressBarDemo } from './features/progress-bar/progress-bar-demo';
import { SnackbarDemo } from './features/snackbar/snackbar-demo';
import { SortDemo } from './features/sort/sort-demo';
import { SpinnerDemo } from './features/spinner/spinner-demo';
import { SwitchDemo } from './features/switch/switch-demo';
import { TableDemo } from './features/table/table-demo';
import { TabsDemo } from './features/tabs/tabs-demo.component';
import { TooltipDemo } from './features/tooltip/tooltip-demo';

const appRoutes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'dialog',
    component: DialogDemo,
  },
  {
    path: 'snackbar',
    component: SnackbarDemo,
  },
  {
    path: 'alert',
    component: AlertDemo,
  },
  {
    path: 'animated-card',
    component: AnimatedCardDemo,
  },
  {
    path: 'paginator',
    component: PaginatorDemo,
  },
  {
    path: 'spinner',
    component: SpinnerDemo,
  },
  {
    path: 'dropdown',
    component: DropdownDemo,
  },
  {
    path: 'progress-bar',
    component: ProgressBarDemo,
  },
  {
    path: 'debounce',
    component: DebounceDemo,
  },
  {
    path: 'modal-search',
    component: ModalSearchDemo,
  },
  {
    path: 'tabs',
    component: TabsDemo,
  },
  {
    path: 'tabs/:basicTabIndex',
    component: TabsDemo,
  },
  {
    path: 'switch',
    component: SwitchDemo,
  },
  {
    path: 'tooltip',
    component: TooltipDemo,
  },
  {
    path: 'table',
    component: TableDemo,
  },
  {
    path: 'edit-in-place',
    component: EditInPlaceDemo,
  },
  {
    path: 'sort',
    component: SortDemo,
  },
  {
    path: 'date-picker',
    component: DatePickerDemo,
  },
  {
    path: '**',
    component: Home,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {})],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
