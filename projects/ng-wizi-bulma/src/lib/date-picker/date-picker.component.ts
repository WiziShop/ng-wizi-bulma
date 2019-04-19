import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatePickerIntl } from './date-picker-intl';
import { DatePickerFormat } from './date-picker-format';
import { DatePickerSettings } from './date-picker-settings';

declare const bulmaCalendar: any;

@Component({
  selector: 'nwb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class NwbDatePickerComponent implements AfterViewInit {
  @Input() options: NwbDatePickerOptions = {};

  @Output() change = new EventEmitter<NwbDatePickerEvent>();

  private bulmaCalendar = null;
  private currentValueStart: Date = new Date();
  private currentValueEnd: Date = new Date();

  @ViewChild('ngWiziDatePicker') ngWiziDatePicker: ElementRef;

  @ViewChild('contentWrapper') contentWrapper: ElementRef;

  constructor(
    private datePickerIntl: DatePickerIntl,
    private datePickerFormat: DatePickerFormat,
    private datePrickerSettings: DatePickerSettings
  ) {
    console.log('lang', this.datePickerFormat.lang);
  }

  private setValue(value: any) {
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
    const content = this.contentWrapper.nativeElement;
    if (content.children.length > 1) {
      this.options.isRange = true;
    }
    if (content.firstChild.getAttribute('type') === 'time') {
      this.options.showFooter = true;
      this.options.showButtons = true;
      this.ngWiziDatePicker.nativeElement.type = 'text';
    }

    const options = Object.assign({}, this.datePickerFormat, this.datePickerIntl, this.datePrickerSettings, this.options);
    console.log(options);
    this.bulmaCalendar = new bulmaCalendar(this.ngWiziDatePicker.nativeElement, options);
    this.bulmaCalendar.on('select', data => {
      this.setValue(data);
    });
  }
}

export interface NwbDatePickerEvent {
  startDate: Date;
  endDate: Date;
}

export interface NwbDatePickerOptions {
  type?: 'date' | 'time' | 'datetime';
  color?: string;
  isRange?: boolean;
  allowSameDayRange?: boolean;
  lang?: string;
  dateFormat?: string;
  timeFormat?: string;
  displayMode?: string;
  position?: string;
  showHeader?: boolean;
  headerPosition?: 'top' | 'bottom';
  showFooter?: boolean;
  showButtons?: boolean;
  showTodayButton?: boolean;
  showClearButton?: boolean;
  cancelLabel?: string;
  clearLabel?: string;
  todayLabel?: string;
  nowLabel?: string;
  validateLabel?: string;
  enableMonthSwitch?: boolean;
  enableYearSwitch?: boolean;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledWeekDays?: number[];
  weekStart?: number;
  startTime?: Date;
  endTime?: Date;
  minuteSteps?: number;
  labelFrom?: string;
  labelTo?: string;
  closeOnOverlayClick?: boolean;
  closeOnSelect?: boolean;
  toggleOnInputClick?: boolean;
}
