import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { NwbTabsActiveContext } from './tabs-active.class';

/**
 * A list component dynamically created (For internal use)
 */
@Component({
  template: `
  <li [ngClass]="{'is-active':data.active.label===data.label}">
    <a (click)="data.whenClicked()">
      <span *ngIf="data.icon" class="icon">
        <i class="fa fa-{{data.icon}}"></i>
      </span>
      <span>{{data.label}}</span>
    </a>
  </li>
  `
})
export class NwbTabsItemListComponent implements OnInit {

  data: NwbTabsItemViewComponent;

  constructor() {}
  ngOnInit() {}

}

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
  @Output() tabClick: EventEmitter < string > ;
  active: NwbTabsActiveContext;
  whenClicked(): void { this.tabClick.emit(this.label); }
  constructor() { this.tabClick = new EventEmitter < string > (); }
  ngOnInit() {}

}
