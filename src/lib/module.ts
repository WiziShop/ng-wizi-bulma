import {NgModule} from '@angular/core';
import {NwbOverlayPortalDirective} from './overlay-portal/overlay-portal.directive';
import {NwbAppService} from './nwb-app.service';
import {NwbRootComponent} from './nwb-root/nwb-root.component';
import {NwbSnackbarModule} from './snackbar/index';
import {NwbDialogModule} from './dialog/index';


@NgModule({
  imports: [NwbSnackbarModule, NwbDialogModule],
  providers: [NwbAppService],
  declarations: [NwbRootComponent, NwbOverlayPortalDirective],
  exports: [NwbRootComponent, NwbSnackbarModule, NwbDialogModule],
})
export class NwbModule {
}
