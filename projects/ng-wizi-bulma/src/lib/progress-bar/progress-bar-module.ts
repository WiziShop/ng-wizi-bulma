import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NwbCommonModule } from '../shared/common-module';
import { NwbProgressBarComponent } from './progress-bar.component';

@NgModule({
  imports: [CommonModule, NwbCommonModule],
  providers: [],
  entryComponents: [],
  declarations: [NwbProgressBarComponent],
  exports: [NwbProgressBarComponent]
})
export class NwbProgressBarModule {}
