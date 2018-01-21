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
  NwbTabsItemListComponent,
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
      <ng-template #list>
      </ng-template>
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
  @ViewChild("list", { read: ViewContainerRef }) tabsList: ViewContainerRef;
  listFactory: ComponentFactory < NwbTabsItemListComponent > ;
  viewFactory: ComponentFactory < NwbTabsItemViewComponent > ;
  activeTab: NwbTabsActiveContext = new NwbTabsActiveContext();
  tabs: NwbTabsItemViewComponent[];

  constructor(private _resolver: ComponentFactoryResolver) {
    this.listFactory = _resolver.resolveComponentFactory(NwbTabsItemListComponent);
    this.viewFactory = _resolver.resolveComponentFactory(NwbTabsItemViewComponent);
    this.activeChange = new EventEmitter < string > ();
  }
  ngOnInit() {}

  ngAfterContentInit() {
    this.tabs = this.viewQuery.toArray();
    this.activeTab.label = this.active || this.tabs[0].label;
    this.viewQuery.forEach((tab: NwbTabsItemViewComponent) => {
      let listRef = this.tabsList.createComponent(this.listFactory);
      listRef.instance.data = tab;
      tab.active = this.activeTab;
      tab.tabClick.subscribe((label: string) => {
        this.activeTab.label = label;
        this.activeChange.emit(label);
      })
    });
  }

}
