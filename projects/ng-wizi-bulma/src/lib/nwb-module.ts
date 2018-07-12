import {NgModule} from '@angular/core';
import {NwbSpinnerComponent} from './spinner/spinner.component';
import {CommonModule} from '@angular/common';
import {NwbDialogService} from './dialog/dialog.service';
import {NwbDialogComponent} from './dialog/dialog.component';
import {OVERLAY_CONTAINER_PROVIDER} from './shared/overlay/overlay-container';
import {DOM_SERVICE_PROVIDER} from './shared/dom/dom.service';
import {NwbDebounceDirective} from './debounce/debounce.directive';
import {NwbDropdownComponent} from './dropdown/dropdown.component';
import {NwbModalSearchService} from './modal-search/modal-search.service';
import {NwbModalSearchComponent} from './modal-search/modal-search.component';
import {NwbOptionComponent} from './option/option.component';
import {NwbProgressBarComponent} from './progress-bar/progress-bar.component';
import {NwbSnackbarService} from './snackbar/snackbar.service';
import {NwbSnackbarComponent} from './snackbar/snackbar.component';
import {NwbTabsComponent} from './tabs/tabs.component';
import {FormsModule} from '@angular/forms';
import {NwbTabComponent} from './tabs/tab.component';
import {NwbSwitchComponent} from './switch/switch.component';
import {NwbAlertService} from './alert/alert.service';
import {NwbAlertComponent} from './alert/alert.component';
import {NwbToolTipDirective} from './tooltip/tooltip.directive';
import {NwbAnimatedCardComponent} from './animated-card/animated-card.component';
import {NwbPaginatorModule} from './paginator/paginator-module';
import {NwbSortModule} from './sort/sort-module';


const EXPORTED_DECLARATIONS: any[] = [
  NwbSpinnerComponent,
  NwbDialogComponent,
  NwbDebounceDirective,
  NwbDropdownComponent,
  NwbModalSearchComponent,
  NwbOptionComponent,
  NwbProgressBarComponent,
  NwbSnackbarComponent,
  NwbAlertComponent,
  NwbTabsComponent,
  NwbTabComponent,
  NwbAnimatedCardComponent,
  NwbSwitchComponent,
  NwbToolTipDirective,
];

const EXPORTED_EXPORTS = EXPORTED_DECLARATIONS.concat([NwbPaginatorModule, NwbSortModule]);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NwbPaginatorModule,
    NwbSortModule,
  ],
  providers: [
    OVERLAY_CONTAINER_PROVIDER,
    DOM_SERVICE_PROVIDER,
    NwbDialogService,
    NwbModalSearchService,
    NwbSnackbarService,
    NwbAlertService,
  ],
  entryComponents: [
    NwbDialogComponent,
    NwbModalSearchComponent,
    NwbSnackbarComponent,
    NwbAlertComponent,
  ],
  declarations: EXPORTED_DECLARATIONS,
  exports: EXPORTED_EXPORTS,
})
export class NwbModule {
}
