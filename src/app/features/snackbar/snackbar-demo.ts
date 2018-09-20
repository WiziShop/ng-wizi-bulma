import { Component } from '@angular/core';
import { NwbSnackbarConfig, NwbSnackbarService } from '@wizishop/ng-wizi-bulma';

@Component({
  providers: [],
  templateUrl: './snackbar-demo.html'
})
export class SnackbarDemo {
  snackBarNewVersionConfig: NwbSnackbarConfig = {
    message: 'My snackbar message with <b>bold</b>',
    action: 'My button',
    duration: 3000
  };

  constructor(private nwbSnackbar: NwbSnackbarService) {}

  openSnackbar() {
    console.log('openSnackbar');
    this.nwbSnackbar
      .open(this.snackBarNewVersionConfig)
      .afterClosed()
      .subscribe(manualClose =>
        console.log('snackBarClose, manualClose', manualClose)
      );
  }
}
