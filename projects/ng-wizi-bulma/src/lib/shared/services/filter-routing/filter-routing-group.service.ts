import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NwbFilter, NwbFilterGroup } from './model';

const FILTER_GROUP_PARAM_PREFIX = 'fg_';

@Injectable()
export class NwbFilterRoutingBuilder {
  private groupCounter = 0;

  private filterGroups = new Map<string, NwbFilterGroup>();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.queryParamsChange(params);
    });
  }

  private queryParamsChange(params: Params) {
    const groupChanges = new Map<string, { [key: string]: any }>();

    Object.keys(params).forEach(key => {
      const parsedKeys = this.getParsedKey(key);

      const values = groupChanges.has(parsedKeys.filterGroupName) ? groupChanges.get(parsedKeys.filterGroupName) : {};

      values[parsedKeys.filterKey] = params[key];

      groupChanges.set(parsedKeys.filterGroupName, values);
    });

    this.filterGroups.forEach(filterGroup => {
      const defaultValues = {};

      filterGroup.getFilters().forEach(filter => {
        defaultValues[filter.key] = filter.defaultValue;
      });

      const newValues = groupChanges.has(filterGroup.name) ? groupChanges.get(filterGroup.name) : {};

      filterGroup.setValues(Object.assign(defaultValues, newValues));
    });
  }

  group(group: { [key: string]: any }, groupName?: string) {
    if (!groupName) {
      groupName = `${FILTER_GROUP_PARAM_PREFIX}${this.groupCounter++}`;
    }
    const filterGroup = new NwbFilterGroup(groupName, group);

    this.filterGroups.set(filterGroup.name, filterGroup);

    filterGroup.valuesChange$.subscribe(filters => {
      this.updateRouting(filterGroup.name, filters);
    });

    // Check values from query parameters
    this.route.queryParams
      .subscribe(params => {
        this.queryParamsChange(params);
      })
      .unsubscribe();

    return filterGroup;
  }

  private addFilterGroupNameToQueryParamKey(filterGroupName: string, key: string) {
    return filterGroupName + ':' + key;
  }

  private getParsedKey(encodedKey: string) {
    const value = encodedKey.split(':');
    const filterGroupName = value[0];
    const filterKey = value[1];

    return { filterGroupName, filterKey };
  }

  private updateRouting(filterGroupName: string, filters: NwbFilter[]) {
    this.route.queryParamMap
      .subscribe(paramsMap => {
        const params = {};
        paramsMap.keys.forEach(key => {
          params[key] = paramsMap.get(key);
        });
        const queryParams = Object.assign({}, params);

        filters.forEach(filter => {
          const paramKey = this.addFilterGroupNameToQueryParamKey(filterGroupName, filter.key);

          if (!filter.isDefaultValue()) {
            let value = filter.value;

            if (value instanceof Date) {
              value = value.toISOString();
            }

            queryParams[paramKey] = value;
          } else {
            if (queryParams.hasOwnProperty(paramKey)) {
              delete queryParams[paramKey];
            }
          }
        });

        this.router.navigate([], {
          queryParams: queryParams,
          relativeTo: this.route
        });
      })
      .unsubscribe();
  }

  remove(filterGroup: NwbFilterGroup) {
    if (this.filterGroups.has(filterGroup.name)) {
      this.filterGroups.delete(filterGroup.name);
    }
  }
}
