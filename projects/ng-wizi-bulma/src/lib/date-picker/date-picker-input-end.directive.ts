/** Directive used to connect an input to a MatDatepicker. */
import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NwbDatePickerComponent } from './date-picker.component';
import { NwbDatePickerInputBaseDirective } from './date-picker-input-base.directive';

@Directive({
  selector: 'input[nwbDatepickerEnd]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NwbDatePickerInputEndDirective,
      multi: true,
    },
  ],
})
export class NwbDatePickerInputEndDirective extends NwbDatePickerInputBaseDirective {
  /** The datepicker that this input is associated with. */
  @Input()
  set nwbDatepickerEnd(datePickerComponent: NwbDatePickerComponent) {
    this.registerInput(datePickerComponent, 'endDate');
  }

  @Input() nwbDateType;

  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }
}
