import { Component } from '@angular/core';

@Component({
  providers: [],
  templateUrl: './tooltip-demo.html'
})
export class TooltipDemo {
  sample1 = `<button class="button" nwbToolTip="My tooltip" nwbToolTipPosition="bottom">Bottom</button>`;
  sample2 = `<button class="button is-primary" nwbToolTip="My tooltip" nwbToolTipPosition="left">Left</button>`;
  sample3 = `<button class="button is-primary is-tooltip-danger" nwbToolTip="Tooltip with a long Text. So we use is-tooltip-multiline modifier to force multiline display." [nwbToolTipIsMultiline]="true">Multiline Tooltip</button>`;
}
