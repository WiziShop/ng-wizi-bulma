import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'nwb-edit-in-place',
  templateUrl: './edit-in-place.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NwbEditInPlaceComponent,
      multi: true
    }
  ]
})
export class NwbEditInPlaceComponent implements ControlValueAccessor, AfterViewChecked, OnChanges {
  @Input()
  config: NwbEditInPlaceConfig = {};

  @Output() customChange = new EventEmitter<any>();

  @ViewChild('input')
  input: ElementRef;

  public currentValue: string | number;
  private preValue: string | number;

  public inputWidth: number;
  public editing = false;
  public isLoading: boolean;
  private firstEdit: boolean;
  private initialized: boolean;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  get value(): any {
    return this.currentValue;
  }

  set value(v: any) {
    if (v !== this.currentValue) {
      this.currentValue = v;
    }
  }

  writeValue(value: any) {
    if (value !== null) {
      if (this.config.currency) {
        this.currentValue = this.parseValueToNumber(value);
        if (this.config.separator !== '.') {
          this.currentValue = this.parseValueToSeparator(this.currentValue);
        }
        this.currentValue += this.config.currency;
      } else {
        this.currentValue = value;
      }
    }
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private _setValue(v: string | number) {
    if (typeof this.config.currency === 'string') {
      v = this.parseValueToNumber(v);
      this.onChange(v);
      if (this.config.separator !== '.') {
        v = this.parseValueToSeparator(v);
      }
      v = v + this.config.currency;
      this.customChange.emit(v);
    } else {
      this.onChange(v);
    }
    this.writeValue(v);
    this.value = v;
  }

  ngAfterViewChecked() {
    if (this.input && this.editing) {
      this.input.nativeElement.focus();
      if (this.config.selectTextUponClick && this.firstEdit && this.preValue && this.input.nativeElement.value) {
        this.input.nativeElement.select();
        this.firstEdit = false;
      }
    }
    this.initialized = true;
  }

  startEditing() {
    if (!this.editing) {
      this.editing = true;
      this.currentValue = this.checkAndRemoveCurrency(this.currentValue);
      this.firstEdit = true;
    }
  }

  edit() {
    this.preValue = this.currentValue;
    this.editing = true;
  }

  onSubmit() {
    this.editing = false;
    if (this.currentValue !== this.preValue) {
      if (typeof this.config.handler === 'function') {
        this.isLoading = true;
        this.config.handler(this.currentValue, this.config.data).subscribe(
          data => {
            let hasChanged: boolean;
            this.isLoading = false;
            if (typeof data !== 'boolean') {
              this.currentValue = data.value;
              hasChanged = data.success;
            } else {
              hasChanged = data;
            }
            if (hasChanged) {
              this._setValue(this.currentValue);
            } else {
              this._setValue(this.preValue);
            }
          },
          () => {
            this.isLoading = false;
            this._setValue(this.preValue);
          }
        );
      } else {
        this._setValue(this.currentValue);
      }
    } else {
      if (typeof this.config.currency === 'string') {
        this.currentValue = this.currentValue + this.config.currency;
      }
    }
  }

  checkAndRemoveCurrency(value) {
    if (typeof this.config.currency === 'string') {
      return value.slice(0, -1);
    }

    return value;
  }

  parseValueToNumber(value) {
    if (!isNaN(value) && value !== '') {
      return parseFloat(value);
    }
    if (typeof this.config.currency === 'string') {
      const indexComma = value.indexOf(',');
      const indexDot = value.indexOf('.');
      if (indexComma > 0 && indexDot === -1) {
        const parsedValue = value.replace(',', '.');
        if (!isNaN(parsedValue)) {
          return parseFloat(parsedValue);
        }
      }
      if (indexDot > 0 && indexComma === -1) {
        if (!isNaN(value)) {
          return parseFloat(value);
        }
      }
      return 0;
    }
  }

  parseValueToSeparator(value) {
    if (typeof this.config.separator === 'string') {
      value = parseFloat(value).toFixed(2);
      return value.replace('.', this.config.separator);
    }

    return value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized) {
      this.currentValue = this.checkAndRemoveCurrency(this.currentValue) + this.config.currency;
      this.customChange.emit(this.value);
    }
  }
}

export interface NwbEditInPlaceConfig {
  /** Whether to select the whole text inside the input upon click */
  selectTextUponClick?: boolean;

  /** Data to pass as the second argument for the handler method if any **/
  data?: any;

  currency?: string;

  separator?: string;

  /**
   * handler method to call on change.
   * This allows you to perform any action before setting new value to the model
   * It has to return a boolean observable. If the returned value is true then the model will change.
   */
  handler?: (value: any, data: any) => Observable<boolean | ReturnedData>;
}

export interface ReturnedData {
  success: boolean;
  value: any;
}
