/** Directive used to connect an input to a MatDatepicker. */
import { ElementRef, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NwbDatePickerComponent, NwbDatePickerEvent } from './date-picker.component';
import { Subscription } from 'rxjs';

const ALLOWED_INPUT_TYPE = ['date', 'datetime-local'];

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

  private _value: string;

  protected registerInput(datePickerComponent: NwbDatePickerComponent, inputType: 'startDate' | 'endDate') {
    if (!(datePickerComponent instanceof NwbDatePickerComponent)) {
      return;
    }

    const type = this.elementRef.nativeElement.getAttribute('type');
    if (!ALLOWED_INPUT_TYPE.includes(type)) {
      throw Error(`Datepicker input type: ${type} is not allowed. Allowed types: ${ALLOWED_INPUT_TYPE.join(', ')}`);
    }

    this._datepicker = datePickerComponent;
    this._datepicker._registerInput(this, inputType);
    this._datepickerSubscription.unsubscribe();

    this._datepickerSubscription = this._datepicker.change.subscribe((value: NwbDatePickerEvent) => {
      let dateStr;
      if (inputType === 'startDate') {
        dateStr = this.formatValue(value.startDate);
      } else {
        dateStr = this.formatValue(value.endDate);
      }

      this.elementRef.nativeElement.value = dateStr;
      this._value = dateStr;

      if (this._onChanged) {
        this._onChanged(dateStr);
      }
    });
  }

  protected formatValue(date: Date) {
    const type = this.elementRef.nativeElement.getAttribute('type');

    const timeStr = date.toLocaleTimeString('us');

    let dateStr = date
      .toLocaleDateString('us')
      .split('/')
      .reverse()
      .join('-');
    if (type === 'datetime-local') {
      dateStr += 'T' + timeStr;
    }

    return dateStr;
  }

  getDate() {
    if (!this._value) {
      return new Date();
    }

    return new Date(this._value);
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
