import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'nwb-switch',
  templateUrl: './switch.component.html',
  host: {
    'class': 'nwb-switch',
  },
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: NwbSwitchComponent, multi: true}],
})
export class NwbSwitchComponent implements ControlValueAccessor {
  @Input() extraClasses: '';
  @Input() disabled = false;
  @Input() checked = true;


  private _onChanged: Function;
  private _onTouched: Function;
  private currentValue: any;

  private _id = null;

  writeValue(obj: any): void {
    this._setValue(obj);
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  change() {
    this._setValue(this.checked);
  }

  private _setValue(value: boolean) {
    this.currentValue = value;

    this.checked = this.currentValue === true;
    if (typeof  this._onChanged === 'function') {
      this._onChanged(this.currentValue);
    }
  }

  getId() {
    if (!this._id) {
      this._id = 'search-' + Math.random().toString().replace('.', '-');
    }
    return this._id;
  }

}
