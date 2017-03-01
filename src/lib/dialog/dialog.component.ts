import {
  animate,
  AnimationTransitionEvent,
  Component,
  keyframes,
  OnInit,
  style,
  transition,
  trigger
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NwbDialogConfig} from './dialog.service';

@Component({
  selector: 'nwb-dialog',
  template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card"
           [@modalState]="open? 'active' : 'inactive'"
           (@modalState.done)="animationDone($event)"
      >
        <header class="modal-card-head" *ngIf="config.title">
          <p class="modal-card-title">{{config.title}}</p>
          <button class="delete" (click)="dismiss(false)"></button>
        </header>
        <section class="modal-card-body">
          {{config.message}}
        </section>
        <footer class="modal-card-foot">
          <a class="button column is-medium is-danger" (click)="dismiss(false)">{{config.closeButtonText}}</a>
          <a class="button column is-medium is-success is-offset-8" *ngIf="config.okButtonText !== ''"
             (click)="dismiss(true)">{{config.okButtonText}}</a>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .modal-card-head, .modal-card-foot {
      border: 0;
      border-radius: 0;
    }

    .modal-card-head {
      background-color: #eaeaea;
      font-weight: 200;
    }

    .modal-card-body {
      background-color: #f5f5f5;
    }

    a.button {
      height: auto;
    }
  `],
  animations: [
    trigger('modalState', [
      transition('void => active', animate('200ms', keyframes([
        style({opacity: '0', top: '5%', offset: 0}),
        style({opacity: '1', top: '0', offset: 1}),
      ]))),
      transition('active => inactive', animate('200ms', keyframes([
        style({opacity: '1', offset: 0}),
        style({opacity: '0', top: '5%', offset: 1}),
      ])))
    ])
  ]
})
export class NwbDialogComponent implements OnInit {
  config: NwbDialogConfig = {
    message: 'Mon message',
    title: 'Mon title',
    okButtonText: 'OK',
    closeButtonText: 'CLOSE',
  };

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed: Subject<any> = new Subject();

  open = false;

  private fromOkButton = false;


  ngOnInit() {
    this.open = true;
  }

  dismiss(fromOkButton: boolean) {
    this.open = false;

    this.fromOkButton = fromOkButton;

  }

  animationDone(event: AnimationTransitionEvent) {
    if (event.fromState === 'active' && event.toState === 'inactive') {
      this._afterClosed.next(this.fromOkButton);
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
