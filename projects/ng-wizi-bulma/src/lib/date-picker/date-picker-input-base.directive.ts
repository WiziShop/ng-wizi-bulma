/** Directive used to connect an input to a MatDatepicker. */
import { Directive, ElementRef, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NwbDatePickerComponent, NwbDatePickerEvent } from './date-picker.component';
import { Subscription } from 'rxjs';

@Directive()
export abstract class NwbDatePickerInputBaseDirective implements ControlValueAccessor, OnDestroy {
  protected _onChanged: Function;
  protected _onTouched: Function;

  protected _datepicker: NwbDatePickerComponent;

  private _datepickerSubscription = Subscription.EMPTY;

  /** Emits when the value changes (either due to user input or programmatic change). */
  _valueChange = new EventEmitter<string>();

  protected constructor(public elementRef: ElementRef) {}

  /** The value of the input. */
  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    const oldDate = this.value;
    this._value = value;

    this.elementRef.nativeElement.value = value;

    if (!!oldDate && oldDate !== value) {
      this._valueChange.emit(value);
    }
  }

  @Input()
  nwbDateType: 'date' | 'datetime' = 'date';

  set dateType(type: 'date' | 'datetime') {
    this.nwbDateType = type;
  }

  get dateType() {
    return this.nwbDateType;
  }

  private _value: string;

  protected registerInput(datePickerComponent: NwbDatePickerComponent, inputType: 'startDate' | 'endDate') {
    if (!(datePickerComponent instanceof NwbDatePickerComponent)) {
      return;
    }

    const type = this.elementRef.nativeElement.getAttribute('type');
    if (type !== 'text') {
      console.warn(
        `nwb-date-picker deprecated warning. The use of an input type "date" or "datetime-local" is now deprecated due to the lack of timezone. Use an input type "text" and set the attribute "nwbDateType" instead.`
      );

      this.dateType = type === 'date' ? 'date' : 'datetime';

      this.elementRef.nativeElement.setAttribute('type', 'text');
    }

    this._datepicker = datePickerComponent;
    this._datepicker._registerInput(this, inputType);
    this._datepickerSubscription.unsubscribe();

    this._datepickerSubscription = this._datepicker.change.subscribe((value: NwbDatePickerEvent) => {
      let dateStr;
      if (inputType === 'startDate') {
        dateStr = value.startDate.toISOString();
      } else {
        dateStr = value.endDate.toISOString();
      }

      this.elementRef.nativeElement.value = dateStr;
      this._value = dateStr;

      if (this._onChanged) {
        this._onChanged(dateStr);
      }
    });
  }

  getDate() {
    if (!this._value) {
      return new Date();
    }

    const date = new Date(this._value);
    const finalDate = new Date();

    finalDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    finalDate.setHours(date.getHours(), date.getMinutes(), 0, 0);
    if (this.dateType === 'date') {
      finalDate.setHours(0, 0, 0, 0);
    }

    return finalDate;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  ngOnDestroy() {
    this._datepickerSubscription.unsubscribe();
  }
}
