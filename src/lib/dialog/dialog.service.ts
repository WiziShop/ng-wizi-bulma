import {Injectable, TemplateRef} from '@angular/core';
import {NwbDialogComponent} from './dialog.component';
import {NwbAppService} from '../nwb-app.service';
import {NwbPortal} from '../nwb-root/nwb-root.component';

@Injectable()
export class NwbDialogService {

  constructor(private wdApp: NwbAppService) {
  }

  open(config: NwbDialogConfig): NwbDialogComponent<any> {
    const portal = this.wdApp.getNwbRootComponent().getPortal(NwbPortal.MODAL);

    const factory = portal.componentFactoryResolver.resolveComponentFactory(NwbDialogComponent);
    const componentRef = portal.viewContainerRef.createComponent(factory);
    componentRef.instance.config = config;

    componentRef.instance.afterClosed()
      .subscribe(() => {
        componentRef.destroy();
      });

    return componentRef.instance;
  }

  openFromComponent<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                       config: NwbDialogConfig): NwbDialogComponent<T> {

    const portal = this.wdApp.getNwbRootComponent().getPortal(NwbPortal.MODAL);

    const factory = portal.componentFactoryResolver.resolveComponentFactory(NwbDialogComponent);
    const componentRef = portal.viewContainerRef.createComponent(factory);
    componentRef.instance.config = config;

    componentRef.instance.setComponent(componentOrTemplateRef);

    componentRef.instance.afterClosed()
      .subscribe(() => {
        componentRef.destroy();
      });

    return componentRef.instance;
  }
}


export interface NwbDialogConfig {
  message?: string;
  title: string;
  okButtonText?: string;
  closeButtonText?: string;
  width?: string;
}


export interface ComponentType<T> {
  new (...args: any[]): T;
}
