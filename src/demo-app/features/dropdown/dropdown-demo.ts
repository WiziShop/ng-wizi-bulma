import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  providers: [],
  templateUrl: './dropdown-demo.html',
})
export class DropdownDemo {

  gaming = 'nes';

  isLoading = false;

  constructor() {

  }


  modelChange(event: any) {
    console.log('modelChange', event);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  nesHasBeenSelected(event: any) {
    console.log('nesHasBeenSelected', event);
  }
}

