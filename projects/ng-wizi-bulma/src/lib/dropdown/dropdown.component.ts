import { Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NwbOptionComponent } from './option.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'nwb-dropdown',
  templateUrl: './dropdown.component.html',
  host: {
    class: 'nwb-dropdown'
  },
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NwbDropdownComponent,
      multi: true
    }
  ]
})
export class NwbDropdownComponent implements ControlValueAccessor {
  @Input()
  isLoading: boolean;

  /** Any classes to add to the button element inside the dropdown */
  @Input()
  classes?: string;

  /** Set to true for align to right the dropdown */
  @Input()
  rightToLeft = false;

  /** Disable the dropdown */
  @Input()
  disabled?: boolean;

  @Input()
  config: NwbDropdownConfig = {};

  _options: QueryList<NwbOptionComponent>;

  isActive = false;

  currentText: any;

  private documentClickListenerRemover;
  private documentTouchstartListenerRemover;

  private _onChanged: Function;
  private _onTouched: Function;
  private currentValue: any;

  constructor(private _elementRef: ElementRef, private renderer: Renderer2) {}

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

  private documentClickOrTouch(ev: UIEvent) {
    if (!this._elementRef.nativeElement.contains(ev.target)) {
      // Outside host, close dropdown
      this.isActive = false;

      if (this.documentClickListenerRemover) {
        this.documentClickListenerRemover();
      }

      if (this.documentTouchstartListenerRemover) {
        this.documentTouchstartListenerRemover();
      }
    }
  }

  @ContentChildren(NwbOptionComponent)
  set options(val: QueryList<NwbOptionComponent>) {
    this._options = val;

    this._updateOptions();
  }

  private _updateOptions() {
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
        this.config.handler(option.value, this.config.data).subscribe(
          hasChanged => {
            this.isLoading = false;
            if (hasChanged) {
              this._setValue(option);
            }
          },
          () => {
            this.isLoading = false;
          }
        );
      } else {
        this._setValue(option);
      }
    }
  }

  toggleActive() {
    if (this.disabled === true || (this.isLoading && !this.isActive)) {
      return;
    }
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.documentClickListenerRemover = this.renderer.listen('document', 'click', ev => this.documentClickOrTouch(ev));
      this.documentTouchstartListenerRemover = this.renderer.listen('document', 'touchstart', ev => this.documentClickOrTouch(ev));
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
  handler?: (value: any, data: any) => Observable<boolean>;
}
