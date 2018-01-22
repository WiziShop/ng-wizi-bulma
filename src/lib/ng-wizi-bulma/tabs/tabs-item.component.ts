import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Optional
} from '@angular/core';

import { NwbTabsActiveContext } from './tabs-active.class';

/**
 * ###Usage
 * <div nwb-tabs>
 *   <div nwb-tabs-item="'Tab 0'">
 *   </div>
 *   <div nwb-tabs-item="'Tab 1'">
 *   </div>
 *   <div nwb-tabs-item="'Tab 2'">
 *   </div>
 * </div>
 */
@Component({
  selector: 'nwb-tabs-item',
  template: `
  <ng-content *ngIf="active.idx===idx">
  </ng-content>
  `
})
export class NwbTabsItemViewComponent implements OnInit {

  @Input() label: string;
  @Input() icon: string;
  idx: number;                  /*!< our idx */
  active: NwbTabsActiveContext; /*!< Active idx */
  constructor() {}
  ngOnInit() {}

}
