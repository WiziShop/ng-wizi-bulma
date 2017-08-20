import {Injectable, Injector, TemplateRef} from '@angular/core';
import {NwbDialogComponent} from './dialog.component';
import {ComponentType, DomService} from '../shared/dom/dom.service';
import {PortalInjector} from '../shared/portal/portal-injector';
import {extendObject} from '../shared/util/object-extend';

@Injectable()
export class NwbDialogService {

  constructor(private domService: DomService, private injector: Injector) {
  }

  open(config: NwbDialogConfig): NwbDialogComponent<any> {

    const componentRef = this.getComponentRef(config);

    return componentRef.instance;
  }

  openFromComponent<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                       config: NwbDialogConfig): NwbDialogComponent<T> {


    const componentRef = this.getComponentRef(config);

    componentRef.instance.setComponent(componentOrTemplateRef);

    return componentRef.instance;
  }


  private getComponentRef(config: NwbDialogConfig) {
    const injectionTokens = new WeakMap();

    injectionTokens.set(NwbDialogComponent, NwbDialogComponent);

    let injector = new PortalInjector(this.injector, injectionTokens);

    const componentRef = this.domService.attachComponentPortal(NwbDialogComponent, injector);

    componentRef.instance.config = extendObject(new NwbDialogConfig(), config);

    componentRef.instance.afterClosed()
      .subscribe(() => {
        componentRef.destroy();
      });

    return componentRef;
  }
}


export class NwbDialogConfig {

  /** Dialog's content */
  message?: string;

  /** Dialog's title */
  title: string;

  /** Text of the ok button. If none the button won't be displayed */
  okButtonText?: string = '';

  /** Text of the cancel button. If none the button won't be displayed */
  cancelButtonText?: string = '';

  /** Width of the dialog. */
  width?: string = '';

  /** Whether the dialog has a backdrop. */
  hasBackdrop?: boolean = true;

  /** Custom method to call when ok button is clicked */
  okHandler?: Function = null;

  /** Custom method to call when cancel button is clicked */
  cancelHandler?: Function = null;
}


export interface ComponentType<T> {
  new (...args: any[]): T;
}
