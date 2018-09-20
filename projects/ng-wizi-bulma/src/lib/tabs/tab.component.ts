import { Component, Input } from '@angular/core';

@Component({
  selector: 'nwb-tab',
  template: `
    <ng-content *ngIf="isSelected">
    </ng-content>
  `
})
export class NwbTabComponent {
  @Input()
  label: string;
  @Input()
  icon: string;
  index: number;

  isSelected: boolean;

  setSelected(isSelected: boolean) {
    this.isSelected = isSelected;
  }
}
