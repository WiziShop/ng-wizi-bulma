import {Component} from '@angular/core';

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

  sample3Value = true;

  model3Change(value) {
    console.log('model3Change', value);
  }


}

