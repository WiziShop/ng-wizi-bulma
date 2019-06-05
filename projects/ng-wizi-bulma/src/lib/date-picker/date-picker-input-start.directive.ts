/** Directive used to connect an input to a MatDatepicker. */
import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NwbDatePickerComponent } from './date-picker.component';
import { NwbDatePickerInputBaseDirective } from './date-picker-input-base.directive';

@Directive({
  selector: 'input[nwbDatepickerStart]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NwbDatePickerInputStartDirective,
      multi: true
    }
  ]
})
export class NwbDatePickerInputStartDirective extends NwbDatePickerInputBaseDirective {
  /** The datepicker that this input is associated with. */
  @Input()
  set nwbDatepickerStart(datePickerComponent: NwbDatePickerComponent) {
    this.registerInput(datePickerComponent, 'startDate');
  }

  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }
}
