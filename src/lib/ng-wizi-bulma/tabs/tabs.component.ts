import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  ViewChild,
  ViewContainerRef,
  QueryList,
  ComponentRef,
  ComponentFactory,
  ComponentFactoryResolver,
  HostBinding,
  OnInit,
  AfterContentInit,
  OnChanges
} from '@angular/core';

import {
  //NwbTabsItemListComponent,
  NwbTabsItemViewComponent
} from './tabs-item.component';
import { NwbTabsActiveContext } from './tabs-active.class';

@Component({
  selector: 'nwb-tabs',
  template: `
  <div class="tabs 
    {{alignment&&'is-'+alignment}}
    {{size&&'is-'+size}} 
    {{box&&'is-boxed'}} 
    {{toggle&&'is-toggle'}} 
    {{rounded&&'is-toggle-rounded'}} 
    {{fullwidth&&'is-fullwidth'}}">
    <ul>
      <li *ngFor="let tab of tabs"
          [ngClass]="{'is-active':activeContext.idx===tab.idx}"
	  (click)="whenClicked(tab.idx)">
	<a>
          <span *ngIf="tab.icon" class="icon">
            <i class="{{tab.icon}}"></i>
          </span>
          <span>{{tab.label}}</span>
	</a>
      </li>
    </ul>
  </div>
  <ng-content></ng-content>
  `
})
export class NwbTabsComponent implements OnInit, AfterContentInit, OnChanges {

  /** IE [box]="true" **/
  @Input() box: boolean;

  /** IE: [alignment]="'center|left|right'" **/
  @Input() alignment: string;

  /** IE: [size]="'small|medium|large'" **/
  @Input() size: boolean;

  /** IE: [toggle]="true" **/
  @Input() toggle: boolean;

  /** IE: [rounded]="true" **/
  @Input() rounded: boolean;

  /** IE [fullwidth]="true" **/
  @Input() fullwidth: boolean;

  /** IE: [(active)]="active" (optional, will equal first tab by default) **/
  @Input() active: number;
  @Output() activeChange: EventEmitter < number > ;

  @ContentChildren(NwbTabsItemViewComponent) viewQuery: QueryList < NwbTabsItemViewComponent > ;
  activeContext: NwbTabsActiveContext = new NwbTabsActiveContext();
  tabs: NwbTabsItemViewComponent[];

  constructor() {
    this.activeChange = new EventEmitter < number > ();
  }
  ngOnInit() {
    if (this.rounded) this.toggle = true;
  }

  whenClicked(idx: number) {
    this.activeContext.idx = idx;
    this.activeChange.emit(this.activeContext.idx);
  }

  ngAfterContentInit() {
    this.tabs = this.viewQuery.toArray();
    this.tabs.forEach((tab: NwbTabsItemViewComponent, idx: number) => {
      tab.active = this.activeContext;
      tab.idx = idx;
    });
    this.activeContext.idx = this.active || this.tabs[0].idx;
  }

  ngOnChanges() {
    this.activeContext.idx = this.active;
  }

}
