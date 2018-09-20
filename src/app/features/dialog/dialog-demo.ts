import { Component } from '@angular/core';
import { NwbDialogConfig, NwbDialogService } from '@wizishop/ng-wizi-bulma';
import { FakeDialogDemoComponent } from './fake-dialog-demo.component';
import { User } from './edit-user-dialog-demo.component';

@Component({
  providers: [],
  templateUrl: './dialog-demo.html'
})
export class DialogDemo {
  dialogConfig: NwbDialogConfig = {
    title: 'Logout',
    message: 'Do you want to <b>logout</b>?',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
    loading: true
  };
  dialogFromComponentConfig: NwbDialogConfig = {
    title: 'From component',
    okButtonText: 'Yes',
    cancelButtonText: 'No'
  };

  dialogFromComponentConfigWithSpinner: NwbDialogConfig = {
    title: 'From component with spinner',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
    width: '900px',
    loading: true,
    hasBackdrop: false
  };

  fakeComponentValue = '';
  fakeComponent2Value = '';

  userId: number = null;

  constructor(private nwbDialog: NwbDialogService) {}

  openDialog() {
    let dialog = this.nwbDialog.open(this.dialogConfig);

    dialog.ready.subscribe(() => {
      console.log('openDialog is ready');
      setTimeout(() => {
        console.log('openDialog is loaded');
        dialog.hideSpinner();
      }, 700);
    });

    dialog.config.okHandler = () => {
      dialog.disableButtonsAndMakeOkButtonLoading();

      setTimeout(() => {
        dialog.enableButtonsAndMakeOkButtonNotLoading();
        dialog.dismiss(true);
      }, 700);
    };

    dialog
      .afterClosed()
      .subscribe(fromOkButton =>
        console.log('dialogClose, fromOkButton', fromOkButton)
      );
  }

  openDialogFromComponent() {
    const dialog = this.nwbDialog.openFromComponent(
      FakeDialogDemoComponent,
      this.dialogFromComponentConfig
    );

    dialog.componentInstance.myInput.nativeElement.value = 'Random text';

    dialog.afterClosed().subscribe(fromOkButton => {
      if (fromOkButton) {
        this.fakeComponentValue =
          dialog.componentInstance.myInput.nativeElement.value;
      }
    });
  }

  openDialogFromComponentWithSpinner() {
    const dialog = this.nwbDialog.openFromComponent(
      FakeDialogDemoComponent,
      this.dialogFromComponentConfigWithSpinner
    );

    dialog.ready.subscribe(() => {
      console.log('openDialogFromComponentWithSpinner is ready');
      dialog.componentInstance.loading.subscribe(() => {
        console.log('FakeDialogDemoComponent is loaded');
        dialog.hideSpinner();
      });
    });

    dialog.componentInstance.myInput.nativeElement.value = 'Random text';

    dialog.afterClosed().subscribe(fromOkButton => {
      if (fromOkButton) {
        this.fakeComponentValue =
          dialog.componentInstance.myInput.nativeElement.value;
      }
    });
  }

  openDialogFromTemplate() {
    this.userId = 42;
  }

  userChange(user: User) {
    console.log('user has changed', user);
  }
}
