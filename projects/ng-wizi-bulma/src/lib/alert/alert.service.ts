import { Injectable } from '@angular/core';
import { NwbAlertComponent } from './alert.component';
import { DomService } from '../shared/dom/dom.service';

@Injectable()
export class NwbAlertService {
  constructor(private domService: DomService) {}

  open(config: NwbAlertConfig): NwbAlertComponent {
    const componentRef = this.getComponentRef(config);

    return componentRef.instance;
  }

  private getComponentRef(config: NwbAlertConfig) {
    const componentRef = this.domService.attachComponentPortal(NwbAlertComponent);

    config = Object.assign(
      {
        position: 'is-top'
      },
      config
    );

    componentRef.instance.config = config;

    componentRef.instance.afterClosed().subscribe(() => {
      componentRef.destroy();
    });

    return componentRef;
  }
}

export interface NwbAlertConfig {
  message: string;
  icon?: string;
  color?: string;
  position?: string;
  duration?: number;
  extraClasses?: string;
}
