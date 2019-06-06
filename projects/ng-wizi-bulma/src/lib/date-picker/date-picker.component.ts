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
import { fromEvent, Subject } from 'rxjs';
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

  private isRange = false;

  @ViewChild('ngWiziDatePicker', { static: true }) ngWiziDatePicker: ElementRef;

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
      endDate: this.isRange ? this.currentValueEnd : this.currentValueStart
    });
  }

  /**
   * Ugly hack to make timepicker change without having to press validate button since the behavior between the timepicker and datepicker differs
   */
  private _initEvents() {
    const elements = [];

    const timepickerStartEl = this.elementRef.nativeElement.querySelector('.timepicker-start');
    if (timepickerStartEl) {
      elements.push(timepickerStartEl.querySelector('.timepicker-hours .timepicker-next'));
      elements.push(timepickerStartEl.querySelector('.timepicker-hours .timepicker-previous'));
      elements.push(timepickerStartEl.querySelector('.timepicker-minutes .timepicker-next'));
      elements.push(timepickerStartEl.querySelector('.timepicker-minutes .timepicker-previous'));
    }

    const timepickerEndEl = this.elementRef.nativeElement.querySelector('.timepicker-end');
    if (timepickerEndEl) {
      elements.push(timepickerEndEl.querySelector('.timepicker-hours .timepicker-next'));
      elements.push(timepickerEndEl.querySelector('.timepicker-hours .timepicker-previous'));
      elements.push(timepickerEndEl.querySelector('.timepicker-minutes .timepicker-next'));
      elements.push(timepickerEndEl.querySelector('.timepicker-minutes .timepicker-previous'));
    }

    elements.forEach(element => {
      fromEvent(element, 'click')
        .pipe(takeUntil(this.destroy))
        .subscribe(() => {
          this.bulmaCalendar.save();
          this.bulmaCalendar.emit('select', this.bulmaCalendar);
          setTimeout(() => {
            this.bulmaCalendar.refresh();
          }, 100);
        });
    });
  }

  private initialize() {
    if (this.initalized) {
      console.log('Already initialized');
      return;
    }
    this.initalized = true;

    this.options.isRange = false;
    this.options.startDate = null;
    this.options.endDate = null;

    if (this.datepickerInputStart) {
      this.options.startDate = this.datepickerInputStart.value ? new Date(this.datepickerInputStart.value) : null;
    }

    if (this.datepickerInputEnd) {
      this.options.isRange = true;

      this.options.endDate = this.datepickerInputEnd.value ? new Date(this.datepickerInputEnd.value) : null;

      if (this.options.endDate < this.options.startDate) {
        throw Error('The end date cannot be before the start date');
      }
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
        this.ngWiziDatePicker.nativeElement.type = 'date';
        break;
      case 'time':
        this.options.type = 'time';
        this.options.showFooter = true;
        this.options.showButtons = true;
        this.ngWiziDatePicker.nativeElement.type = 'text';
        break;
    }

    const options = Object.assign(this.datePickerFormat, this.datePickerIntl, this.datePrickerSettings, this.options);

    if (!options.closeLabel) {
      // Change cancel to close
      options.closeLabel = '';
    }

    options['cancelLabel'] = options.closeLabel;

    this.isRange = options.isRange;

    this.bulmaCalendar = new bulmaCalendar(this.ngWiziDatePicker.nativeElement, options);

    // Ready events doesn't work
    setTimeout(() => {
      this._initEvents();
    }, 500);

    this.bulmaCalendar.on('select', data => {
      this.ngZone.run(() => {
        const datePicker = data.data.datePicker;
        const timePicker = data.data.timePicker;

        let startDate: Date;
        let endDate: Date;

        switch (elementType) {
          case 'date':
          case 'datetime-local':
            if (!datePicker.start) {
              return;
            }
            startDate = new Date(datePicker.start.toISOString());
            if (timePicker) {
              startDate.setHours(timePicker.start.getHours());
              startDate.setMinutes(timePicker.start.getMinutes());
            }

            if (this.isRange) {
              if (!datePicker.end) {
                return;
              }
              endDate = new Date(datePicker.end.toISOString());
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

            if (this.isRange) {
              endDate = new Date();
              endDate.setSeconds(0);
              endDate.setMilliseconds(0);
              endDate.setHours(timePicker.end.getHours());
              endDate.setMinutes(timePicker.end.getMinutes());
            }
            break;
        }

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
  clearLabel?: string;
  todayLabel?: string;
  nowLabel?: string;
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
  closeLabel?: string;
}
