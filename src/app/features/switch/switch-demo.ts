import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  providers: [],
  templateUrl: './switch-demo.html',
})
export class SwitchDemo {
  sample1Value = true;

  sample1 = `<nwb-switch
  [(ngModel)]="sample1Value"
  extraClasses="is-danger is-small"
  >
Switch example
</nwb-switch>`;

  sample2 = `<nwb-switch
[checked]="true"
extraClasses="is-succes is-rtl"
>
Switch example
</nwb-switch>`;

  sample3 = `<div nwbToolTip="My tooltip" nwbToolTipPosition="bottom" style="display: inline-block">
          <nwb-switch
            [checked]="true"
            extraClasses="is-info is-big"
          >
          </nwb-switch>
        </div>`;

  sample4 = `
  myForm = this.fb.group({
    mySwitch: [
      {
        value: true,
        disabled: true,
      },
    ],


<form [formGroup]="myForm">
  <p>Switch with Reactive Form</p>
  <nwb-switch formControlName="mySwitch" extraClasses="is-info is-big"></nwb-switch>
</form>

  `;
  myForm = this.fb.group({
    mySwitch: [
      {
        value: true,
        disabled: true,
      },
    ],
  });

  constructor(private fb: FormBuilder) {}

  model1Change(value) {
    console.log('model3Change', value);
  }
}
