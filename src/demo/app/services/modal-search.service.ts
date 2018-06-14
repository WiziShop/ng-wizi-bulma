import {Injectable} from '@angular/core';
import {NwbFoundRow, NwbModalSearchComponent, NwbModalSearchService} from 'ng-wizi-bulma';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class ModalSearchService {
  private records1: NwbFoundRow[] = [
    {
      text: 'First Components Group',
      isSelectable: false,
      children: [
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
      ]
    }
  ];

  private records2: NwbFoundRow[] = [
    {
      text: 'Second Components Group',
      isSelectable: false,
      children: [
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
        }
      ]
    },
    {
      text: 'Tabs',
      data: './tabs',
    }, {
      text: 'Switch',
      data: './switch',
    }, {
      text: 'Tooltip',
      data: './tooltip',
    }
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
      inputPlaceholder: 'Navigate to...',
      hasFooter: true,
    });

    this.modalSearch.selectedValue$
      .subscribe((value: NwbFoundRow) => {
        this.router.navigate([value.data]);
      });

    this.modalSearch.afterViewInit$
      .subscribe(() => {
        this.modalSearch.footer.nativeElement.innerHTML = `
          <div class="columns" style="width: 100%">
            <div class="column">
              <span class="icon">
              <span class="fa fa-arrow-up"></span>
          </span>
              <span class="icon">
              <span class="fa fa-arrow-down"></span>
          </span>
          to navigate
            </div>
            <div class="column">
             <strong>enter</strong> to select
            </div>
            <div class="column">
              <strong>esc</strong> to dismiss
            </div>
          </div>
        `;
      });

  }


  searchFromRecords(searchValue: string): Observable<NwbFoundRow[]> {

    return Observable.create((observer: any) => {

      const foundRows1 = this.modalSearch.searchAllWordsInFoundRows(searchValue, this.records1);

      const foundRows2 = this.modalSearch.searchAllWordsInFoundRows(searchValue, this.records2);

      setTimeout(() => {
        observer.next(foundRows1.concat(foundRows2));
        observer.complete();
      }, 500);

    });


  }
}
