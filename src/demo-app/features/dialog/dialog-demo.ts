import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NwbDialogConfig, NwbDialogService} from 'ng-wizi-bulma';
import {FakeDialogDemoComponent} from './fake-dialog-demo-component';

@Component({
  moduleId: module.id,
  providers: [],
  templateUrl: './dialog-demo.html',
})
export class DialogDemo {

  dialogConfig: NwbDialogConfig = {
    title: 'Logout',
    message: 'Do you want to <b>logout</b>?',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
    loading: true,
  };
  dialogFromComponentConfig: NwbDialogConfig = {
    title: 'From component',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
  };

  dialogFromComponentConfigWithSpinner: NwbDialogConfig = {
    title: 'From component with spinner',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
    width: '900px',
    loading: true
  };

  fakeComponentValue = '';
  fakeComponent2Value = '';
  numTemplateOpens = 0;

  @ViewChild('dialogTemplateRef') dialogTemplateRef: TemplateRef<any>;

  constructor(private nwbDialog: NwbDialogService) {
  }


  openDialog() {


    let dialog = this.nwbDialog.open(this.dialogConfig);

    dialog.ready
      .subscribe(() => {
        console.log('openDialog is ready');
        setTimeout(() => {
          console.log('openDialog is loaded');
          dialog.hideSpinner();
        }, 3000);
      });

    dialog.config.okHandler = () => {
      dialog.disableButtonsAndMakeOkButtonLoading();

      setTimeout(() => {
        dialog.enableButtonsAndMakeOkButtonNotLoading();
        dialog.dismiss(true);
      }, 3000);
    };

    dialog
      .afterClosed()
      .subscribe(fromOkButton => console.log('dialogClose, fromOkButton', fromOkButton));
  }

  openDialogFromComponent() {
    const dialog = this.nwbDialog
      .openFromComponent(FakeDialogDemoComponent, this.dialogFromComponentConfig);

    dialog.componentInstance.myInput.nativeElement.value = 'Random text';

    dialog
      .afterClosed()
      .subscribe(fromOkButton => {
        if (fromOkButton) {
          this.fakeComponentValue = dialog.componentInstance.myInput.nativeElement.value;
        }
      });
  }

  openDialogFromComponentWithSpinner() {
    const dialog = this.nwbDialog
      .openFromComponent(FakeDialogDemoComponent, this.dialogFromComponentConfigWithSpinner);

    dialog.ready
      .subscribe(() => {
        console.log('openDialogFromComponentWithSpinner is ready');
        dialog.componentInstance.loading
          .subscribe(() => {
            console.log('FakeDialogDemoComponent is loaded');
            dialog.hideSpinner();
          });
      });

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

}

