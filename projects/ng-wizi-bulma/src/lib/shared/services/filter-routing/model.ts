import {Subject} from 'rxjs/internal/Subject';

export class NwbFilterGroup {

  valuesChange$ = new Subject<NwbFilter[]>();

  private group = new Map<string, NwbFilter>();

  constructor(public name: string, group: { [key: string]: any; }) {

    Object.keys(group).forEach((key) => {

      const value = group[key];

      const filter = new NwbFilter(key, value, value);


      this.group.set(key, filter);
    });

  }


  set(key, value) {

    if (this._valueChange(key, value)) {
      this.emitChange();
    }
  }

  get(key) {
    if (!this.group.has(key)) {
      throw new Error(`FilterGroup: They key ${key} doesn't exist`);
    }

    return this.group.get(key).value;
  }

  setValues(values: { [key: string]: any }) {
    let valueHasChanged = false;
    Object.keys(values).forEach((key) => {
      if (this._valueChange(key, values[key])) {
        valueHasChanged = true;
      }
    });

    if (valueHasChanged) {
      this.emitChange();
    }
  }


  private _valueChange(key, value) {
    if (!this.group.has(key)) {
      throw new Error(`FilterGroup: They key ${key} doesn't exist`);
    }

    if (typeof value === 'string') {
      value = value.trim();
    }

    if (this.group.get(key).value != value) {
      this.group.get(key).value = value;
      return true;
    }
    return false;
  }

  private emitChange() {

    const filters: NwbFilter[] = [];
    this.group.forEach(filter => filters.push(filter));

    this.valuesChange$.next(filters);
  }

  getFilters() {
    const filters: NwbFilter[] = [];
    this.group.forEach(filter => filters.push(filter));

    return filters;
  }
}


export class NwbFilter {

  constructor(public key: string, public defaultValue: any, public value: any) {

  }


  isDefaultValue() {
    return this.defaultValue === this.value;
  }

}
