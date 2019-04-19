import { Component } from '@angular/core';

@Component({
  providers: [],
  templateUrl: './date-picker-demo.html'
})
export class DatePickerDemo {
  constructor() {}

  sample1 = `<nwb-date-picker (change)="valueChange($event)" [options]="{'lang':'uk','format':'MM/DD/YYYY'}">
<input type="date">
</nwb-date-picker>`;
  sample2 = `<nwb-date-picker (change)="valueChange($event)" [options]="{'lang':'uk','format':'MM/DD/YYYY'}">
<input type="time">
</nwb-date-picker>`;
  sample3 = `<nwb-date-picker (change)="valueChange($event)" [options]="{'lang':'uk','format':'MM/DD/YYYY',
'labelFrom':'From start','labelTo':'To end'}">
<input type="date">
<input type="date">
</nwb-date-picker>`;
  sample4 = `<nwb-date-picker (change)="valueChange($event)" [options]="{'lang':'uk','format':'MM/DD/YYYY',
'labelFrom':'From start','labelTo':'To end'}">
<input type="time">
<input type="time">
</nwb-date-picker>`;
  sample5 = `
<nwb-date-picker (change)="valueChange($event)" [options]="{'displayMode':'inline'}">
<input type="date">
</nwb-date-picker>
<nwb-date-picker (change)="valueChange($event)" [options]="{'displayMode':'dialog'}">
<input type="date">
</nwb-date-picker>`;

  valueChange(value: any) {
    console.log('value change from nwbDatePicker', { value });
  }
}
