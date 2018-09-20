import { Observable, Subject } from 'rxjs';
import { ComponentType, NwbDialogConfig } from './dialog.service';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {
  animate,
  AnimationEvent,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'nwb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  host: {
    class: 'nwb-dialog'
  },
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('modalState', [
      transition(
        'void => active',
        animate(
          '200ms',
          keyframes([
            style({ opacity: '0', top: '5%', offset: 0 }),
            style({ opacity: '1', top: '0', offset: 1 })
          ])
        )
      ),
      transition(
        'active => inactive',
        animate(
          '200ms',
          keyframes([
            style({ opacity: '1', offset: 0 }),
            style({ opacity: '0', top: '5%', offset: 1 })
          ])
        )
      )
    ])
  ]
})
export class NwbDialogComponent<T> implements OnInit {
  @ViewChild('componentSection', { read: ViewContainerRef })
  componentSection: ViewContainerRef;

  @ViewChild('okButton')
  okButtonEl: ElementRef;
  @ViewChild('cancelButton')
  cancelButtonEl: ElementRef;
  @ViewChild('backdropButton')
  backdropButtonEl: ElementRef;

  @ViewChild('header')
  headerEl: ElementRef;
  @ViewChild('footer')
  footerEl: ElementRef;

  ready = new EventEmitter<boolean>();

  componentInstance: T;

  hasComponent = false;

  config: NwbDialogConfig;

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed: Subject<any> = new Subject();

  open = false;

  private fromOkButton = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.open = true;
    this.ready.next(true);
  }

  @HostListener('document:keydown.escape')
  _keypress() {
    if (this.config.hasBackdrop) {
      this.dismiss(false);
    }
  }

  /** Method to call when backdrop button is clicked */
  backdropHandler() {
    if (this.config.hasBackdrop) {
      this.dismiss(false);
    }
  }

  /** Method to call when cancel button is clicked */
  cancelHandler() {
    if (
      this.config.cancelHandler &&
      typeof this.config.cancelHandler === 'function'
    ) {
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
      factory = this.componentFactoryResolver.resolveComponentFactory(
        componentOrTemplateRef
      );
      const componentRef = this.componentSection.createComponent(factory);

      this.componentInstance = componentRef.instance as T;
    }
    this.hasComponent = true;
  }
}
