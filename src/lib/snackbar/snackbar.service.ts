import {Injectable} from '@angular/core';
import {NwbAppService} from '../nwb-app.service';
import {NwbSnackbarComponent} from './snackbar.component';
import {NwbPortal} from '../nwb-root/nwb-root.component';

@Injectable()
export class NwbSnackbarService {

  constructor(private wdApp: NwbAppService) {
  }

  open(config: NwbSnackbarConfig): NwbSnackbarComponent {
    const portal = this.wdApp.getNwbRootComponent().getPortal(NwbPortal.SNACKBAR);

    const factory = portal.componentFactoryResolver.resolveComponentFactory(NwbSnackbarComponent);
    const componentRef = portal.viewContainerRef.createComponent(factory);
    componentRef.instance.config = config;

    componentRef.instance.afterClosed()
      .subscribe(() => {
        componentRef.destroy();
      });

    return componentRef.instance;
  }
}


export interface NwbSnackbarConfig {
  message: string;
  action?: string;
  duration?: number;
}

