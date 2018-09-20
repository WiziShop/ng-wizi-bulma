import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';

import { NwbTabComponent } from './tab.component';

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
        <li *ngFor="let tab of tabList"
            [ngClass]="{'is-active':selectedIndex===tab.index}"
            (click)="select(tab.index)">
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
export class NwbTabsComponent implements OnInit, AfterContentInit {
  /** IE [box]="true" **/
  @Input()
  box: boolean;

  /** IE: [alignment]="'center|left|right'" **/
  @Input()
  alignment: string;

  /** IE: [size]="'small|medium|large'" **/
  @Input()
  size: boolean;

  /** IE: [toggle]="true" **/
  @Input()
  toggle: boolean;

  /** IE: [rounded]="true" **/
  @Input()
  rounded: boolean;

  /** IE [fullwidth]="true" **/
  @Input()
  fullwidth: boolean;

  /** IE: [(selectedIndex)]="active" (optional, will equal first tab by default) **/
  _selectedIndex = 0;
  @Input()
  set selectedIndex(selectedIndex: number) {
    this.select(selectedIndex);
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  @Output()
  selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  @ContentChildren(NwbTabComponent)
  tabList: QueryList<NwbTabComponent>;

  constructor() {}

  ngOnInit() {
    if (this.rounded) {
      this.toggle = true;
    }
  }

  select(index: number) {
    if (this._selectedIndex === index) {
      return;
    }

    this._selectedIndex = index;

    if (this.tabList) {
      this.tabList.forEach((tab: NwbTabComponent) => {
        tab.setSelected(tab.index === this.selectedIndex);
      });

      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }

  ngAfterContentInit() {
    this.tabList.forEach((tab: NwbTabComponent, index) => {
      tab.index = index;
      tab.setSelected(tab.index === this.selectedIndex);
    });
  }
}
