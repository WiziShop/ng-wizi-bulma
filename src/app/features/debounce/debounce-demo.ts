import { Component } from '@angular/core';

@Component({
  providers: [],
  templateUrl: './debounce-demo.html'
})
export class DebounceDemo {
  inputValue = 'Default Value';

  valueFromNwbDebounceChangeEvent = '';

  constructor() {}

  valueChange(value: any) {
    console.log('Value change from nwbDebounceChange event', value);
    this.valueFromNwbDebounceChangeEvent = value;
  }

  setRandomValue() {
    this.inputValue += Math.random().toString();
  }
}
