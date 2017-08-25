import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwbSpinnerComponent} from './spninner.component';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [NwbSpinnerComponent],
  entryComponents: [NwbSpinnerComponent],
  exports: [NwbSpinnerComponent],
})
export class NwbSpinnerModule {
}

export * from './spninner.component';

