import {NgModule} from '@angular/core';
import {NwbPaginatorModule} from './paginator/paginator-module';
import {NwbSortModule} from './sort/sort-module';
import {NwbModalSearchModule} from './modal-search/modal-search-module';
import {NwbAlertModule} from './alert/alert-module';
import {NwbDialogModule} from './dialog/dialog-module';
import {NwbSnackbarModule} from './snackbar/snackbar-module';
import {NwbCommonModule} from './shared/common-module';
import {NwbAnimatedCardModule} from './animated-card/animated-card-module';
import {NwbDropdownModule} from './dropdown/dropdown-module';
import {NwbProgressBarModule} from './progress-bar/progress-bar-module';
import {NwbSwitchModule} from './switch/switch-module';
import {NwbTabsModule} from './tabs/tabs-module';


const EXPORTED_EXPORTS = [
  NwbCommonModule,

  NwbAlertModule,
  NwbAnimatedCardModule,
  NwbDialogModule,
  NwbDropdownModule,
  NwbModalSearchModule,
  NwbPaginatorModule,
  NwbProgressBarModule,
  NwbSnackbarModule,
  NwbSortModule,
  NwbSwitchModule,
  NwbTabsModule,
];


@NgModule({
  imports: [],
  providers: [],
  entryComponents: [],
  declarations: [],
  exports: EXPORTED_EXPORTS,
})
export class NwbAllModule {
}
