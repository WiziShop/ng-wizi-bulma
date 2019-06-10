import { Component } from '@angular/core';
import { NwbDialogService, NwbDropdownConfig } from '@wizishop/ng-wizi-bulma';
import { Observable } from 'rxjs';

@Component({
  providers: [],
  templateUrl: './dropdown-demo.html'
})
export class DropdownDemo {
  gaming = 'nes';
  gaming2 = 'genesis';

  sample1 = `  <nwb-dropdown [(ngModel)]="gaming" (ngModelChange)="modelChange($event)">
    <nwb-option value="nes" (nwbSelect)="nesHasBeenSelected($event)">NES</nwb-option>
    <nwb-option value="n64">Nintendo64</nwb-option>
    <nwb-option value="ps" [disabled]="true">Disabled value</nwb-option>
    <nwb-option value="genesis">Sega Genesis</nwb-option>
    <nwb-option value="saturn">Sega Saturn</nwb-option>
    <nwb-option value="snes"><i class="fa fa-keyboard">keyboard</i> SNES</nwb-option>
    <nwb-option [divider]="true"></nwb-option>
    <nwb-option [value]="null">null value</nwb-option>
    <nwb-option [value]="true">true value</nwb-option>
  </nwb-dropdown>
  <p>Selected value: {{gaming}}</p>

  gaming = 'nes';

  modelChange(event: any) {
    console.log('modelChange', event);
  }

  nesHasBeenSelected(event: any) {
    console.log('nesHasBeenSelected', event);
  }`;

  sample2 = `  <nwb-dropdown #dropdown [(ngModel)]="gaming2" classes="is-info"
    [config]="dopdown2Config">
    <nwb-option value="nes" (nwbSelect)="nesHasBeenSelected($event)">NES</nwb-option>
    <nwb-option value="n64">Nintendo64</nwb-option>
    <nwb-option value="ps" [disabled]="true">Disabled value</nwb-option>
    <nwb-option value="genesis">Sega Genesis</nwb-option>
    <nwb-option value="saturn">Sega Saturn</nwb-option>
    <nwb-option value="snes"><i class="fa fa-keyboard"></i> SNES</nwb-option>
    <nwb-option [divider]="true"></nwb-option>
    <nwb-option [value]="null">null value</nwb-option>
    <nwb-option [value]="true">true value</nwb-option>
  </nwb-dropdown>
  <p>Selected value: {{gaming2}}</p>
  <button class="button"
    (click)="dropdown.disabled = !dropdown.disabled">Disable/Enable dropdown</button>
  <button class="button"
    (click)="dropdown.classes = dropdown.classes =='is-info' ? '' : 'is-info'">
    Change classes
  </button>
  <pre>{{dopdown2Config|json}}</pre>

  gaming2 = 'genesis';

  dopdown2Config: NwbDropdownConfig = {
    data: 20,
    handler: (value: any, data: number) => {
      return this.changeHandler(value, data);
    }
  };

  changeHandler(value: any, data: number) {
    return Observable.create((observer: any) => {
      setTimeout(() => {
        if (value === 'n64' || value === 'genesis') {
          console.log('value has changed to', value, 'with data = ', data);
          observer.next(true);
        } else {
          this.dialog.open({
            title: 'Not changed',
            message: \`Value: <b>\${value}</b> is not allowed\`
          });
          observer.next(false);
        }
        observer.complete();
      }, 700);
    });
  }`;

  dopdown2Config: NwbDropdownConfig = {
    data: 20,
    handler: (value: any, data: number) => {
      return this.changeHandler(value, data);
    }
  };

  constructor(private dialog: NwbDialogService) {}

  modelChange(event: any) {
    console.log('modelChange', event);
  }

  nesHasBeenSelected(event: any) {
    console.log('nesHasBeenSelected', event);
  }

  changeHandler(value: any, data: number) {
    return Observable.create((observer: any) => {
      setTimeout(() => {
        if (value === 'n64' || value === 'genesis') {
          console.log('value has changed to', value, 'with data = ', data);
          observer.next(true);
        } else {
          this.dialog.open({
            title: 'Not changed',
            message: `Value: <b>${value}</b> is not allowed`
          });
          observer.next(false);
        }
        observer.complete();
      }, 700);
    });
  }
}
