import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatePickerIntl {
  closeLabel = 'Close';
  clearLabel = 'Clear';
  todayLabel = 'Today';
  nowLabel = 'Now';
  labelFrom = '';
  labelTo = '';
}
