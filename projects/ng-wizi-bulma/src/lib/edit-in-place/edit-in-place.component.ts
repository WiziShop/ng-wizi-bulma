import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'nwb-edit-in-place',
  templateUrl: './edit-in-place.component.html',
  styleUrls: ['./edit-in-place.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NwbEditInPlaceComponent,
      multi: true
    }
  ]
})
export class NwbEditInPlaceComponent implements ControlValueAccessor {
  @Input()
  config: NwbEditInPlaceConfig = {};

  public currentValue = '';
  private preValue = '';

  public inputWidth: number;
  public editing = false;
  public isLoading;

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
    this.currentValue = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private _setValue(v: string) {
    this.onChange(v);
    this.writeValue(v);
    this.value = v;
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
    }
  }
}

export interface NwbEditInPlaceConfig {
  /** TODO Options to pass to populate a Dropdown **/
  // _options?: QueryList<NwbOptionComponent>;

  /** Data to pass as the second argument for the handler method if any **/
  data?: any;

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
