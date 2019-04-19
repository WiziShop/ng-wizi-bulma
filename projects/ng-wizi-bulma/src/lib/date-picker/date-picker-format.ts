import { Inject, inject, Injectable, InjectionToken, LOCALE_ID } from '@angular/core';

/** InjectionToken for datepicker that can be used to override default locale code. */
export const NWB_DATE_LOCALE = new InjectionToken<string>('NWB_DATE_LOCALE', {
  providedIn: 'root',
  factory: NWB_DATE_LOCALE_FACTORY
});

/** @docs-private */
export function NWB_DATE_LOCALE_FACTORY(): string {
  return inject(LOCALE_ID);
}

@Injectable({ providedIn: 'root' })
export class DatePickerFormat {
  /** The lang to use for all dates. */
  lang: string;

  dateFormat = 'MM/DD/YYYY';

  timeFormat = 'HH:mm';

  constructor(@Inject(NWB_DATE_LOCALE) locale: string) {
    this.lang = locale && locale.match('-') ? locale.split('-')[1].toLowerCase() : 'en';
  }
}
