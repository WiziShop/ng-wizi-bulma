import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ComponentType, NwbDialogConfig} from './dialog.service';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {animate, AnimationEvent, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'nwb-dialog',
  template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card"
           [@modalState]="open? 'active' : 'inactive'"
           (@modalState.done)="animationDone($event)"
           [ngStyle]="{'width': config.width}"
      >
        <header class="modal-card-head" *ngIf="config.title" #header>
          <p class="modal-card-title">{{config.title}}</p>
          <button *ngIf="config.hasBackdrop" class="delete" (click)="backdropHandler()" #backdropButton></button>
        </header>

        <section *ngIf="config.loading" class="modal-card-body">
          <nwb-spinner></nwb-spinner>
        </section>

        <section class="modal-card-body"
                 *ngIf="!config.loading && config.message && config.message.length > 0" [innerHTML]="config.message">
        </section>

        <section class="modal-card-body" [ngClass]="{'is-hidden':!hasComponent || config.loading}">
          <div #componentSection></div>
        </section>

        <footer class="modal-card-foot" *ngIf="!config.loading" #footer>
          <button class="button column is-medium is-danger is-4" *ngIf="config.cancelButtonText"
                  (click)="cancelHandler()" #cancelButton>{{config.cancelButtonText}}
          </button>
          <button class="button column is-medium is-success is-offset-4" *ngIf="config.okButtonText"
                  (click)="okHandler()" #okButton>{{config.okButtonText}}
          </button>
        </footer>
      </div>
    </div>
  `,
  styles: [`

    .modal-card {
      min-width: 640px;
      width: auto;
    }

    .modal-card-head, .modal-card-foot {
      border: 0;
      border-radius: 0;
    }

    .modal-card-foot a {
      max-width: 50%;
      white-space: initial;
      word-wrap: break-word;
    }

    .modal-card-head {
      background-color: #eaeaea;
      font-weight: 200;
    }

    .modal-card-body {
      background-color: #f5f5f5;
    }

    button.delete {
      padding: 10px;
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
export class NwbDialogComponent<T> implements OnInit {

  @ViewChild('componentSection', {read: ViewContainerRef}) componentSection: ViewContainerRef;

  @ViewChild('okButton') okButtonEl: ElementRef;
  @ViewChild('cancelButton') cancelButtonEl: ElementRef;
  @ViewChild('backdropButton') backdropButtonEl: ElementRef;

  @ViewChild('header') headerEl: ElementRef;
  @ViewChild('footer') footerEl: ElementRef;

  ready = new EventEmitter<boolean>();

  componentInstance: T;

  hasComponent = false;

  config: NwbDialogConfig;

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed: Subject<any> = new Subject();

  open = false;

  private fromOkButton = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.open = true;
    this.ready.next(true);
  }

  /** Method to call when backdrop button is clicked */
  backdropHandler() {
    this.dismiss(false);
  }


  /** Method to call when cancel button is clicked */
  cancelHandler() {
    if (this.config.cancelHandler && typeof this.config.cancelHandler === 'function') {
      this.config.cancelHandler();
    } else {
      this.dismiss(false);
    }
  }

  /** Method to call when ok button is clicked */
  okHandler() {
    if (this.config.okHandler && typeof this.config.okHandler === 'function') {
      this.config.okHandler();
    } else {
      this.dismiss(true);
    }
  }

  /** Gonna disable all buttons and make the ok button loading */
  disableButtonsAndMakeOkButtonLoading() {
    if (this.cancelButtonEl) {
      this.cancelButtonEl.nativeElement.setAttribute('disabled', 'disabled');
    }

    if (this.okButtonEl) {
      this.okButtonEl.nativeElement.setAttribute('disabled', 'disabled');
      this.okButtonEl.nativeElement.classList.add('is-loading');
    }

    if (this.backdropButtonEl) {
      this.backdropButtonEl.nativeElement.setAttribute('disabled', 'disabled');
    }
  }

  /** Gonna enable all buttons and make the ok button not loading */
  enableButtonsAndMakeOkButtonNotLoading() {
    if (this.cancelButtonEl) {
      this.cancelButtonEl.nativeElement.removeAttribute('disabled');
    }

    if (this.okButtonEl) {
      this.okButtonEl.nativeElement.removeAttribute('disabled');
      this.okButtonEl.nativeElement.classList.remove('is-loading');
    }

    if (this.backdropButtonEl) {
      this.backdropButtonEl.nativeElement.removeAttribute('disabled');
    }
  }

  /** Dismiss the dialog */
  dismiss(fromOkButton: boolean) {
    this.open = false;

    this.fromOkButton = fromOkButton;

  }

  animationDone(event: AnimationEvent) {
    if (event.fromState === 'active' && event.toState === 'inactive') {
      this._afterClosed.next(this.fromOkButton);
      this._afterClosed.complete();
    }
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<boolean> {
    return this._afterClosed.asObservable();
  }

  hideSpinner() {
    this.config.loading = false;
  }

  displaySpinner() {
    this.config.loading = true;
  }

  _setComponent(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>) {
    let factory;

    if (componentOrTemplateRef instanceof TemplateRef) {
      this.componentSection.createEmbeddedView(componentOrTemplateRef);
    } else {
      factory = this.componentFactoryResolver.resolveComponentFactory(componentOrTemplateRef);
      const componentRef = this.componentSection.createComponent(factory);

      this.componentInstance = componentRef.instance;
    }
    this.hasComponent = true;
  }
}
