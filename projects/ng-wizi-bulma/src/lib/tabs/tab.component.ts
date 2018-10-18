import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'nwb-tab',
  template: `
    <ng-content>
    </ng-content>
  `
})
export class NwbTabComponent {
  @Input()
  label: string;
  @Input()
  icon: string;
  index: number;
  
  @HostBinding('class.is-active') get isActive() { return this.isSelected; }
  @HostBinding('class.tab') true;

  isSelected: boolean;

  setSelected(isSelected: boolean) {
    this.isSelected = isSelected;
  }
}
