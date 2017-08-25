import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'nwb-spinner',
  template: `
    <span class="is-spinning"
          [style.borderColor]="color"
    ></span>
  `,
  styles: [`
    .is-spinning {
      animation: spinIt 500ms infinite linear;
      border: 2px solid white;
      border-radius: 290486px;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      content: "";
      display: block;
      height: 2rem;
      width: 2rem;
      left: 50%;
      margin-left: -8px;
      margin-top: -8px;
      top: 50%;
      position: relative !important;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    @keyframes spinIt {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }

  `],
})
export class NwbSpinnerComponent implements OnInit {

  @Input() color: string;


  private availableColors = ['#a2c739', '#dbdbdb', '#00d1b2', '#4baed0'];

  ngOnInit() {
    if (!this.color) {
      this.color = this.availableColors[Math.floor(Math.random() * this.availableColors.length)];
    }
  }

}

