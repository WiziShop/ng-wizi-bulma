import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NwbCommonModule} from '../shared/common-module';
import {NwbSwitchComponent} from './switch.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NwbCommonModule,
  ],
  providers: [],
  entryComponents: [],
  declarations: [NwbSwitchComponent],
  exports: [NwbSwitchComponent],
})
export class NwbSwitchModule {
}
