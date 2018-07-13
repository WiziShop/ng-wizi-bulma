import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwbDialogComponent} from './dialog.component';
import {NwbDialogService} from './dialog.service';
import {NwbCommonModule} from '../shared/common-module';


@NgModule({
  imports: [
    CommonModule,
    NwbCommonModule,
  ],
  providers: [NwbDialogService],
  entryComponents: [NwbDialogComponent],
  declarations: [NwbDialogComponent],
  exports: [NwbDialogComponent],
})
export class NwbDialogModule {
}
