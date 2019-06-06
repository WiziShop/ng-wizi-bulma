import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';

@Component({
  providers: [],
  templateUrl: './date-picker-demo.html'
})
export class DatePickerDemo {
  myDateForm: FormGroup;

  constructor(private fb: FormBuilder, private nwbAlert: NwbAlertService) {
    this.myDateForm = this.fb.group({
      startDate: ['2018-03-20', Validators.required],
      endDate: ['2018-03-30', Validators.required]
    });
  }

  exampleBulmaCalendar = `"build": {
  "options": {
    ...
    "scripts": ["node_modules/bulma-extensions/bulma-calendar/dist/js/bulma-calendar.js"]
  },
...
}`;
  settingDefault = `export class DatePickerSettings {
  color = 'primary';
  allowSameDayRange = true;
  displayMode: 'default' | 'dialog' | 'inline' = 'default';
  showHeader = true;
  headerPosition: 'top' | 'bottom' = 'top';
  showFooter = true;
  showButtons = true;
  showTodayButton = true;
  showClearButton = true;
  enableMonthSwitch = true;
  enableYearSwitch = true;
  weekStart = 0;
  minuteSteps = 5;
  closeOnOverlayClick = true;
  closeOnSelect = true;
  toggleOnInputClick = true;
}`;
  settingClass = `export class MyDatePickerSettings {
  color = 'primary';
  allowSameDayRange = true;
  displayMode: 'default' | 'dialog' | 'inline' = 'default';
  showHeader = true;
  headerPosition: 'top' | 'bottom' = 'top';
  showFooter = false;
  showButtons = false;
  showTodayButton = false;
  showClearButton = false;
  enableMonthSwitch = false;
  enableYearSwitch = true;
  weekStart = 0;
  minuteSteps = 5;
  closeOnOverlayClick = true;
  closeOnSelect = true;
  toggleOnInputClick = true;
}

@NgModule({
  imports: [formControlName
    ...
  ],
  declarations: [
    ...
  ],
  providers: [
   {provide: DatePickerSettings, useClass: MyDatePickerSettings},
  ],
  ...
})
`;
  formatClass = `export class MyDatePickerFormat {
  lang: any;
  timeFormat = 'HH:mm';
  dateFormat = 'DD/MM/YYYY';
}

@NgModule({
  imports: [
    ...
  ],
  declarations: [
    ...
  ],
  providers: [
   {provide: DatePickerFormat, useClass: MyDatePickerFormat},
  ],
  ...
})
`;
  formatIntl = `export class DatePickerIntl {
  closeLabel = 'Close';
  clearLabel = 'Clear';
  todayLabel = 'Today';
  nowLabel = 'Now';
  labelFrom = '';
  labelTo = '';
}
  `;

  formatIntl2 = `export class MyDatePickerIntl {
  closeLabel = 'Fermer';
  clearLabel = 'Effacer';
  todayLabel = 'Aujourd\\'hui';
  nowLabel = 'Maintenant';
  labelFrom = '';
  labelTo = '';
}


@NgModule({
  imports: [
    ...
  ],
  declarations: [
    ...
  ],
  providers: [
    {provide: DatePickerIntl, useClass: MyDatePickerIntl},
  ],
  ...
})

`;

  formatDefault = `export class DatePickerFormat {
  /** The lang to use for all dates. */
  lang: string;

  dateFormat = 'MM/DD/YYYY';

  timeFormat = 'HH:mm';

  constructor(@Inject(NWB_DATE_LOCALE) locale: string) {
    this.lang = locale && locale.match('-') ? locale.split('-')[1].toLowerCase() : 'en';
  }
}
`;
  formatUse = `providers: [
    {provide: NWB_DATE_LOCALE, useValue: 'fr-FR'},
    ...
  ],
`;
  formatComp = `<nwb-date-picker \n   (change)="valueChange($event)"\n   [options]="{'dateFormat':'MM/DD/YYYY','lang':'fr'}">
   <input type="date">
</nwb-date-picker>`;

  settingComp = `<nwb-date-picker \n   (change)="valueChange($event)"\n   [options]="{'showFooter':false,'displayMode':'dialog'}">
   <input type="date">
</nwb-date-picker>`;

  sample1 = `<nwb-date-picker #datePicker1 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker1" type="date"/>
</nwb-date-picker>`;

  sample2 = `<nwb-date-picker #datePicker2 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker2" type="datetime-local"/>
</nwb-date-picker>`;

  sample3 = `<nwb-date-picker #datePicker3 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker3" type="date"/>
  <input [nwbDatepickerEnd]="datePicker3" type="date"/>
</nwb-date-picker>`;

  sample4 = `<nwb-date-picker #datePicker4 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker4" type="datetime-local"/>
  <input [nwbDatepickerEnd]="datePicker4" type="datetime-local"/>
</nwb-date-picker>`;

  sample5 = `<form [formGroup]="myDateForm" (ngSubmit)="submitForm()">
  <nwb-date-picker #datePicker5>
    <input type="date" [nwbDatepickerStart]="datePicker5" name="startDate"
           formControlName="startDate"/>
    <input type="date" [nwbDatepickerEnd]="datePicker5" name="endDate" formControlName="endDate"/>
  </nwb-date-picker>
  <p>
    <button type="submit" class="button is-primary">Submit</button>
  </p>
</form>`;

  sample6 = `<nwb-date-picker #datePicker6 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker6" type="time"/>
</nwb-date-picker>`;

  valueChange(value: any) {
    console.log('value change from nwbDatePicker', { value });
  }

  submitForm() {
    console.log('value', this.myDateForm.getRawValue());
    this.nwbAlert.open({
      message: 'Selected Date = ' + this.myDateForm.value.startDate + ' - ' + this.myDateForm.value.endDate,
      duration: 3000
    });
  }

  changeStartDate(s: string) {
    this.myDateForm.patchValue({
      startDate: s
    });
  }

  changeEndDate(s: string) {
    this.myDateForm.patchValue({
      endDate: s
    });
  }
}
