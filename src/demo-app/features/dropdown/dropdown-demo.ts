import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  providers: [],
  templateUrl: './dropdown-demo.html',
})
export class DropdownDemo {

  gaming = 'nes';

  constructor() {

  }


  modelChange(event: any) {
    console.log('modelChange', event);
  }

  nesHasBeenSelected(event: any) {
    console.log('nesHasBeenSelected', event);
  }
}

