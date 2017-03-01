import {animate, AnimationTransitionEvent, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NwbSnackbarConfig} from './snackbar.service';

@Component({
  selector: 'nwb-snack-bar',
  template: `
    <div class="notification is-active"
         [@state]="open ? 'active': 'inactive'"
         (@state.done)="animationDone($event)"
    >
      <div class="columns">
        <div class="column is-9 notification--message">
          {{config.message}}
        </div>
        <div class="column is-1">
          <button *ngIf="config.action" class="button is-success" (click)="dismiss(true)">{{config.action}}</button>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      bottom: 0;
      width: 600px;
      background-color: rgba(0, 0, 0, 0.8);
      color: #fff;
      font-size: 15px;
      font-weight: 300;
      margin: 0 auto;
      left: 0;
      right: 0;
    }

    .notification--message {
      align-self: center;
    }
  `],
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

  animationDone(event: AnimationTransitionEvent) {
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
