import {Component, ContentChildren, ElementRef, HostListener, Input, QueryList} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NwbOptionComponent} from '../option/option.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'nwb-dropdown',
  templateUrl: './dropdown.component.html',
  styles: [`
    a.is-disabled {
      pointer-events: none;
      background-color: whitesmoke;
      color: #7a7a7a;
    }
  `],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: NwbDropdownComponent, multi: true}],
})
export class NwbDropdownComponent implements ControlValueAccessor {

  @Input() isLoading: boolean;

  @Input() config: NwbDropdownConfig = {};

  _onChanged: Function;
  _onTouched: Function;
  _options: QueryList<NwbOptionComponent>;

  isActive = false;

  currentValue: any;
  currentText: any;

  writeValue(obj: any): void {
    this.currentValue = obj;

    this._updateOptions();
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }


  constructor(private _elementRef: ElementRef) {
  }


  @HostListener('document:click', ['$event'])
  _click(ev: UIEvent) {
    if (!this._elementRef.nativeElement.contains(event.target)) { // Outside host, close dropdown
      this.isActive = false;
    }

  }

  /**
   * @private
   */
  @ContentChildren(NwbOptionComponent)
  set options(val: QueryList<NwbOptionComponent>) {
    this._options = val;

    this._updateOptions();
  }

  /**
   * @hidden
   */
  _updateOptions() {

    if (this._options) {
      this._options.forEach(option => {
        option.selected = option.value === this.currentValue;
        if (option.selected) {
          this.currentText = option.text;
        }
      });
    }

  }

  private _setValue(option: NwbOptionComponent) {
    if (!option.disabled && this.currentValue !== option.value) {

      option.nwbSelect.emit(option.value);
      this.currentValue = option.value;
      this._onChanged(this.currentValue);
      this._updateOptions();
    }
  }

  selectOption(option: NwbOptionComponent) {
    if (!option.disabled && this.currentValue !== option.value) {
      if (typeof this.config.handler === 'function') {
        this.isLoading = true;
        this.config.handler(option.value, this.config.data)
          .subscribe((hasChanged) => {
            this.isLoading = false;
            if (hasChanged) {
              this._setValue(option);
            }

          }, () => {
            this.isLoading = false;
          });
      } else {
        this._setValue(option);
      }
    }
  }
}


export interface NwbDropdownConfig {
  /** Data to pass as the second argument for the handler method if any **/
  data?: any;

  /**
   * handler method to call on change.
   * This allows you to perform any action before setting new value to the model
   * It has to return a boolean observable. If the returned value is true then the model will change.
   */
  handler?: (value: any, data: any) => Observable<boolean> ;

  /** Any classes to add to the button element inside the dropdown */
  classes?: string;

  /** Disable the dropdown */
  disabled?: boolean;
}
