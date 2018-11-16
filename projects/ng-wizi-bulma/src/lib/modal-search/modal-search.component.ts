import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { NwbFoundRow, NwbModalSearchConfig } from './modal-search.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'nwb-modal-search',
  templateUrl: './modal-search.component.html',
  host: {
    class: 'nwb-modal-search'
  },
  encapsulation: ViewEncapsulation.None
})
export class NwbModalSearchComponent implements AfterViewInit {
  selectedValue$ = new Subject<NwbFoundRow>();

  afterViewInit$ = new EventEmitter();

  selectedFoundRow = 0;

  config: NwbModalSearchConfig;

  isActive = false;

  foundRows: NwbFlattenFoundRow[] = [];

  isSearching = false;

  searchString = '';

  enabled = true;

  private searchSubscription: Subscription;

  @ViewChild('header')
  header: ElementRef;
  @ViewChild('inputSearch')
  inputSearch: ElementRef;
  @ViewChild('footer')
  footer: ElementRef;

  private _isMouseNavigating = false;

  constructor() {}

  ngAfterViewInit() {
    this.afterViewInit$.emit();
  }

  open() {
    if (!this.enabled) {
      return;
    }

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
      // Esc
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  documentOnKeyDown(ev: KeyboardEvent) {
    let somethingHappened = false;

    // Avoid to select a row with the mouse over event while navigating with keyboard
    this._isMouseNavigating = false;

    somethingHappened = this.openFromKeyboard(ev) || somethingHappened;

    somethingHappened = this.keyboardNavigate(ev) || somethingHappened;

    somethingHappened = this.onEnter(ev) || somethingHappened;

    if (somethingHappened) {
      ev.preventDefault();
    }
  }

  mouseMove() {
    this._isMouseNavigating = true;
  }

  mouseOver(index: number) {
    if (this._isMouseNavigating) {
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
    return null;
  }

  private isSubscribedKey(ev: KeyboardEvent) {
    return (
      this.config.keyCodes.filter(keyCode => {
        const specialKey = this.getSpecialKey(ev);
        return specialKey === keyCode.specialKey && ev.key === keyCode.key;
      }).length > 0
    );
  }

  private openFromKeyboard(ev: KeyboardEvent) {
    if (!this.isActive && this.config && this.isSubscribedKey(ev)) {
      this.open();

      return true;
    }

    return false;
  }

  private keyboardNavigate(ev: KeyboardEvent) {
    const keyCode = ev.keyCode;

    if (!this.isActive) {
      return false;
    }

    let somethingHappened = false;

    if (keyCode === 40 || keyCode === 9) {
      // Up or TAB

      do {
        this.selectedFoundRow++;
        if (this.selectedFoundRow >= this.foundRows.length) {
          this.selectedFoundRow = 0;
        }
      } while (!this.isSelectedFoundRowSelectable());

      somethingHappened = true;
    } else if (keyCode === 38) {
      // Down

      do {
        this.selectedFoundRow--;
        if (this.selectedFoundRow < 0) {
          this.selectedFoundRow = this.foundRows.length - 1;
        }
      } while (!this.isSelectedFoundRowSelectable());

      somethingHappened = true;
    }

    if (somethingHappened) {
      // Make the .nwb-modal-search-found-rows with overflow scrolls
      const htmlRow = <HTMLAnchorElement>document.querySelector(`a.nwb-modal-search-row[tabindex="${this.selectedFoundRow}"`);

      if (htmlRow) {
        htmlRow.focus();
        this.focusInputSearch();
      }
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

    if (!this.isActive) {
      return false;
    }

    if (keyCode === 13) {
      // Enter
      this.selectValue();
    }
  }

  private isSelectedFoundRowSelectable() {
    return this.foundRows.length > 0 && this.foundRows[this.selectedFoundRow] && this.foundRows[this.selectedFoundRow].isSelectable;
  }

  private selectFirstSelectableRow() {
    if (this.foundRows.length === 0) {
      return;
    }

    this.selectedFoundRow = 0;
    while (!this.isSelectedFoundRowSelectable()) {
      this.selectedFoundRow++;
      if (this.selectedFoundRow >= this.foundRows.length) {
        this.selectedFoundRow = 0;
      }
    }
  }

  selectValue() {
    if (this.foundRows.length > 0 && this.foundRows[this.selectedFoundRow]) {
      this.selectedValue$.next(this.foundRows[this.selectedFoundRow]);
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
      this.foundRows = this.flattenNwbFoundRow(obs);
      this.selectFirstSelectableRow();
    } else if (obs) {
      this.isSearching = true;

      this.searchSubscription = obs.pipe(finalize(() => (this.isSearching = false))).subscribe(foundRows => {
        this.foundRows = this.flattenNwbFoundRow(foundRows);
        this.selectFirstSelectableRow();
      });
    }
  }

  private flattenNwbFoundRow(rows: NwbFoundRow[]) {
    let foundRows: NwbFlattenFoundRow[] = [];

    let hasSelectableRow = false;

    rows.forEach(row => {
      const foundRow: NwbFlattenFoundRow = {
        text: row.text,
        isSelectable: row.hasOwnProperty('isSelectable') ? row.isSelectable : true,
        isChild: false,
        data: row.data || null,
        isParent: row.children && row.children.length > 0
      };

      if (foundRow.isSelectable) {
        hasSelectableRow = true;
      }
      foundRows.push(foundRow);

      if (row.children) {
        row.children.forEach(child => {
          const foundRowChild: NwbFlattenFoundRow = {
            text: child.text,
            isSelectable: child.hasOwnProperty('isSelectable') ? child.isSelectable : true,
            isChild: true,
            data: child.data || null,
            isParent: false
          };

          if (foundRowChild.isSelectable) {
            hasSelectableRow = true;
          }
          foundRows.push(foundRowChild);
        });
      }
    });

    if (!hasSelectableRow && foundRows.length > 0) {
      console.error('No selectable rows! empty found rows to avoid infinite loop');
      foundRows = [];
    }

    return foundRows;
  }

  private searchFromRecords(searchValue: string): Observable<NwbFoundRow[]> {
    return Observable.create((observer: any) => {
      const foundRows = this.searchAllWordsInFoundRows(searchValue, this.config.records);

      observer.next(foundRows);
      observer.complete();
    });
  }

  searchAllWordsInFoundRows(searchValue: string, rows: NwbFoundRow[]): NwbFoundRow[] {
    const regExStr = searchValue
      .split(' ')
      .map(word => {
        return `(?=.*${word})`;
      })
      .join('');

    const regEx = new RegExp(regExStr, 'ig');

    const foundRows: NwbFoundRow[] = [];

    rows.forEach(record => {
      let children = [];
      if (record.children) {
        children = record.children.filter(childRecord => childRecord.text.search(regEx) !== -1);
      }

      if (children.length || record.text.search(regEx) !== -1) {
        const row = Object.assign({}, record);
        row.children = children;
        foundRows.push(row);
      }
    });

    return foundRows;
  }
}

export interface NwbFlattenFoundRow {
  text: string;
  isSelectable: boolean;
  data?: any;
  isChild: boolean;
  isParent: boolean;
}
