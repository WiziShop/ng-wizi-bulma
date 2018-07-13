import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NwbSnackbarService} from './snackbar.service';
import {NwbSnackbarComponent} from './snackbar.component';
import {NwbCommonModule} from '../shared/common-module';


@NgModule({
  imports: [
    CommonModule,
    NwbCommonModule,
  ],
  providers: [NwbSnackbarService],
  entryComponents: [NwbSnackbarComponent],
  declarations: [NwbSnackbarComponent],
  exports: [NwbSnackbarComponent],
})
export class NwbSnackbarModule {
}
