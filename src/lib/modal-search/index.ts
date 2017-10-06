import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwbModalSearchComponent} from './modal-search.component';
import {NwbModalSearchService} from './modal-search.service';
import {NwbSpinnerModule} from '../spinner/index';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, NwbSpinnerModule, FormsModule],
  providers: [NwbModalSearchService],
  declarations: [NwbModalSearchComponent],
  entryComponents: [NwbModalSearchComponent],
  exports: [NwbModalSearchComponent],
})
export class ModalSearchModule {
}

export * from './modal-search.component';
export * from './modal-search.service';

