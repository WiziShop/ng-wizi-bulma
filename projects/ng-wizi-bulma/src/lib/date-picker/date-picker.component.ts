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
  ViewChild,
} from '@angular/core';
import { NwbDatePickerIntl } from './date-picker-intl';
import { NwbDatePickerFormat } from './date-picker-format';
import { NwbDatePickerDefaultSettings, NwbDatePickerSettings } from './date-picker-default-settings';
import { NwbDatePickerInputBaseDirective } from './date-picker-input-base.directive';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const bulmaCalendar: any;

@Component({
  selector: 'nwb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NwbDatePickerComponent implements AfterViewInit, OnDestroy {
  @Input() options: NwbDatePickerOptions = {};

  @Output() change = new EventEmitter<NwbDatePickerEvent>();

  private bulmaCalendar = null;

  private datepickerInputStart: NwbDatePickerInputBaseDirective = null;
  private datepickerInputEnd: NwbDatePickerInputBaseDirective = null;

  private destroy = new Subject();

  private initalized = false;

  private isRange = false;

  @ViewChild('ngWiziDatePicker', { static: true }) ngWiziDatePicker: ElementRef;

  constructor(
    private datePickerIntl: NwbDatePickerIntl,
    private datePickerFormat: NwbDatePickerFormat,
    private datePrickerSettings: NwbDatePickerDefaultSettings,
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  /**
   * Register an input with this datepicker.
   *  input The datepicker input to register with this datepicker.
   *  inputType
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

    datepickerInput._valueChange.pipe(takeUntil(this.destroy)).subscribe(() => {
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
        this.ngWiziDatePicker.nativeElement.setAttribute('type', 'text');

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

    if (this.datepickerInputStart.getDate().getTime() !== startDate.getTime()) {
      somethingHasChanged = true;
    }

    if (endDate && this.datepickerInputEnd.getDate().getTime() !== endDate.getTime()) {
      somethingHasChanged = true;
    }

    if (!somethingHasChanged) {
      return;
    }

    this.change.emit({
      startDate: new Date(startDate.toISOString()),
      endDate: this.isRange ? new Date(endDate.toISOString()) : new Date(startDate.toISOString()),
    });
  }

  /**
   * Ugly hack to make timepicker change without having to press validate button since
   * the behavior between the timepicker and datepicker differs
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

    elements.forEach((element) => {
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

  private getDateAndTimePart(input: NwbDatePickerInputBaseDirective) {
    const date = input.getDate();
    const time = input.getDate();

    date.setHours(0, 0, 0, 0);

    return { date, time };
  }

  private initialize() {
    if (this.initalized) {
      console.log('Already initialized');
      return;
    }
    this.initalized = true;

    const privateOptions: NwbPrivateDatePickerOptions = {
      type: 'date',
      isRange: false,
      startDate: null,
      start: null,
      endDate: null,
      end: null,
    };

    if (this.datepickerInputStart && this.datepickerInputStart.value) {
      const _start = this.getDateAndTimePart(this.datepickerInputStart);
      privateOptions.startDate = _start.date;
      privateOptions.start = _start.time;
    }

    if (this.datepickerInputEnd) {
      privateOptions.isRange = true;

      if (this.datepickerInputEnd.value) {
        const _end = this.getDateAndTimePart(this.datepickerInputEnd);
        privateOptions.endDate = _end.date;
        privateOptions.end = _end.time;
      }

      if (privateOptions.endDate < privateOptions.startDate) {
        console.log('Error the end date cannot be before the start date');
      }
    }

    const elementType = this.datepickerInputStart.dateType;

    switch (elementType) {
      case 'datetime':
        privateOptions.type = 'datetime';
        this.options.showFooter = true;
        this.options.showButtons = true;
        this.ngWiziDatePicker.nativeElement.type = 'text';
        break;
      case 'date':
        privateOptions.type = 'date';
        this.ngWiziDatePicker.nativeElement.type = 'date';
        break;
    }

    const options = Object.assign(privateOptions, this.datePickerFormat, this.datePickerIntl, this.datePrickerSettings, this.options);

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
      this.bulmaCalendar.refresh();
    }, 500);

    this.bulmaCalendar.on('select', (data) => {
      this.ngZone.run(() => {
        const datePicker = data.data.datePicker;
        const timePicker = data.data.timePicker;

        let startDate: Date;
        let endDate: Date;

        if (!datePicker.start) {
          return;
        }
        // Clone the date
        startDate = new Date(datePicker.start.toISOString());
        if (timePicker) {
          startDate.setHours(timePicker.start.getHours(), timePicker.start.getMinutes(), 0, 0);
        }

        if (this.isRange) {
          if (!datePicker.end) {
            return;
          }
          // Clone the date
          endDate = new Date(datePicker.end.toISOString());
          if (timePicker) {
            endDate.setHours(timePicker.end.getHours(), timePicker.end.getMinutes(), 0, 0);
          }
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

interface NwbPrivateDatePickerOptions {
  type: 'date' | 'datetime';
  isRange: boolean;
  startDate: Date;
  endDate: Date;
  start: Date;
  end: Date;
}

export interface NwbDatePickerOptions extends NwbDatePickerSettings {
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledWeekDays?: number[];
}
