import {Component, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {NwbFoundRow, NwbModalSearchConfig} from './modal-search.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'nwb-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss'],
  host: {
    'class': 'nwb-modal-search',
  },
  encapsulation: ViewEncapsulation.None
})
export class NwbModalSearchComponent {

  selectedValue$ = new Subject<NwbFoundRow>();

  selectedFoundRow = 0;

  config: NwbModalSearchConfig;

  isActive = false;

  foundRows: NwbFoundRow[] = [];

  isSearching = false;

  searchString = '';

  private searchSubscription: Subscription;

  @ViewChild('inputSearch') inputSearch: ElementRef;

  private _isNavigating = false;
  private _isNavigatingTimerIndex;

  constructor() {

  }


  open() {

    this._reset();

    this.focusInputSearch();

    this.isActive = true;

    this.searching('');

  }

  close() {
    this.isActive = false;

    this._reset();
  }


  private _reset() {
    this.foundRows = [];
    this.selectedFoundRow = 0;
    this.searchString = '';

    setTimeout(() => {
      this.inputSearch.nativeElement.value = '';
    });

  }


  inputOnKeyDown(ev: KeyboardEvent) {

    if (ev.keyCode === 27) {
      this.close();
    }
  }


  @HostListener('document:keydown', ['$event'])
  documentOnKeyDown(ev: KeyboardEvent) {
    let somethingHappened = false;

    somethingHappened = this.openFromKeyboard(ev) || somethingHappened;

    somethingHappened = this.keyboardNavigate(ev) || somethingHappened;

    somethingHappened = this.onEnter(ev) || somethingHappened;

    if (somethingHappened) {
      ev.preventDefault();
    }
  }

  mouseOver(index: number) {
    if (!this._isNavigating) {
      this.selectedFoundRow = index;
    }
  }

  private getSpecialKey(ev: KeyboardEvent) {
    if (ev.metaKey) {
      return navigator.platform.match('Mac') ? 'cmd' : 'windows';
    } else if (ev.ctrlKey) {
      return 'ctrl';
    } else if (ev.shiftKey) {
      return 'shift';
    } else if (ev.altKey) {
      return 'alt';
    }
  }

  private isSubscribedKey(ev: KeyboardEvent) {
    return this.config.keyCodes
      .filter(keyCode => {
        const specialKey = this.getSpecialKey(ev);
        return specialKey === keyCode.specialKey && ev.key === keyCode.key;
      }).length > 0;

  }

  private openFromKeyboard(ev: KeyboardEvent) {
    if (this.config && this.isSubscribedKey(ev)) {
      this.open();

      return true;
    }

    return false;
  }

  private keyboardNavigate(ev: KeyboardEvent) {
    const keyCode = ev.keyCode;

    let somethingHappened = false;

    if (keyCode === 40 || keyCode === 9) {

      do {
        this.selectedFoundRow++;
        if (this.selectedFoundRow >= this.foundRows.length) {
          this.selectedFoundRow = 0;
        }

      } while (!this.isSelectable(this.getSelectedFoundRow()));


      somethingHappened = true;

    } else if (keyCode === 38) {

      do {
        this.selectedFoundRow--;
        if (this.selectedFoundRow < 0) {
          this.selectedFoundRow = this.foundRows.length - 1;
        }

      } while (!this.isSelectable(this.getSelectedFoundRow()));


      somethingHappened = true;
    }

    if (somethingHappened) {
      // Make the .nwb-modal-search-found-rows with overflow scrolls
      const htmlRow = <HTMLAnchorElement>document
        .querySelector(`a.nwb-modal-search-row[tabindex="${this.selectedFoundRow}"`);

      if (htmlRow) {
        htmlRow.focus();
        this.focusInputSearch();
      }


      // Avoid to select a row with the mouse over event while navigating with keyboard
      this._isNavigating = true;

      if (this._isNavigatingTimerIndex) {
        clearTimeout(this._isNavigatingTimerIndex);
      }

      this._isNavigatingTimerIndex = setTimeout(() => {
        this._isNavigating = false;
      }, 200);
    }

    return somethingHappened;
  }

  focusInputSearch() {
    setTimeout(() => {
      this.inputSearch.nativeElement.focus();
    });
  }

  private onEnter(ev: KeyboardEvent) {
    const keyCode = ev.keyCode;

    if (keyCode === 13) {
      this.selectValue();
    }
  }

  private getSelectedFoundRow() {
    return this.foundRows[this.selectedFoundRow];
  }

  private selectFirstSelectableRow() {

    this.selectedFoundRow = 0;
    while (!this.isSelectable(this.getSelectedFoundRow())) {
      this.selectedFoundRow++;
      if (this.selectedFoundRow >= this.foundRows.length) {
        this.selectedFoundRow = 0;
      }

    }
  }

  isSelectable(row: NwbFoundRow): boolean {
    if (row && row.hasOwnProperty('isSelectable')) {
      return row.isSelectable;
    }
    return true;
  }

  selectValue() {
    const selectedFoundRow = this.getSelectedFoundRow();
    if (selectedFoundRow) {
      this.selectedValue$.next(selectedFoundRow);
      this.close();
    }
  }


  searching(searchString: string) {

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }


    let obs: NwbFoundRow[] | Observable<NwbFoundRow[]>;

    if (typeof this.config.customSearchFn === 'function') {
      obs = this.config.customSearchFn(searchString);
    } else if (this.config.records) {
      obs = this.searchFromRecords(searchString);
    }

    if (Array.isArray(obs)) {
      this.foundRows = obs;
      this.selectFirstSelectableRow();
    } else if (obs) {

      this.isSearching = true;

      this.searchSubscription = obs
        .pipe(finalize(() => this.isSearching = false))
        .subscribe(foundRows => {
          this.foundRows = foundRows;
          this.selectFirstSelectableRow();
        });
    }

  }

  private searchFromRecords(searchValue: string): Observable<NwbFoundRow[]> {
    return Observable.create((observer: any) => {

      const foundRows = this.searchAllWordsInFoundRows(searchValue, this.config.records);


      observer.next(foundRows);
      observer.complete();
    });


  }

  searchAllWordsInFoundRows(searchValue: string, rows: NwbFoundRow[]): NwbFoundRow[] {

    const regExStr = searchValue.split(' ')
      .map(word => {
        return `(?=.*${word})`;
      }).join('');

    const regEx = new RegExp(regExStr, 'ig');

    return rows
      .filter(record => {
        return record.text.search(regEx) !== -1;
      });
  }

}
