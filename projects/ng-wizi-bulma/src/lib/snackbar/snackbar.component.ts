import {Observable, Subject} from 'rxjs';
import {NwbSnackbarConfig} from './snackbar.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'nwb-snack-bar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  host: {
    'class': 'nwb-snack-bar',
  },
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('state', [
      state('void', style({
        bottom: '-100px'
      })),
      state('inactive', style({
        bottom: '-100px'
      })),
      state('active', style({
        bottom: '0px'
      })),
      transition('void => active', animate(300)),
      transition('active => inactive', animate(300))
    ])
  ]
})
export class NwbSnackbarComponent implements OnInit {
  config: NwbSnackbarConfig;

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed: Subject<any> = new Subject();

  open = false;

  private manualClose = false;

  private timer: any;


  ngOnInit() {
    this.open = true;
    if (this.config.duration > 0) {

      this.timer = setTimeout(() => this.dismiss(false), this.config.duration);
    }
  }

  dismiss(manualClose: boolean) {
    this.open = false;

    this.manualClose = manualClose;

  }

  animationDone(event: AnimationEvent) {
    if (event.fromState === 'active' && event.toState === 'inactive') {
      this._afterClosed.next(this.manualClose);
      this._afterClosed.complete();
    }
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }
}
