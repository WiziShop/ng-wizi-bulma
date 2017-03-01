import {NgModule} from '@angular/core';
import {NwbSnackbarComponent} from './snackbar.component';
import {NwbSnackbarService} from './snackbar.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [NwbSnackbarService],
  declarations: [NwbSnackbarComponent],
  entryComponents: [NwbSnackbarComponent],
  exports: [],
})
export class NwbSnackbarModule {
}


export * from './snackbar.service';
