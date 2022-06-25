import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NwbCommonModule } from '../shared/common-module';
import { NwbDatePickerComponent } from './date-picker.component';
import { NwbDatePickerInputStartDirective } from './date-picker-input-start.directive';
import { NwbDatePickerInputEndDirective } from './date-picker-input-end.directive';
import { NwbDatePickerInputDateTypeDirective } from './date-picker-input-date-type.directive';

@NgModule({
    imports: [CommonModule, NwbCommonModule],
    providers: [],
    declarations: [
        NwbDatePickerComponent,
        NwbDatePickerInputStartDirective,
        NwbDatePickerInputEndDirective,
        NwbDatePickerInputDateTypeDirective,
    ],
    exports: [NwbDatePickerComponent, NwbDatePickerInputStartDirective, NwbDatePickerInputEndDirective, NwbDatePickerInputDateTypeDirective]
})
export class NwbDatePickerModule {}
