import {Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[nwbDebounce]',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: NwbDebounceDirective, multi: true}],
})
export class NwbDebounceDirective implements OnInit, ControlValueAccessor {
  @Input() nwbDebounceDelay = 700;
  @Output() nwbDebounceChange: EventEmitter<any> = new EventEmitter();

  private _onChanged: Function;
  private _onTouched: Function;


  private _inputValue: any;

  private _modelValue: any;

  private _timerId: number;

  constructor(private elementRef: ElementRef) {
  }

  writeValue(value: any): void {
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
    this._inputValue = value;

    if (this.elementRef.nativeElement.value !== value) {
      this.elementRef.nativeElement.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }


  ngOnInit(): void {
    this._inputValue = this.elementRef.nativeElement.value;

    const eventStreamKeyUp = Observable
      .fromEvent(this.elementRef.nativeElement, 'keyup')
      .map(() => this.elementRef.nativeElement.value);

    eventStreamKeyUp.subscribe((input: any) => this.valueChange(input));

    const eventStreamChange = Observable
      .fromEvent(this.elementRef.nativeElement, 'change')
      .map(() => this.elementRef.nativeElement.value);

    eventStreamChange.subscribe((input: any) => this.valueChange(input));

  }


  private valueChange(value: any) {
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
    this._timerId = setTimeout(() => {
      if (this._inputValue !== value) {
        this._inputValue = value;
        this.nwbDebounceChange.emit(value);

        if (this._modelValue !== this._inputValue) {
          this._modelValue = this._inputValue;
          this._onChanged(this._inputValue);
        }
      }
    }, this.nwbDebounceDelay);


  }

}
