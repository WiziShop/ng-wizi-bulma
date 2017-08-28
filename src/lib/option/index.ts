import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwbOptionComponent} from './option.component';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [NwbOptionComponent],
  entryComponents: [],
  exports: [NwbOptionComponent],
})
export class NwbOptionModule {
}

export * from './option.component';

