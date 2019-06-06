import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { DatePickerIntl } from './date-picker-intl';
import { DatePickerFormat } from './date-picker-format';
import { DatePickerSettings } from './date-picker-settings';
import { NwbDatePickerInputBaseDirective } from './date-picker-input-base.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const bulmaCalendar: any;

@Component({
  selector: 'nwb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NwbDatePickerComponent implements AfterViewInit, OnDestroy {
  @Input() options: NwbDatePickerOptions = {};

  @Output() change = new EventEmitter<NwbDatePickerEvent>();

  private bulmaCalendar = null;

  private datepickerInputStart: NwbDatePickerInputBaseDirective = null;
  private datepickerInputEnd: NwbDatePickerInputBaseDirective = null;

  private currentValueStart: Date = new Date();
  private currentValueEnd: Date = new Date();

  private destroy = new Subject();

  private initalized = false;

  private finalOptions: NwbDatePickerOptions;

  @ViewChild('ngWiziDatePicker') ngWiziDatePicker: ElementRef;

  constructor(
    private datePickerIntl: DatePickerIntl,
    private datePickerFormat: DatePickerFormat,
    private datePrickerSettings: DatePickerSettings,
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  /**
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   * @param inputType
   */
  _registerInput(input: NwbDatePickerInputBaseDirective, inputType: 'startDate' | 'endDate'): void {
    let datepickerInput = null;
    switch (inputType) {
      case 'startDate':
        if (this.datepickerInputStart) {
          throw Error('A NwbDatePickerComponent can only be associated with a single input of type: ' + inputType);
        }
        this.datepickerInputStart = input;
        datepickerInput = this.datepickerInputStart;

        break;

      case 'endDate':
        if (this.datepickerInputEnd) {
          throw Error('A NwbDatePickerComponent can only be associated with a single input of type: ' + inputType);
        }

        this.datepickerInputEnd = input;
        datepickerInput = this.datepickerInputEnd;
        break;
      default:
        throw Error('Invalid inputType:' + inputType);
    }

    datepickerInput._valueChange.pipe(takeUntil(this.destroy)).subscribe(value => {
      if (!this.initalized) {
        return;
      }

      // TODO handle change

      this.resetCalendar();
    });
  }

  /**
   * Since there is no way to change date dynamically, we're gonna destroy the calender and reinitialize it
   */
  private resetCalendar() {
    if (this.bulmaCalendar) {
      this.bulmaCalendar = null;

      const calendarWrapperEl = this.elementRef.nativeElement.querySelector('.datetimepicker-dummy') as HTMLDivElement;
      if (calendarWrapperEl) {
        this.ngWiziDatePicker.nativeElement.setAttribute('type', 'date');

        const rootCalendarNode = calendarWrapperEl.parentElement;
        this.elementRef.nativeElement.insertBefore(this.ngWiziDatePicker.nativeElement, rootCalendarNode);

        rootCalendarNode.remove();

        this.initalized = false;

        this.initialize();
      }
    } else {
      this.initialize();
    }
  }

  private setValue(startDate: Date, endDate?: Date) {
    let somethingHasChanged = false;

    if (this.currentValueStart.getTime() !== startDate.getTime()) {
      this.currentValueStart = new Date(startDate.toISOString()); // clone it
      somethingHasChanged = true;
    }

    if (endDate && this.currentValueEnd.getTime() !== endDate.getTime()) {
      this.currentValueEnd = new Date(endDate.toISOString()); // clone it
      somethingHasChanged = true;
    }

    if (!somethingHasChanged) {
      return;
    }

    this.change.emit({
      startDate: this.currentValueStart,
      endDate: this.finalOptions.isRange ? this.currentValueEnd : this.currentValueStart
    });
  }

  private initialize() {
    if (this.initalized) {
      console.log('Already initialized');
      return;
    }
    this.initalized = true;

    if (this.datepickerInputStart) {
      this.options.startDate = this.datepickerInputStart.value ? new Date(this.datepickerInputStart.value) : null;
    }
    if (this.datepickerInputEnd) {
      this.options.isRange = true;
      this.options.endDate = this.datepickerInputEnd.value ? new Date(this.datepickerInputEnd.value) : null;

      if (this.options.endDate < this.options.startDate) {
        throw Error('The end date cannot be before the start date');
      }
    } else {
      this.options.isRange = false;
    }

    const elementType = this.datepickerInputStart.elementRef.nativeElement.getAttribute('type');

    switch (elementType) {
      case 'datetime-local':
        this.options.type = 'datetime';
        this.options.showFooter = true;
        this.options.showButtons = true;
        this.ngWiziDatePicker.nativeElement.type = 'text';
        break;
      case 'date':
        this.options.type = 'date';
        break;
      case 'time':
        this.options.type = 'time';
        this.options.showFooter = true;
        this.options.showButtons = true;
        this.ngWiziDatePicker.nativeElement.type = 'text';
        break;
    }

    this.finalOptions = Object.assign(this.datePickerFormat, this.datePickerIntl, this.datePrickerSettings, this.options);

    this.bulmaCalendar = new bulmaCalendar(this.ngWiziDatePicker.nativeElement, this.finalOptions);

    this.bulmaCalendar.on('select', data => {
      this.ngZone.run(() => {
        const datePicker = data.data.datePicker;
        const timePicker = data.data.timePicker;

        let startDate: Date;
        let endDate: Date;

        switch (elementType) {
          case 'date':
          case 'datetime-local':
            startDate = datePicker.start;
            if (timePicker) {
              startDate.setHours(timePicker.start.getHours());
              startDate.setMinutes(timePicker.start.getMinutes());
            }

            if (this.finalOptions.isRange) {
              endDate = datePicker.end;
              if (timePicker) {
                endDate.setHours(timePicker.end.getHours());
                endDate.setMinutes(timePicker.end.getMinutes());
              }
            }
            break;
          case 'time':
            startDate = new Date();
            startDate.setSeconds(0);
            startDate.setMilliseconds(0);
            startDate.setHours(timePicker.start.getHours());
            startDate.setMinutes(timePicker.start.getMinutes());

            if (this.finalOptions.isRange) {
              endDate = new Date();
              endDate.setSeconds(0);
              endDate.setMilliseconds(0);
              endDate.setHours(timePicker.end.getHours());
              endDate.setMinutes(timePicker.end.getMinutes());
            }
            break;
        }
        console.log('startDate', startDate);

        this.setValue(startDate, endDate);
      });
    });
  }

  ngAfterViewInit() {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
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
