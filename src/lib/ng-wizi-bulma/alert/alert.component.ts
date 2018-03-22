import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NwbAlertConfig} from './alert.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nwb-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  host: {
    'class': 'nwb-alert',
  },
  encapsulation: ViewEncapsulation.None,
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
    }, 1);

    if (this.config.duration > 0) {

      this.timer = setTimeout(() => this.dismiss(), this.config.duration);
    }
  }

  dismiss() {
    this.open = false;
    this._afterClosed.next(true);
    this._afterClosed.complete();
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }
}
