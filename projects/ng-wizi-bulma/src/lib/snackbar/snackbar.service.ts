import { Injectable } from '@angular/core';
import { NwbSnackbarComponent } from './snackbar.component';
import { DomService } from '../shared/dom/dom.service';

@Injectable()
export class NwbSnackbarService {
  constructor(private domService: DomService) {}

  open(config: NwbSnackbarConfig): NwbSnackbarComponent {
    const componentRef = this.getComponentRef(config);

    return componentRef.instance;
  }

  private getComponentRef(config: NwbSnackbarConfig) {
    const componentRef = this.domService.attachComponentPortal(
      NwbSnackbarComponent
    );

    componentRef.instance.config = config;

    componentRef.instance.afterClosed().subscribe(() => {
      componentRef.destroy();
    });

    return componentRef;
  }
}

export interface NwbSnackbarConfig {
  message: string;
  action?: string;
  duration?: number;
  color?: string;
  buttonColor?: string;
}
