/** Directive used to connect an input to a MatDatepicker. */
import { Directive, ElementRef, Input } from '@angular/core';
import { NwbDatePickerInputBaseDirective } from './date-picker-input-base.directive';

@Directive({
  selector: 'input[nwbDateType]',
})
export class NwbDatePickerInputDateTypeDirective extends NwbDatePickerInputBaseDirective {
  @Input() nwbDateType;

  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }
}
