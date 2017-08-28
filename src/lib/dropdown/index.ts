import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwbDropdownComponent} from './dropdown.component';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [NwbDropdownComponent],
  entryComponents: [NwbDropdownComponent],
  exports: [NwbDropdownComponent],
})
export class NwbDropdownModule {
}

export * from './dropdown.component';

