import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {NwbFoundRow, NwbModalSearchComponent, NwbModalSearchService} from 'ng-wizi-bulma';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private records1: NwbFoundRow[] = [
    {
      text: 'Debounce',
      data: './debounce',
    }, {
      text: 'Dialog',
      data: './dialog',
    }, {
      text: 'Dropdown',
      data: './dropdown',
    },
  ];

  private records2: NwbFoundRow[] = [
    {
      text: 'Modal Search',
      data: './modal-search',
    }, {
      text: 'Progress Bar',
      data: './progress-bar',
    }, {
      text: 'Paginator',
      data: './paginator',
    }, {
      text: 'Snackbar',
      data: './snackbar',
    }, {
      text: 'Spinner',
      data: './spinner',
    },
  ];

  modalSearch: NwbModalSearchComponent;

  constructor(private router: Router, private modalSearchService: NwbModalSearchService) {

    this.modalSearch = this.modalSearchService.create({
      records: this.records1.concat(this.records2),
      keyCodes: [{
        specialKey: 'cmd',
        key: 'k'
      }, {
        specialKey: 'ctrl',
        key: 'e'
      }],
      customSearchFn: (value: string) => this.searchFromRecords(value),
      inputPlaceholder: 'Navigate to...'
    });


    this.modalSearch.selectedValue$
      .subscribe((value: NwbFoundRow) => {
        this.router.navigate([value.data]);
      });
  }

  openModalSearch() {
    this.modalSearch.open();
  }

  searchFromRecords(searchValue: string): Observable<NwbFoundRow[]> {

    return Observable.create((observer: any) => {

      let foundRows1 = this.modalSearch.searchAllWordsInFoundRows(searchValue, this.records1);
      if (foundRows1.length) {
        foundRows1.unshift({
          text: '<strong>First Components Group</strong>',
          isSelectable: false
        });
      }

      let foundRows2 = this.modalSearch.searchAllWordsInFoundRows(searchValue, this.records2);
      if (foundRows2.length) {
        foundRows2.unshift({
          text: '<strong>Second Components Group</strong>',
          isSelectable: false
        });
      }

      setTimeout(() => {
        observer.next(foundRows1.concat(foundRows2));
        observer.complete();
      }, 500);

    });


  }
}
