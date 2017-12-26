import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwdPaginatorComponent} from './paginator.component';
import {NwbPaginatorIntl} from './paginator-intl';

@NgModule({
  imports: [CommonModule],
  providers: [NwbPaginatorIntl],
  declarations: [NwdPaginatorComponent],
  entryComponents: [NwdPaginatorComponent],
  exports: [NwdPaginatorComponent],
})
export class NwbPaginatorModule {
}

export * from './paginator-intl';
export * from './paginator.component';

