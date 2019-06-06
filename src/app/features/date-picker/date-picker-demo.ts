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
  sample1 = `<nwb-date-picker \n   (change)="valueChange($event)">
   <input type="date">
</nwb-date-picker>`;
  sample2 = `<nwb-date-picker \n   (change)="valueChange($event)">
   <input type="text">
</nwb-date-picker>`;
  sample3 = `<nwb-date-picker \n   (change)="valueChange($event)">
   <input type="date">
   <input type="date">
</nwb-date-picker>`;
  sample4 = `<nwb-date-picker \n   (change)="valueChange($event)">
   <input type="text">
   <input type="text">
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
