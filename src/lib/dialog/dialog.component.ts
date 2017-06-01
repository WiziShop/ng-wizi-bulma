import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ComponentType, NwbDialogConfig} from './dialog.service';
import {Component, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
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
        <header class="modal-card-head" *ngIf="config.title">
          <p class="modal-card-title">{{config.title}}</p>
          <button class="delete" (click)="dismiss(false)"></button>
        </header>
        <section class="modal-card-body"
                 *ngIf="config.message && config.message.length" [innerHTML]="config.message">
        </section>
        <section class="modal-card-body" [ngClass]="{'is-hidden':!hasComponent}">
          <div #componentSection></div>
        </section>
        <footer class="modal-card-foot">
          <a class="button column is-medium is-danger" *ngIf="config.closeButtonText"
             (click)="dismiss(false)">{{config.closeButtonText}}</a>
          <a class="button column is-medium is-success is-offset-8" *ngIf="config.okButtonText"
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

    button.delete {
      height: 40px;
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

  componentInstance: T;

  hasComponent = false;

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.open = true;
  }


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
  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  setComponent(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>) {
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
