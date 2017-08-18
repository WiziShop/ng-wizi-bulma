import {NgModule} from '@angular/core';
import {NwbSnackbarModule} from './snackbar/index';
import {NwbDialogModule} from './dialog/index';
import {OVERLAY_CONTAINER_PROVIDER} from './shared/overlay/overlay-container';
import {DOM_SERVICE_PROVIDER} from './shared/dom/dom.service';


@NgModule({
  imports: [NwbSnackbarModule, NwbDialogModule],
  providers: [OVERLAY_CONTAINER_PROVIDER, DOM_SERVICE_PROVIDER],
  declarations: [],
  exports: [NwbSnackbarModule, NwbDialogModule],
})
export class NwbModule {
}
