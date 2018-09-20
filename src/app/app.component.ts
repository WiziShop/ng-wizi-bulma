import { Component } from '@angular/core';
import { ModalSearchService } from './services/modal-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalSearchService: ModalSearchService) {}

  openModalSearch() {
    this.modalSearchService.modalSearch.open();
  }
}
