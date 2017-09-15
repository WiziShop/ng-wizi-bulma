import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwbDialogService} from './dialog.service';
import {NwbDialogComponent} from './dialog.component';
import {NwbSpinnerModule} from '../spinner/index';

@NgModule({
  imports: [CommonModule, NwbSpinnerModule],
  providers: [NwbDialogService],
  declarations: [NwbDialogComponent],
  entryComponents: [NwbDialogComponent],
  exports: [NwbDialogComponent],
})
export class NwbDialogModule {
}


export * from './dialog.component';
export * from './dialog.service';
