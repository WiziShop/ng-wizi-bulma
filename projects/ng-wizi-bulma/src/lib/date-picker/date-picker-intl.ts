import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatePickerIntl {
  readonly changes: Subject<void> = new Subject<void>();
  cancelLabelView = 'Cancel';

  clearLabelView = 'Clear';

  todayLabelView = 'Today';

  nowLabelView = 'Now';

  validateLabelView = 'Validate';
}
