import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NwbModalSearchComponent } from './modal-search.component';
import { NwbModalSearchService } from './modal-search.service';
import { NwbCommonModule } from '../shared/common-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, NwbCommonModule],
  providers: [NwbModalSearchService],
  entryComponents: [NwbModalSearchComponent],
  declarations: [NwbModalSearchComponent],
  exports: [NwbModalSearchComponent]
})
export class NwbModalSearchModule {}
