import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nwb-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  host: {
    class: 'nwb-spinner'
  },
  encapsulation: ViewEncapsulation.None
})
export class NwbSpinnerComponent implements OnInit {
  @Input()
  color: string;

  private availableColors = ['#a2c739', '#dbdbdb', '#00d1b2', '#4baed0'];

  ngOnInit() {
    if (!this.color) {
      this.color = this.availableColors[
        Math.floor(Math.random() * this.availableColors.length)
      ];
    }
  }
}
