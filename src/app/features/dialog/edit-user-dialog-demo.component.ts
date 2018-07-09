import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NwbDialogComponent, NwbDialogService} from 'ng-wizi-bulma';


@Component({
  selector: 'demo-add-user-dialog',
  templateUrl: './edit-user-dialog-demo.component.html',
})
export class EditUserDialogDemoComponent implements OnInit {

  private _id: number;

  @Input()
  set id(id: number) {
    this._id = id;
    this.fetch();
  }

  get id() {
    return this._id;
  }

  @Output() userChange = new EventEmitter<User>();

  @Output() close = new EventEmitter<boolean>();

  user: User;

  @ViewChild('dialogTemplateRef') dialogTemplateRef: TemplateRef<any>;


  private dialog: NwbDialogComponent<any>;

  constructor(private nwbDialog: NwbDialogService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.dialog = this.nwbDialog.openFromComponent(this.dialogTemplateRef, {
        title: 'Edit User ' + this._id,
        okButtonText: 'OK',
        cancelButtonText: 'Cancel',
        loading: true,
        okHandler: () => {
          return this.setUser();
        },
      });

      this.dialog
        .afterClosed()
        .subscribe((fromOk) => {
          this.close.emit(fromOk);
        });

    });

  }


  private fetch() {

    setTimeout(() => {

      this.user = new User();
      this.user.name = 'Joe';
      this.user.userName = 'bulma';

      this.dialog.hideSpinner();
    }, 2000);
  }

  private setUser() {
    this.userChange.emit(this.user);
    this.dialog.dismiss(false);
  }
}

export class User {
  name: string;
  userName: string;
}
