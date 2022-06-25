import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NwbAlertService, NwbDatePickerOptions } from 'projects/ng-wizi-bulma/src/public_api';

@Component({
  providers: [],
  templateUrl: './date-picker-demo.html',
})
export class DatePickerDemo {
  myDateForm: UntypedFormGroup;

  options: NwbDatePickerOptions = {
    color: 'danger',
    allowSameDayRange: false,
    displayMode: 'inline',
    showHeader: false,
    headerPosition: 'bottom',
    showFooter: true,
    showButtons: true,
    showTodayButton: true,
    showClearButton: true,
    enableMonthSwitch: false,
    enableYearSwitch: false,
    minDate: new Date('2018-01-20T00:00:00.000Z'),
    maxDate: new Date('2018-01-28T00:00:00.000Z'),
    disabledDates: [new Date('2018-01-22T00:00:00.000Z')],
    disabledWeekDays: [6],
    weekStart: 0,
    minuteSteps: 1,
    closeOnOverlayClick: false,
    closeOnSelect: true,
    toggleOnInputClick: true,
  };

  constructor(private fb: UntypedFormBuilder, private nwbAlert: NwbAlertService) {
    this.myDateForm = this.fb.group({
      startDate: ['2018-03-20T00:00:00.000Z', Validators.required],
      endDate: ['2018-06-30T00:00:00.000Z', Validators.required],
    });
  }

  exampleBulmaCalendar = `"build": {
  "options": {
    ...
    "scripts": ["node_modules/bulma-extensions/bulma-calendar/dist/js/bulma-calendar.js"]
  },
...
}`;
  settingDefault = `export class NwbDatePickerDefaultSettings implements NwbDatePickerDefaultSettings {
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
  minuteSteps = 1;
  closeOnOverlayClick = true;
  closeOnSelect = true;
  toggleOnInputClick = true;
}`;
  settingClass = `export class MyDatePickerSettings implements NwbDatePickerDefaultSettings {
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
  minuteSteps = 1;
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
   {provide: NwbDatePickerDefaultSettings, useClass: MyDatePickerSettings},
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
   {provide: NwbDatePickerFormat, useClass: MyDatePickerFormat},
  ],
  ...
})
`;
  formatIntl = `export class NwbDatePickerIntl {
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
    {provide: NwbDatePickerIntl, useClass: MyDatePickerIntl},
  ],
  ...
})

`;

  formatDefault = `export class NwbDatePickerFormat {
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
   <input type="text" nwbDateType="date">
</nwb-date-picker>`;

  settingComp = `<nwb-date-picker \n   (change)="valueChange($event)"\n   [options]="{'showFooter':false,'displayMode':'dialog'}">
   <input type="text" nwbDateType="date">
</nwb-date-picker>`;

  sample1 = `<nwb-date-picker #datePicker1 (change)="valueChange($event)" [options]="{showClearButton: false}">
  <input [nwbDatepickerStart]="datePicker1" type="text" nwbDateType="date"/>
</nwb-date-picker>`;

  sample2 = `<nwb-date-picker #datePicker2 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker2" type="text" nwbDateType="datetime"/>
</nwb-date-picker>`;

  sample3 = `<nwb-date-picker #datePicker3 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker3" type="text" nwbDateType="date"/>
  <input [nwbDatepickerEnd]="datePicker3" type="text" nwbDateType="date"/>
</nwb-date-picker>`;

  sample4 = `<nwb-date-picker #datePicker4 (change)="valueChange($event)">
  <input [nwbDatepickerStart]="datePicker4" type="text" nwbDateType="datetime"/>
  <input [nwbDatepickerEnd]="datePicker4" type="text" nwbDateType="datetime"/>
</nwb-date-picker>`;

  sample5 = `<form [formGroup]="myDateForm" (ngSubmit)="submitForm()">
  <nwb-date-picker #datePicker5>
    <input type="text" nwbDateType="date" [nwbDatepickerStart]="datePicker5" name="startDate"
           formControlName="startDate"/>
    <input type="text" nwbDateType="date" [nwbDatepickerEnd]="datePicker5" name="endDate" formControlName="endDate"/>
  </nwb-date-picker>
  <p>
    <button type="submit" class="button is-primary">Submit</button>
  </p>
</form>`;

  sample6 = `<nwb-doc-preview [revertSize]="true" [content]="sample6">
  <p>DatePicker simple</p>
  <nwb-date-picker #datePicker6 (change)="valueChange($event)" [options]="options" >
    <input [nwbDatepickerStart]="datePicker6" type="text" nwbDateType="date"  />
  </nwb-date-picker>
</nwb-doc-preview>

With options:

options: NwbDatePickerOptions = {
  color: 'danger',
  allowSameDayRange: false,
  displayMode: 'inline',
  showHeader: false,
  headerPosition: 'bottom',
  showFooter: false,
  showButtons: false,
  showTodayButton: false,
  showClearButton: false,
  enableMonthSwitch: false,
  enableYearSwitch: false,
  minDate: new Date('2018-01-20T00:00:00.000Z'),
  maxDate: new Date('2018-01-28T00:00:00.000Z'),
  disabledDates: [new Date('2018-01-22T00:00:00.000Z')],
  disabledWeekDays: [6],
  weekStart: 0,
  minuteSteps: 1,
  closeOnOverlayClick: false,
  closeOnSelect: true,
  toggleOnInputClick: true
};
`;

  sample7 = `
<nwb-date-picker
    (change)="valueChange($event)"
    [options]="{'dateFormat':'DD/MM/YYYY','lang':'fr'}"
>
   <input type="text" [nwbDateType]="'date'" value="2019-12-02T00:00:00.000Z">
</nwb-date-picker>
`;

  valueChange(value: any) {
    console.log('value change from nwbDatePicker', { value }, value.startDate.toISOString(), value.endDate.toISOString());
  }

  submitForm() {
    console.log('value', this.myDateForm.getRawValue());
    this.nwbAlert.open({
      message: 'Selected Date = ' + this.myDateForm.value.startDate + ' - ' + this.myDateForm.value.endDate,
      duration: 3000,
    });
  }

  changeStartDate(s: string) {
    this.myDateForm.patchValue({
      startDate: s,
    });
  }

  changeEndDate(s: string) {
    this.myDateForm.patchValue({
      endDate: s,
    });
  }

  onClear() {
    console.log('Date picker clear');
  }
}
