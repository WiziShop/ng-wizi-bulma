import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NwbDialogConfig, NwbDialogService, NwbSnackbarConfig, NwbSnackbarService} from 'ng-wizi-bulma';
import {FakeDialogComponent} from './fake-dialog-component';

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
    message: 'Logout <b>with bold</b> ?',
    okButtonText: 'Yes',
    closeButtonText: 'No'
  };
  dialogFromComponentConfig: NwbDialogConfig = {
    title: 'From component',
    okButtonText: 'Yes',
    closeButtonText: 'No',
    width: '900px',
  };

  snackBarNewVersionConfig: NwbSnackbarConfig = {
    message: 'My snackbar message with <b>bold</b>',
    action: 'My button',
    duration: 3000
  };

  fakeComponentValue = '';
  numTemplateOpens = 0;

  @ViewChild('dialogTemplateRef') dialogTemplateRef: TemplateRef<any>;

  constructor(private nwbSnackbar: NwbSnackbarService, private nwbDialog: NwbDialogService) {
  }


  openDialog() {
    this.nwbDialog.open(this.dialogConfig)
      .afterClosed()
      .subscribe(fromOkButton => console.log('dialogClose, fromOkButton', fromOkButton));
  }

  openDialogFromComponent() {
    const dialog = this.nwbDialog
      .openFromComponent(FakeDialogComponent, this.dialogFromComponentConfig);

    dialog.componentInstance.myInput.nativeElement.value = 'Random text';

    dialog
      .afterClosed()
      .subscribe(fromOkButton => {
        if (fromOkButton) {
          this.fakeComponentValue = dialog.componentInstance.myInput.nativeElement.value;
        }
      });
  }

  openDialogFromTemplate() {
    this.numTemplateOpens++;
    const dialog = this.nwbDialog
      .openFromComponent(this.dialogTemplateRef, this.dialogFromComponentConfig);

  }

  openSnackbar() {
    console.log('openSnackbar');
    this.nwbSnackbar.open(this.snackBarNewVersionConfig)
      .afterClosed()
      .subscribe(manualClose => console.log('snackBarClose, manualClose', manualClose));
  }

}

