import {Component, ContentChildren, ElementRef, HostListener, Input, QueryList} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NwbOptionComponent} from '../option/option.component';

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

  selectOption(option: NwbOptionComponent) {
    if (!option.disabled && this.currentValue !== option.value) {
      option.nwbSelect.emit(option.value);
      this.currentValue = option.value;
      this._onChanged(this.currentValue);
      this._updateOptions();
    }
  }
}
