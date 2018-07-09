import {Component} from '@angular/core';
import {ModalSearchService} from '../../services/modal-search.service';

@Component({
  providers: [],
  templateUrl: './modal-search-demo.html',
})
export class ModalSearchDemo {

  constructor(public modalSearchService: ModalSearchService) {

  }

  toggleEnabled() {
    this.modalSearchService.modalSearch.enabled = !this.modalSearchService.modalSearch.enabled;
  }
}

