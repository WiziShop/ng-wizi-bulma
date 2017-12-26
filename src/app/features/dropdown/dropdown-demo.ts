import {Component} from '@angular/core';
import {NwbDialogService, NwbDropdownConfig} from 'ng-wizi-bulma';
import {Observable} from 'rxjs/Observable';

@Component({
  providers: [],
  templateUrl: './dropdown-demo.html',
})
export class DropdownDemo {

  gaming = 'nes';
  gaming2 = 'genesis';

  dopdown2Config: NwbDropdownConfig = {
    data: 20,
    handler: (value: any, data: number) => {
      return this.changeHandler(value, data);
    },
    classes: 'is-info',
  }

  constructor(private dialog: NwbDialogService) {

  }


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
            message: `Value: <b>${value}</b> is not allowed`,
          });
          observer.next(false);
        }
        observer.complete();
      }, 700);

    });
  }
}

