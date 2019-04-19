import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatePickerSettings {
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
}
