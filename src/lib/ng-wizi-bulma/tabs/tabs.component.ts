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
  AfterContentInit
} from '@angular/core';

import {
  //NwbTabsItemListComponent,
  NwbTabsItemViewComponent
} from './tabs-item.component';
import { NwbTabsActiveContext } from './tabs-active.class';

@Component({
  selector: '[nwb-tabs]',
  template: `
  <div class="tabs 
    {{alignment&&'is-'+alignment}}
    {{size&&'is-'+size}}">
    <ul>
      <li *ngFor="let tab of tabs"
          [ngClass]="{'is-active':activeContext.label===tab.label}"
	  (click)="whenClicked(tab.label)">
	<a>
          <span *ngIf="tab.icon" class="icon">
            <i class="fa fa-{{tab.icon}}"></i>
          </span>
          <span>{{tab.label}}</span>
	</a>
      </li>
    </ul>
  </div>
  <ng-content></ng-content>
  `
})
export class NwbTabsComponent implements OnInit, AfterContentInit {

  /** IE [box]="true" **/
  @Input() box: boolean;

  /** IE: [alignment]="'center|left|right'" **/
  @Input() alignment: string;

  /** IE: [size]="'small|medium|large'" **/
  @Input() size: boolean;

  /** IE: [(active)]="active" (optional, will equal first tab by default) **/
  @Input() active: string;
  @Output() activeChange: EventEmitter < string > ;

  @ContentChildren(NwbTabsItemViewComponent) viewQuery: QueryList < NwbTabsItemViewComponent > ;
  activeContext: NwbTabsActiveContext = new NwbTabsActiveContext();
  tabs: NwbTabsItemViewComponent[];

  constructor(private _resolver: ComponentFactoryResolver) {}
  ngOnInit() {}

  whenClicked(label: string) {
    this.activeContext.label = label;
  }

  ngAfterContentInit() {
    this.tabs = this.viewQuery.toArray();
    this.tabs.forEach((tab: NwbTabsItemViewComponent) => {
      tab.active = this.activeContext;
    });
    this.activeContext.label = this.active || this.tabs[0].label;
  }

}
