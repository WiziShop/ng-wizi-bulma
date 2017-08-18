import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogDemo} from './features/dialog/dialog-demo';
import {SnackbarDemo} from './features/snackbar/snackbar-demo';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dialog',
    pathMatch: 'full'
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
    path: '**',
    component: DialogDemo
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
