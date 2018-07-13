import {NgModule} from '@angular/core';
import {NwbPaginatorModule} from './paginator';
import {NwbSortModule} from './sort';
import {NwbModalSearchModule} from './modal-search';
import {NwbAlertModule} from './alert';
import {NwbDialogModule} from './dialog';
import {NwbSnackbarModule} from './snackbar';
import {NwbCommonModule} from './shared/common-module';
import {NwbAnimatedCardModule} from './animated-card';
import {NwbDropdownModule} from './dropdown';
import {NwbProgressBarModule} from './progress-bar';
import {NwbSwitchModule} from './switch';
import {NwbTabsModule} from './tabs';


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
