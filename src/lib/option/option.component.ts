import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';


/**
 * @name Option
 * @description
 * `nwb-option` is a child component of `nwb-dropdown`. Similar to the native option element, `nwb-option` can take a value and a selected property.
 *
 */
@Directive({
  selector: 'nwb-option'
})
export class NwbOptionComponent {

  _selected: boolean = false;
  _disabled: boolean = false;
  _value: any;

  /**
   * @input {boolean} If true, the user cannot interact with this element.
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(val: boolean) {
    this._disabled = val;
  }

  /**
   * @input {boolean} If true, the element is selected.
   */
  @Input()
  get selected(): boolean {
    return this._selected;
  }

  set selected(val: boolean) {
    this._selected = val;
  }

  /**
   * @input {any} The value of the option.
   */
  @Input()
  get value() {
    if (this._value !== undefined && this._value !== null) {
      return this._value;
    }
    return this.text;
  }

  set value(val: any) {
    this._value = val;
  }

  /**
   * @output {any} Event to evaluate when option is selected.
   */
  @Output() nwbSelect: EventEmitter<any> = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
  }

  /**
   * @hidden
   */
  get text() {
    return this._elementRef.nativeElement.innerHTML;
  }
}
