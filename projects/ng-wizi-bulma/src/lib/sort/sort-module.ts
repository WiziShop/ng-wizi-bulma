import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NwbSortHeaderComponent} from './sort-header.component';
import {NwbSort} from './sort';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [],
  entryComponents: [],
  declarations: [NwbSort, NwbSortHeaderComponent],
  exports: [NwbSort, NwbSortHeaderComponent],
})
export class NwbSortModule {
}
