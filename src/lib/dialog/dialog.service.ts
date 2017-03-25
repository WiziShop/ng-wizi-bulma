import {Injectable} from '@angular/core';
import {NwbDialogComponent} from './dialog.component';
import {NwbAppService} from '../nwb-app.service';
import {NwbPortal} from '../nwb-root/nwb-root.component';

@Injectable()
export class NwbDialogService {

  constructor(private wdApp: NwbAppService) {
  }

  open(config: NwbDialogConfig): NwbDialogComponent {
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
}



export interface NwbDialogConfig {
  message: string;
  title: string;
  okButtonText?: string;
  closeButtonText?: string;
}
