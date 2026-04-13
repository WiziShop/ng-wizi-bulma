import { Component } from '@angular/core';
import { NwbSnackbarConfig, NwbSnackbarService } from 'projects/ng-wizi-bulma/src/public_api';

@Component({
  standalone: false,
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
      .subscribe(manualClose => console.log('snackBarClose, manualClose', manualClose));
  }
}
