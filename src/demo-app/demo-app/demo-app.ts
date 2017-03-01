import {Component} from '@angular/core';
import {NwbDialogConfig, NwbDialogService, NwbSnackbarConfig, NwbSnackbarService} from 'ng-wizi-bulma';

@Component({
  moduleId: module.id,
  selector: 'demo-app',
  providers: [],
  templateUrl: './demo-app.html',
  styleUrls: ['demo-app.css'],
})
export class DemoApp {

  dialogConfig: NwbDialogConfig = {
    title: 'Logout',
    message: 'Logout ?',
    okButtonText: 'Yes',
    closeButtonText: 'No'
  };

  snackBarNewVersionConfig: NwbSnackbarConfig = {
    message: 'My snackbar message',
    action: 'My button',
    duration: 3000
  };


  constructor(private nwbSnackbar: NwbSnackbarService, private nwbDialog: NwbDialogService) {
  }



  openDialog() {

    this.nwbDialog.open(this.dialogConfig)
      .afterClosed()
      .subscribe(fromOkButton => console.log('dialogClose, fromOkButton', fromOkButton));

  }


  openSnackbar() {
    console.log('openSnackbar');
    this.nwbSnackbar.open(this.snackBarNewVersionConfig)
      .afterClosed()
      .subscribe(manualClose => console.log('snackBarClose, manualClose', manualClose));

  }


}
