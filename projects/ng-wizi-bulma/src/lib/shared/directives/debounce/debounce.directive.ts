import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[nwbDebounce]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NwbDebounceDirective,
      multi: true
    }
  ]
})
export class NwbDebounceDirective implements OnInit, ControlValueAccessor, OnDestroy {
  @Input()
  nwbDebounceDelay = 700;
  @Output()
  nwbDebounceChange: EventEmitter<any> = new EventEmitter();

  private _onChanged: Function;
  private _onTouched: Function;

  private _inputValue: any;

  private _modelValue: any;

  private _timerId;

  private _eventStreamKeyUp: Subscription;
  private _eventStreamChange: Subscription;

  constructor(private elementRef: ElementRef) {}

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

    const eventStreamKeyUp = fromEvent(this.elementRef.nativeElement, 'keyup').pipe(map(() => this.elementRef.nativeElement.value));

    this._eventStreamKeyUp = eventStreamKeyUp.subscribe((input: any) => this.valueChange(input));

    const eventStreamChange = fromEvent(this.elementRef.nativeElement, 'change').pipe(map(() => this.elementRef.nativeElement.value));

    this._eventStreamChange = eventStreamChange.subscribe((input: any) => this.valueChange(input));
  }

  ngOnDestroy() {
    this._eventStreamKeyUp.unsubscribe();
    this._eventStreamChange.unsubscribe();
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
          if (typeof this._onChanged === 'function') {
            this._onChanged(this._inputValue);
          }
        }
      }
    }, this.nwbDebounceDelay);
  }
}
