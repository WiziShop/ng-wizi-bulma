import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NwbSortHeaderComponent} from './sort-header.component';
import {NwbSort} from './sort';
import {CdkTableModule} from '@angular/cdk/table';
import {NwbCommonModule} from '../shared/common-module';


@NgModule({
  imports: [
    CommonModule,
    NwbCommonModule,
    CdkTableModule,
  ],
  providers: [],
  entryComponents: [],
  declarations: [NwbSort, NwbSortHeaderComponent],
  exports: [NwbSort, NwbSortHeaderComponent],
})
export class NwbSortModule {
}
