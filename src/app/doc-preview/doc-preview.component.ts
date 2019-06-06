import { Component, Input } from '@angular/core';

@Component({
  selector: 'nwb-doc-preview',
  templateUrl: './doc-preview.component.html',
  styleUrls: ['./doc-preview.component.scss']
})
export class DocPreviewComponent {
  @Input()
  content: string;
  @Input()
  revertSize = false;
}
