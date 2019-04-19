import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatePickerIntl } from './date-picker-intl';

declare const bulmaCalendar: any;

@Component({
  selector: 'nwb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class NwbDatePickerComponent implements AfterViewInit {
  private bulmaCalendar = null;
  @Input() options: NwbDatePickerOptions = new NwbDatePickerOptions();
  @Input() content: any;

  @Output() change = new EventEmitter<NwbDatePickerEvent>();
  private currentValueStart: Date = new Date();
  private currentValueEnd: Date = new Date();
  @ViewChild('ngWiziDatePicker') ngWiziDatePicker: ElementRef;

  @ViewChild('contentWrapper') contentWrapper: ElementRef;

  constructor(private datePickerIntl: DatePickerIntl) {}

  private _setValue(value: any) {
    if (typeof value.data.datePicker.date.start !== 'object') {
      return;
    }
    if (typeof value.data.datePicker.date.end !== 'undefined') {
      if (
        this.currentValueStart.getTime() !== value.data.datePicker.date.start.getTime() ||
        this.currentValueEnd.getTime() !== value.data.datePicker.date.end.getTime()
      ) {
        this.currentValueStart = value.data.datePicker.date.start;
        this.currentValueEnd = value.data.datePicker.date.end;
      }
    } else {
      if (this.currentValueStart.getTime() !== value.data.datePicker.date.start.getTime()) {
        this.currentValueStart = value.data.datePicker.date.start;
        this.currentValueStart = value.data.datePicker.date.start;
      }
    }
    this.change.emit({
      startDate: this.currentValueStart,
      endDate: this.currentValueEnd
    });
    return;
  }

  ngAfterViewInit() {
    this.content = this.contentWrapper.nativeElement;
    if (this.content.children.length > 1) {
      this.options.isRange = true;
    }
    if (this.content.firstChild.getAttribute('type') === 'time') {
      this.options.showFooter = true;
      this.options.showButtons = true;
      this.ngWiziDatePicker.nativeElement.type = 'text';
    }
    this.bulmaCalendar = new bulmaCalendar(this.ngWiziDatePicker.nativeElement, this.options);
    this.bulmaCalendar.on('select', data => {
      this._setValue(data);
    });
  }
}

export interface NwbDatePickerEvent {
  startDate: Date;
  endDate: Date;
}

export class NwbDatePickerOptions {
  startDate?: Date;
  endDate?: Date;
  minDate = null;
  maxDate = null;
  type = 'Date';
  color = 'primary';
  isRange = false;
  allowSameDayRange = true;
  lang = navigator.language.substring(0, 2) || 'en';
  dateFormat?: string;
  timeFormat = 'HH:mm';
  displayMode = 'default';
  showHeader = false;
  headerPosition = 'top';
  showFooter = false;
  showButtons = false;
  showTodayButton = false;
  showClearButton = false;
  cancelLabel?: string;
  clearLabel?: string;
  todayLabel?: string;
  nowLabel?: string;
  validateLabel?: string;
  enableMonthSwitch = true;
  enableYearSwitch = true;
  disabledWeekDays = false;
  minuteSteps = 5;
  labelFrom = '';
  labelTo = '';
  closeOnOverlayClick = true;
  closeOnSelect = true;
  toggleOnInputClick = true;
}
