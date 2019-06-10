import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NwbDatePickerDefaultSettings implements NwbDatePickerDefaultSettings {
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
}

export interface NwbDatePickerSettings {
  color?: string;
  allowSameDayRange?: boolean;
  displayMode?: 'default' | 'dialog' | 'inline';
  showHeader?: boolean;
  headerPosition?: 'top' | 'bottom';
  showFooter?: boolean;
  showButtons?: boolean;
  showTodayButton?: boolean;
  showClearButton?: boolean;
  enableMonthSwitch?: boolean;
  enableYearSwitch?: boolean;
  weekStart?: number;
  minuteSteps?: number;
  closeOnOverlayClick?: boolean;
  closeOnSelect?: boolean;
  toggleOnInputClick?: boolean;
}
