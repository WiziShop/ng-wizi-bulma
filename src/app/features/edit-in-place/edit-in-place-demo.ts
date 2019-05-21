import { Component } from '@angular/core';
import { NwbDialogService } from '@wizishop/ng-wizi-bulma';
import { timer } from 'rxjs';
import { NwbEditInPlaceConfig } from '../../../../projects/ng-wizi-bulma/src/lib/edit-in-place';
import { map } from 'rxjs/operators';

@Component({
  providers: [],
  templateUrl: './edit-in-place-demo.html'
})
export class EditInPlaceDemo {
  docPreview1 = `
  <nwb-edit-in-place
    [(ngModel)]="developer"
    (ngModelChange)="modelChange($event)">
  </nwb-edit-in-place>

  modelChange(event: any) {
    console.log('modelChange', event);
  }
`;

  docPreview2 = `
  <nwb-edit-in-place
    [(ngModel)]="devops"
    [config]="editInPlaceConfig">
  </nwb-edit-in-place>

  editInPlaceConfig: NwbEditInPlaceConfig = {
    data: 20,
    handler: (value: any, data: number) => {
      return this.changeHandler(value, data);
    }
  };

  changeHandler(value: any, data: number) {
    return timer(700).pipe(
      map(() => {
        if (value === 'developer' || value === 'devops') {
          console.log('value has changed to', value, 'with data = ', data);
          return true;
        }

        this.dialog.open({
          title: 'Not changed',
          message: \`Value: <b>\${value}</b> is not allowed\`
        });
        return false;
      })
    );
  }
`;

  docPreview3 = `
 editInPlaceConfig2: NwbEditInPlaceConfig = {
    selectTextUponClick: true
  };
  
 <nwb-edit-in-place 
 [(ngModel)]="developer"
 (ngModelChange)="modelChange($event)"  
 [config]="editInPlaceConfig2">
 
</nwb-edit-in-place>

  modelChange(event: any) {
    console.log('modelChange', event);
  }
`;

  docPreview4 = `
number = 12.5;
formattedString: string;

editInPlaceConfig3: NwbEditInPlaceConfig = {
        currency: '$',
        separator: ',',
        selectTextUponClick: true
};

<nwb-edit-in-place [(ngModel)]="number"
                   [config]="editInPlaceConfig3"
                   (ngModelChange)="modelChange($event)"
                   (customChange)="getFormattedString($event)"
></nwb-edit-in-place>

modelChange(event: any) {
    console.log('modelChange', event);
}

    //CustomChange is optional
getFormattedString(event: string) {
    this.formattedString = event;
    console.log(event);
}
`;

  developer = 'developer';
  devops = 'devops';
  number = 12.5;
  formattedString: string;

  editInPlaceConfig: NwbEditInPlaceConfig = {
    data: 20,
    handler: (value: any, data: number) => {
      return this.changeHandler(value, data);
    }
  };

  editInPlaceConfig2: NwbEditInPlaceConfig = {
    selectTextUponClick: true
  };

  editInPlaceConfig3: NwbEditInPlaceConfig = {
    currency: '$',
    separator: ',',
    selectTextUponClick: true
  };

  constructor(private dialog: NwbDialogService) {}

  changeHandler(value: any, data: number) {
    return timer(700).pipe(
      map(() => {
        if (value === 'developer' || value === 'devops') {
          console.log('value has changed to', value, 'with data = ', data);
          return true;
        }

        this.dialog.open({
          title: 'Not changed',
          message: `Value: <b>${value}</b> is not allowed`
        });
        return false;
      })
    );
  }

  modelChange(event: any) {
    console.log('modelChange', event);
    console.log(this.number);
  }

  // CustomChange is optional
  getFormattedString(event: string) {
    this.formattedString = event;
    console.log(event);
  }
}
