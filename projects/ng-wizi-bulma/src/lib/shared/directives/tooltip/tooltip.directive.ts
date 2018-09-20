import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[nwbToolTip]'
})
export class NwbToolTipDirective {
  @Input()
  set nwbToolTip(value) {
    this.el.nativeElement.setAttribute('data-tooltip', value);
  }

  @Input()
  set nwbToolTipPosition(value: 'left' | 'right' | 'top' | 'bottom') {
    this.el.nativeElement.classList.remove('is-tooltip-top');
    this.el.nativeElement.classList.remove('is-tooltip-left');
    this.el.nativeElement.classList.remove('is-tooltip-right');
    this.el.nativeElement.classList.remove('is-tooltip-bottom');

    this.el.nativeElement.classList.add('is-tooltip-' + value);
  }

  @Input()
  set nwbToolTipIsMultiline(value: boolean) {
    if (value) {
      this.el.nativeElement.classList.add('is-tooltip-multiline');
    } else {
      this.el.nativeElement.classList.remove('is-tooltip-multiline');
    }
  }

  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add('tooltip');
  }
}
