import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NwbPaginatorComponent} from './paginator.component';
import {NwbPaginatorIntl} from './paginator-intl';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [NwbPaginatorIntl],
  entryComponents: [],
  declarations: [NwbPaginatorComponent],
  exports: [NwbPaginatorComponent],
})
export class NwbPaginatorModule {
}
