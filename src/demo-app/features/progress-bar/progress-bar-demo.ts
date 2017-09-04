import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  providers: [],
  templateUrl: './progress-bar-demo.html',
})
export class ProgressBarDemo {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
}

