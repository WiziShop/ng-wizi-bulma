import { OnInit, ElementRef, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'div[nwbAnimatedCardClosed], div[nwbAnimatedCardOpened]',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class NwbAnimatedCardComponent implements OnInit {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.toggle('is-animate');
    if (this.elementRef.nativeElement.getAttribute('nwbAnimatedCardOpened') !== null) {
      this.elementRef.nativeElement.classList.toggle('is-active');
    }
  }

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('header').addEventListener('click', () => {
      this.elementRef.nativeElement.classList.toggle('is-active');
    });
  }
}
