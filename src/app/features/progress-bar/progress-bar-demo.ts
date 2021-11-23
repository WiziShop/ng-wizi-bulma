import { Component } from '@angular/core';

@Component({
  providers: [],
  templateUrl: './progress-bar-demo.html'
})
export class ProgressBarDemo {
  color: 'primary' | 'info' | 'warning' | 'danger'  = 'primary';
  mode: 'indeterminate' | 'determinate' = 'indeterminate';
  value = 50;
}
