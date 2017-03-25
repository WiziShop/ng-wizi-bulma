import {Component, ViewChild} from '@angular/core';
import {NwbOverlayPortalDirective} from '../overlay-portal/overlay-portal.directive';
import {NwbAppService} from '../nwb-app.service';

@Component({
  selector: 'nwb-app-root',
  template: `
    <div #defaultPortal nwbOverlayPortal></div>
    <div #modalPortal nwbOverlayPortal></div>
    <div #snackBar nwbOverlayPortal></div>
  `
})
export class NwbRootComponent {
  @ViewChild('modalPortal', {read: NwbOverlayPortalDirective})
  modalPortal: NwbOverlayPortalDirective;

  @ViewChild('defaultPortal', {read: NwbOverlayPortalDirective})
  defaultPortal: NwbOverlayPortalDirective;

  @ViewChild('snackBar', {read: NwbOverlayPortalDirective})
  snackBar: NwbOverlayPortalDirective;

  constructor(nwbApp: NwbAppService) {
    nwbApp.setNwbRootComponent(this);
  }

  getPortal(appPortal?: NwbPortal): NwbOverlayPortalDirective {
    if (appPortal === NwbPortal.MODAL) {
      return this.modalPortal;
    }

    return this.defaultPortal;
  }
}

export const enum NwbPortal {
  MODAL,
  SNACKBAR,
}
