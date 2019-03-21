import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NwbCommonModule } from '../shared';
import { NwbDatePickerComponent } from './date-picker.component';

@NgModule({
  imports: [CommonModule, NwbCommonModule],
  providers: [],
  entryComponents: [NwbDatePickerComponent],
  declarations: [NwbDatePickerComponent],
  exports: [NwbDatePickerComponent]
})
export class NwbDatePickerModule {}
