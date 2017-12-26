import {NgModule} from '@angular/core';
import {NwbSnackbarModule} from './snackbar';
import {NwbDialogModule} from './dialog';
import {OVERLAY_CONTAINER_PROVIDER} from './shared/overlay/overlay-container';
import {DOM_SERVICE_PROVIDER} from './shared/dom/dom.service';
import {NwbPaginatorModule} from './paginator';
import {NwbSpinnerModule} from './spinner';
import {NwbDropdownModule} from './dropdown';
import {NwbOptionModule} from './option';
import {NwbProgressBarModule} from './progress-bar';
import {NwbNwbDebounceModule} from './debounce';
import {NwbModalSearchModule} from './modal-search';


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
    NwbModalSearchModule,
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
    NwbModalSearchModule,
  ],
})
export class NwbModule {
}
