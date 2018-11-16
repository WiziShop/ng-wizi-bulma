import { Observable, Subject } from 'rxjs';
import { NwbAlertConfig } from './alert.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nwb-alert',
  templateUrl: './alert.component.html',
  host: {
    class: 'nwb-alert'
  },
  encapsulation: ViewEncapsulation.None
})
export class NwbAlertComponent implements OnInit {
  config: NwbAlertConfig;

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed: Subject<any> = new Subject();

  open = false;

  private timer: any;

  ngOnInit() {
    setTimeout(() => {
      this.open = true;
    }, 50);

    if (this.config.duration > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.config.duration);
    }
  }

  dismiss() {
    this.open = false;

    setTimeout(() => {
      this._afterClosed.next(true);
      this._afterClosed.complete();
    }, 200);
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }
}
