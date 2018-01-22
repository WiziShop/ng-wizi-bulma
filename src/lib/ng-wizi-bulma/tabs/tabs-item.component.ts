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
  selector: '[nwb-tabs-item]',
  template: `
  <ng-content *ngIf="active.label===label">
  </ng-content>
  `
})
export class NwbTabsItemViewComponent implements OnInit {

  @Input('nwb-tabs-item') label: string;
  @Input() icon: string;
  active: NwbTabsActiveContext;
  constructor() {}
  ngOnInit() {}

}
