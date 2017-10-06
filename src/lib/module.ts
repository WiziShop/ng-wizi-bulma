import {NgModule} from '@angular/core';
import {NwbSnackbarModule} from './snackbar/index';
import {NwbDialogModule} from './dialog/index';
import {OVERLAY_CONTAINER_PROVIDER} from './shared/overlay/overlay-container';
import {DOM_SERVICE_PROVIDER} from './shared/dom/dom.service';
import {NwbPaginatorModule} from './paginator/index';
import {NwbSpinnerModule} from './spinner/index';
import {NwbDropdownModule} from './dropdown/index';
import {NwbOptionModule} from './option/index';
import {NwbProgressBarModule} from './progress-bar/index';
import {NwbNwbDebounceModule} from './debounce/index';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import {ModalSearchModule} from './modal-search/index';

@NgModule({
  imports: [
    NwbSnackbarModule,
    NwbDialogModule,
    NwbPaginatorModule,
    NwbSpinnerModule,
    NwbDropdownModule,
    NwbOptionModule,
    NwbProgressBarModule,
    NwbNwbDebounceModule,
    ModalSearchModule,
  ],
  providers: [OVERLAY_CONTAINER_PROVIDER, DOM_SERVICE_PROVIDER],
  declarations: [],
  exports: [
    NwbSnackbarModule,
    NwbDialogModule,
    NwbPaginatorModule,
    NwbSpinnerModule,
    NwbDropdownModule,
    NwbOptionModule,
    NwbProgressBarModule,
    NwbNwbDebounceModule,
    ModalSearchModule,
  ],
})
export class NwbModule {
}
