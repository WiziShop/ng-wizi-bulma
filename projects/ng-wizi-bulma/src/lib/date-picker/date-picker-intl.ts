import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatePickerIntl {
  cancelLabel = 'Cancel';
  clearLabel = 'Clear';
  todayLabel = 'Today';
  nowLabel = 'Now';
  validateLabel = 'Validate';
  labelFrom = '';
  labelTo = '';
}
