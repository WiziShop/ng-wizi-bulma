/**
 *
 * Adaptation from angular's material
 *
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Container for NwbSortables to manage the sort state and provide default sort parameters. */
import { Directive, EventEmitter, Input, isDevMode, OnChanges, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { getSortDuplicateSortableIdError, getSortHeaderMissingIdError, getSortInvalidDirectionError } from './sort-errors';
import { SortDirection } from './sort-direction';

/** Interface for a directive that holds sorting state consumed by `MatSortHeader`. */
export interface NwbSortable {
  /** The id of the column being sorted. */
  id: string;

  /** Starting sort direction. */
  start: 'asc' | 'desc';
}

/** The current sort state. */
export interface Sort {
  /** The id of the column being sorted. */
  active: string;

  /** The sort direction. */
  direction: SortDirection;
}

@Directive({
  selector: '[nwbSort]',
  exportAs: 'nwbSort'
})
export class NwbSort implements OnChanges, OnDestroy {
  /** Collection of all registered sortables that this directive manages. */
  sortables = new Map<string, NwbSortable>();

  /** Used to notify any child components listening to state changes. */
  readonly _stateChanges = new Subject<void>();

  /** The id of the most recently sorted NwbSortable. */
  @Input('nwbSortActive')
  active: string;

  /**
   * The direction to set when an NwbSortable is initially sorted.
   * May be overriden by the NwbSortable's sort start.
   */
  @Input('nwbSortStart')
  start: 'asc' | 'desc' = 'asc';

  /** The sort direction of the currently active NwbSortable. */
  @Input('nwbSortDirection')
  get direction(): SortDirection {
    return this._direction;
  }

  set direction(direction: SortDirection) {
    if (isDevMode() && direction && direction !== 'asc' && direction !== 'desc') {
      throw getSortInvalidDirectionError(direction);
    }
    this._direction = direction;
  }

  private _direction: SortDirection = '';

  /** Event emitted when the user changes either the active sort or sort direction. */
  @Output('nwbSortChange')
  readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

  /**
   * Register function to be used by the contained NwbSortables. Adds the NwbSortable to the
   * collection of NwbSortables.
   */
  register(sortable: NwbSortable): void {
    if (!sortable.id) {
      throw getSortHeaderMissingIdError();
    }

    if (this.sortables.has(sortable.id)) {
      throw getSortDuplicateSortableIdError(sortable.id);
    }

    this.sortables.set(sortable.id, sortable);

    if (sortable.id === this.active) {
      this.direction = sortable.start ? sortable.start : this.start;
    }
  }

  /**
   * Unregister function to be used by the contained NwbSortables. Removes the NwbSortable from the
   * collection of contained NwbSortables.
   */
  deregister(sortable: NwbSortable): void {
    this.sortables.delete(sortable.id);
  }

  /** Sets the active sort id and determines the new sort direction. */
  sort(sortable: NwbSortable): void {
    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.emit({ active: this.active, direction: this.direction });
  }

  /** Returns the next sort direction of the active sortable, checking for potential overrides. */
  getNextSortDirection(sortable: NwbSortable): SortDirection {
    if (!sortable) {
      return '';
    }

    // Get the sort direction cycle with the potential sortable overrides.
    const sortOrder: SortDirection[] = ['asc', 'desc'];
    if ((sortable.start || this.start) === 'desc') {
      sortOrder.reverse();
    }

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortOrder.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortOrder.length) {
      nextDirectionIndex = 0;
    }
    return sortOrder[nextDirectionIndex];
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}
