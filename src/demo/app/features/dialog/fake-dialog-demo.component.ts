import {Component, ElementRef, EventEmitter, ViewChild} from '@angular/core';

@Component({
  providers: [],
  template: `
    <div class="field">
      <label class="label">Name</label>
      <p class="control">
        <textarea #myInput class="textarea" placeholder="Name"></textarea>
      </p>
      <label class="label">Address</label>
      <p class="control">
        <textarea class="textarea" placeholder="Address"></textarea>
      </p>
      <label class="label">Other</label>
      <p class="control">
        <textarea class="textarea" placeholder="Other"></textarea>
      </p>
    </div>
  `,
})
export class FakeDialogDemoComponent {

  @ViewChild('myInput') myInput: ElementRef;

  loading = new EventEmitter<boolean>();

  ngOnInit() {
    console.log('FakeDialogDemoComponent');

    console.log('myInput', this.myInput);

    setTimeout(() => this.loading.next(false), 3000);
  }


}
