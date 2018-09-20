import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  NwbFilter,
  NwbFilterGroup,
  NwbFilterRoutingBuilder,
  NwbPageEvent,
  NwbPaginatorComponent,
  NwbSort,
  Sort
} from '@wizishop/ng-wizi-bulma';

@Component({
  providers: [],
  templateUrl: './table-demo.html',
  styleUrls: ['./table-demo.scss']
})
export class TableDemo implements OnInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  data: GithubIssue[] = [];

  @ViewChild(NwbPaginatorComponent)
  paginator;
  @ViewChild(NwbSort)
  sort;

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  sortActive = 'title';
  sortStart = 'asc';

  dataTableFilters = {
    sort: this.sortActive,
    order: this.sortStart,
    pageIndex: 0,
    q: 'repo:angular/angular'
  };

  filterGroup: NwbFilterGroup;

  constructor(private http: HttpClient, private filterRoutingBuilder: NwbFilterRoutingBuilder) {}

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    this.filterGroup = this.filterRoutingBuilder.group(this.dataTableFilters, 'datatable');

    this.filterGroup.valuesChange$.subscribe(filters => {
      this.updateFilters(filters);

      this.fetchData();
    });

    this.updateFilters(this.filterGroup.getFilters());

    this.fetchData();

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe((sort: Sort) => {
      this.filterGroup.setValues({
        pageIndex: 0,
        sort: sort.active,
        order: sort.direction
      });
    });

    this.paginator.page.subscribe((page: NwbPageEvent) => {
      this.filterGroup.set('pageIndex', page.pageIndex);
    });
  }

  private updateFilters(filters: NwbFilter[]) {
    filters.forEach(filter => {
      this.dataTableFilters[filter.key] = filter.value;
    });
  }

  private fetchData() {
    this.isLoadingResults = true;
    this.exampleDatabase!.getRepoIssues(
      this.dataTableFilters.q,
      this.dataTableFilters.sort,
      this.dataTableFilters.order,
      this.dataTableFilters.pageIndex
    )
      .pipe(
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      )
      .subscribe(data => (this.data = data));
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(q: string, sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=${q}&sort=${sort}&order=${order}&page=${+page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}
