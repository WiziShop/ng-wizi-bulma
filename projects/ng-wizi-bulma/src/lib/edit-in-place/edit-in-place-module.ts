import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NwbEditInPlaceComponent } from './edit-in-place.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NwbCommonModule } from '../shared/common-module';
import { AutoSizeInputModule } from 'ngx-autosize-input';

@NgModule({
  imports: [CommonModule, NwbCommonModule, FormsModule, ReactiveFormsModule, AutoSizeInputModule],
  providers: [],
  entryComponents: [],
  declarations: [NwbEditInPlaceComponent],
  exports: [NwbEditInPlaceComponent]
})
export class NwbEditInPlaceModule {}
