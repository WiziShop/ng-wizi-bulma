import {ChangeDetectorRef, Component, HostListener, Input, OnInit, Optional} from '@angular/core';
import {NwbSort, NwbSortable} from './sort';
import {CdkColumnDef} from '@angular/cdk/table';
import {merge} from 'rxjs';
import {SortDirection} from './sort-direction';
import {nwbSortAnimations} from './sort-animation';
import {getSortHeaderNotContainedWithinSortError} from './sort-errors';

/**
 * Valid positions for the arrow to be in for its opacity and translation. If the state is a
 * sort direction, the position of the arrow will be above/below and opacity 0. If the state is
 * hint, the arrow will be in the center with a slight opacity. Active state means the arrow will
 * be fully opaque in the center.
 *
 * @docs-private
 */
export type ArrowViewState = SortDirection | 'hint' | 'active';

/**
 * States describing the arrow's animated position (animating fromState to toState).
 * If the fromState is not defined, there will be no animated transition to the toState.
 * @docs-private
 */
export interface ArrowViewStateTransition {
  fromState?: ArrowViewState;
  toState: ArrowViewState;
}

@Component({
  selector: '[nwb-sort-header]',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss'],
  animations: [
    nwbSortAnimations.arrowDirection,
    nwbSortAnimations.arrowOpacity,
    nwbSortAnimations.arrowPosition,
  ]
})
export class NwbSortHeaderComponent implements NwbSortable, OnInit {
  /**
   * Flag set to true when the indicator should be displayed while the sort is not active. Used to
   * provide an affordance that the header is sortable by showing on focus and hover.
   */
  _showIndicatorHint = false;

  /**
   * Whether the view state animation should show the transition between the `from` and `to` states.
   */
  _disableViewStateAnimation = false;

  /**
   * The view transition state of the arrow (translation/ opacity) - indicates its `from` and `to`
   * position through the animation. If animations are currently disabled, the fromState is removed
   * so that there is no animation displayed.
   */
  _viewState: ArrowViewStateTransition;

  /** The direction the arrow should be facing according to the current state. */
  _arrowDirection: SortDirection = '';


  @Input('nwb-sort-header') id: string;


  /** Overrides the sort start value of the containing NwbSort for this NwbSortable. */
  @Input() start: 'asc' | 'desc';

  constructor(changeDetectorRef: ChangeDetectorRef,
              @Optional() public _sort: NwbSort,
              @Optional() private _cdkColumnDef: CdkColumnDef) {

    if (!_sort) {
      throw getSortHeaderNotContainedWithinSortError();
    }

    merge(this._sort.sortChange, this._sort._stateChanges)
      .subscribe(() => {
        if (this.isSorted()) {
          this._updateArrowDirection();
        }

        // If this header was recently active and now no longer sorted, animate away the arrow.
        if (!this.isSorted() && this._viewState && this._viewState.toState === 'active') {
          this._disableViewStateAnimation = false;
          this._setAnimationTransitionState({fromState: 'active', toState: this._arrowDirection});
        }

        changeDetectorRef.markForCheck();
      });

  }

  ngOnInit() {
    if (!this.id && this._cdkColumnDef) {
      this.id = this._cdkColumnDef.name;
    }

    this._sort.register(this);

    // Initialize the direction of the arrow and set the view state to be immediately that state.
    this._updateArrowDirection();

    this._setAnimationTransitionState(
      {
        toState: this.isSorted() ? 'active' : this._arrowDirection
      }
    );

  }

  /** Whether this MatSortHeader is currently sorted in either ascending or descending order. */
  isSorted() {
    return this._sort.active === this.id &&
      (this._sort.direction === 'asc' || this._sort.direction === 'desc');
  }

  /** Triggers the sort on this sort header and removes the indicator hint. */
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    this._sort.sort(this);

    // Do not show the animation if the header was already shown in the right position.
    if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
      this._disableViewStateAnimation = true;
    }

    // If the arrow is now sorted, animate the arrow into place. Otherwise, animate it away into
    // the direction it is facing.
    const viewState: ArrowViewStateTransition = this.isSorted() ?
      {fromState: this._arrowDirection, toState: 'active'} :
      {fromState: 'active', toState: this._arrowDirection};
    this._setAnimationTransitionState(viewState);

    this._showIndicatorHint = false;
  }

  /**
   * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
   * user showing what the active sort will become. If set to false, the arrow will fade away.
   */
  _setIndicatorHintVisible(visible: boolean) {

    this._showIndicatorHint = visible;

    if (!this.isSorted()) {
      this._updateArrowDirection();
      if (this._showIndicatorHint) {
        this._setAnimationTransitionState({fromState: this._arrowDirection, toState: 'hint'});
      } else {
        this._setAnimationTransitionState({fromState: 'hint', toState: this._arrowDirection});
      }
    }
  }

  /**
   * Sets the animation transition view state for the arrow's position and opacity. If the
   * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
   * no animation appears.
   */
  _setAnimationTransitionState(viewState: ArrowViewStateTransition) {
    this._viewState = viewState;

    // If the animation for arrow position state (opacity/translation) should be disabled,
    // remove the fromState so that it jumps right to the toState.
    if (this._disableViewStateAnimation) {
      this._viewState = {toState: viewState.toState};
    }
  }

  /**
   * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
   * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
   * active sorted direction. The reason this is updated through a function is because the direction
   * should only be changed at specific times - when deactivated but the hint is displayed and when
   * the sort is active and the direction changes. Otherwise the arrow's direction should linger
   * in cases such as the sort becoming deactivated but we want to animate the arrow away while
   * preserving its direction, even though the next sort direction is actually different and should
   * only be changed once the arrow displays again (hint or activation).
   */
  _updateArrowDirection() {
    this._arrowDirection = this.isSorted() ?
      this._sort.direction :
      (this.start || this._sort.start);
  }

  /** Returns the arrow position state (opacity, translation). */
  _getArrowViewState() {
    const fromState = this._viewState.fromState;

    return (fromState ? `${fromState}-to-` : '') + this._viewState.toState;
  }


  /** Returns the animation state for the arrow direction (indicator and pointers). */
  _getArrowDirectionState() {
    return `${this.isSorted() ? 'active-' : ''}${this._arrowDirection}`;
  }

}
