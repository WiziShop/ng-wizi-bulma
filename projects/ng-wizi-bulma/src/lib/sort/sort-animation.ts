/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger} from '@angular/animations';

export class AnimationCurves {
  static STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
}


/** @docs-private */
export class AnimationDurations {
  static ENTERING = '225ms';
}

const SORT_ANIMATION_TRANSITION = AnimationDurations.ENTERING + ' ' +
  AnimationCurves.STANDARD_CURVE;

/** Animations used by MatSort. */
export const nwbSortAnimations: {
  readonly arrowDirection: AnimationTriggerMetadata;
  readonly arrowOpacity: AnimationTriggerMetadata;
  readonly arrowPosition: AnimationTriggerMetadata;
} = {

  /** Animation that rotates the left pointer of the indicator based on the sorting direction. */
  arrowDirection: trigger('arrowDirection', [
    state('active-asc, asc', style({transform: 'rotate(0deg)'})),
    state('active-desc, desc', style({transform: 'rotate(-180deg)'})),
    transition('active-asc <=> active-desc', animate(SORT_ANIMATION_TRANSITION))
  ]),


  /** Animation that controls the arrow opacity. */
  arrowOpacity: trigger('arrowOpacity', [
    state('desc-to-active, asc-to-active, active', style({opacity: 1})),
    state('desc-to-hint, asc-to-hint, hint', style({opacity: .54})),
    state('hint-to-desc, active-to-desc, desc, hint-to-asc, active-to-asc, asc, void',
      style({opacity: 0})),
    // Transition between all states except for immediate transitions
    transition('* => asc, * => desc, * => active, * => hint, * => void', animate('0ms')),
    transition('* <=> *', animate(SORT_ANIMATION_TRANSITION)),
  ]),

  /**
   * Animation for the translation of the arrow as a whole. States are separated into two
   * groups: ones with animations and others that are immediate. Immediate states are asc, desc,
   * peek, and active. The other states define a specific animation (source-to-destination)
   * and are determined as a function of their prev user-perceived state and what the next state
   * should be.
   */
  arrowPosition: trigger('arrowPosition', [
    // Hidden Above => Hint Center
    transition('* => desc-to-hint, * => desc-to-active',
      animate(SORT_ANIMATION_TRANSITION, keyframes([
        style({transform: 'translateY(-25%)'}),
        style({transform: 'translateY(0)'})
      ]))),
    // Hint Center => Hidden Below
    transition('* => hint-to-desc, * => active-to-desc',
      animate(SORT_ANIMATION_TRANSITION, keyframes([
        style({transform: 'translateY(0)'}),
        style({transform: 'translateY(25%)'})
      ]))),
    // Hidden Below => Hint Center
    transition('* => asc-to-hint, * => asc-to-active',
      animate(SORT_ANIMATION_TRANSITION, keyframes([
        style({transform: 'translateY(25%)'}),
        style({transform: 'translateY(0)'})
      ]))),
    // Hint Center => Hidden Above
    transition('* => hint-to-asc, * => active-to-asc',
      animate(SORT_ANIMATION_TRANSITION, keyframes([
        style({transform: 'translateY(0)'}),
        style({transform: 'translateY(-25%)'})
      ]))),
    state('desc-to-hint, asc-to-hint, hint, desc-to-active, asc-to-active, active',
      style({transform: 'translateY(0)'})),
    state('hint-to-desc, active-to-desc, desc',
      style({transform: 'translateY(-25%)'})),
    state('hint-to-asc, active-to-asc, asc',
      style({transform: 'translateY(25%)'})),
  ]),
};
