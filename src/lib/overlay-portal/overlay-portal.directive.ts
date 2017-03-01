import {ComponentFactoryResolver, Directive, ViewContainerRef} from '@angular/core';


/**
 * @private
 */
@Directive({
  selector: '[nwbOverlayPortal]',
})
export class NwbOverlayPortalDirective {
  constructor(public componentFactoryResolver: ComponentFactoryResolver,
              public viewContainerRef: ViewContainerRef) {
  }


}

