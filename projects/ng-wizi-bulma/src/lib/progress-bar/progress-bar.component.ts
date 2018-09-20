/**
 *
 * Porf of Angular Mateiral's Progress Bar
 *
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * <nwb-progress-bar> component.
 */
@Component({
  selector: 'nwb-progress-bar',
  host: {
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'value',
    '[attr.mode]': 'mode',
    '[class.is-primary]': 'color == "primary"',
    '[class.is-info]': 'color == "info"',
    '[class.is-warning]': 'color == "warning"',
    '[class.is-danger]': 'color == "danger"',
    class: 'nwb-progress-bar'
  },
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NwbProgressBarComponent {
  /** Color of the progress bar. */
  @Input()
  color: 'primary' | 'info' | 'warning' | 'danger' = 'primary';

  private _value: number = 0;

  /** Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow. */
  @Input()
  get value() {
    return this._value;
  }

  set value(v: number) {
    this._value = clamp(v || 0);
  }

  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  @Input()
  mode: 'determinate' | 'indeterminate' | 'query' = 'determinate';

  /** Gets the current transform value for the progress bar's primary indicator. */
  _primaryTransform() {
    let scale = this.value / 100;
    return { transform: `scaleX(${scale})` };
  }
}

/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
