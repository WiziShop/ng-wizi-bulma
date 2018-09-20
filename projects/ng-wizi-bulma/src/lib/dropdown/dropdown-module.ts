import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NwbCommonModule } from '../shared/common-module';
import { NwbDropdownComponent } from './dropdown.component';
import { NwbOptionComponent } from './option.component';

@NgModule({
  imports: [CommonModule, NwbCommonModule],
  providers: [],
  entryComponents: [],
  declarations: [NwbDropdownComponent, NwbOptionComponent],
  exports: [NwbDropdownComponent, NwbOptionComponent]
})
export class NwbDropdownModule {}
