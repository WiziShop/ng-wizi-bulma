import {Component} from '@angular/core';
import {NwbPageEvent} from 'ng-wizi-bulma';

@Component({
  providers: [],
  templateUrl: './paginator-demo.html',
})
export class PaginatorDemo {

  length = 10000;
  pageSize = 25;
  pageSizeOptions = [5, 10, 25, 100];


  constructor() {

  }


  pageChange(pageEvent: NwbPageEvent) {
    console.log('Page change', pageEvent);
  }

}

