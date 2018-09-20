import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Optional,
  SkipSelf
} from '@angular/core';

import { OverlayContainer } from '../overlay/overlay-container';
import { PortalInjector } from '../portal/portal-injector';

@Injectable()
export class DomService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private overlayContainer: OverlayContainer
  ) {}

  attachComponentPortal<T>(
    component: ComponentType<T>,
    injector?: PortalInjector
  ): ComponentRef<T> {
    const componentRef: ComponentRef<
      T
    > = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(injector ? injector : this.injector);

    this.appRef.attachView(componentRef.hostView);

    this.overlayContainer
      .getContainerElement()
      .appendChild(this._getComponentRootNode(componentRef));

    return componentRef;
  }

  /** Gets the root HTMLElement for an instantiated component. */
  private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
  }
}

export function DOM_SERVICE_PROVIDER_FACTORY(
  parentContainer: DomService,
  componentFactoryResolver: ComponentFactoryResolver,
  appRef: ApplicationRef,
  injector: Injector,
  overlayContainer: OverlayContainer
) {
  return (
    parentContainer ||
    new DomService(componentFactoryResolver, appRef, injector, overlayContainer)
  );
}

export const DOM_SERVICE_PROVIDER = {
  // If there is already an DomService available, use that. Otherwise, provide a new one.
  provide: DomService,
  deps: [
    [new Optional(), new SkipSelf(), DomService],
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    OverlayContainer
  ],
  useFactory: DOM_SERVICE_PROVIDER_FACTORY
};

export interface ComponentType<T> {
  new (...args: any[]): T;
}
