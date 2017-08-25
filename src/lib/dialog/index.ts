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
  exports: [],
})
export class NwbDialogModule {
}


export * from './dialog.service';
