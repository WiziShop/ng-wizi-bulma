import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NwbCommonModule } from '../shared/common-module';
import { NwbDatePickerComponent } from './date-picker.component';
import { NwbDatePickerInputStartDirective } from './date-picker-input-start.directive';
import { NwbDatePickerInputEndDirective } from './date-picker-input-end.directive';

@NgModule({
  imports: [CommonModule, NwbCommonModule],
  providers: [],
  entryComponents: [NwbDatePickerComponent],
  declarations: [NwbDatePickerComponent, NwbDatePickerInputStartDirective, NwbDatePickerInputEndDirective],
  exports: [NwbDatePickerComponent, NwbDatePickerInputStartDirective, NwbDatePickerInputEndDirective]
})
export class NwbDatePickerModule {}
