import {Injectable, TemplateRef} from '@angular/core';
import {NwbDialogComponent} from './dialog.component';
import {ComponentType, DomService} from '../shared/dom/dom.service';

@Injectable()
export class NwbDialogService {

  constructor(private domService: DomService) {
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
    const componentRef = this.domService.attachComponentPortal(NwbDialogComponent);

    componentRef.instance.config = config;

    componentRef.instance.afterClosed()
      .subscribe(() => {
        componentRef.destroy();
      });

    return componentRef;
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
