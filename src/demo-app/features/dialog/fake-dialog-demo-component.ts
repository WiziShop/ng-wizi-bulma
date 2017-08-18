import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  moduleId: module.id,
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

  ngOnInit() {
    console.log('FakeDialogDemoComponent');

    console.log('myInput', this.myInput);
  }


}
