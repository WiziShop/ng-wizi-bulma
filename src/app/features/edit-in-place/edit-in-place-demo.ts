import { Component } from '@angular/core';
import { NwbDialogService } from '@wizishop/ng-wizi-bulma';
import { Observable } from 'rxjs';
import { NwbEditInPlaceConfig } from '../../../../projects/ng-wizi-bulma/src/lib/edit-in-place';

@Component({
  providers: [],
  templateUrl: './edit-in-place-demo.html'
})
export class EditInPlaceDemo {
  developer = 'developer';
  devops = 'devops';

  editInPlaceConfig: NwbEditInPlaceConfig = {
    data: 20,
    handler: (value: any, data: number) => {
      return this.changeHandler(value, data);
    }
  };

  constructor(private dialog: NwbDialogService) {}

  modelChange(event: any) {
    console.log('modelChange', event);
  }

  changeHandler(value: any, data: number) {
    return Observable.create((observer: any) => {
      setTimeout(() => {
        if (value === 'developer' || value === 'devops') {
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
