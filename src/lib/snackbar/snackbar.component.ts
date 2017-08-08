import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NwbSnackbarConfig} from './snackbar.service';
import {Component, OnInit} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'nwb-snack-bar',
  template: `
    <div [class]="'notification is-active ' + ((config.color) ? config.color : 'is-transparent')"
         [@state]="open ? 'active': 'inactive'"
         (@state.done)="animationDone($event)"
    >
      <div class="columns">
        <div class="column notification--message" [ngClass]="{'is-half': config.action}"
             [innerHTML]="config.message">
        </div>
        <div class="column is-half" *ngIf="config.action">
          <button [class]="'button ' + ((config.buttonColor) ? config.buttonColor : 'is-success')"
                  (click)="dismiss(true)">{{config.action}}
          </button>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      bottom: 0;
      width: 600px;
      color: #fff;
      font-size: 15px;
      font-weight: 300;
      margin: 0 auto;
      left: 0;
      right: 0;
      z-index: 10;
    }

    .notification.is-transparent {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .notification button {
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
      height: 100%;
    }

    .notification .column:nth-child(2) {
      text-align: right;
    }

    .notification .column:nth-child(1) {
      text-align: left;
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
