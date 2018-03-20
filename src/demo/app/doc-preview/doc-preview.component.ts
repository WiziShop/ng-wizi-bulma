import {Compiler, Component, Input, NgModule, OnInit} from '@angular/core';
import {NwbModule} from '../../../lib/ng-wizi-bulma/nwb-module';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'nwb-doc-preview',
  templateUrl: './doc-preview.component.html',
  styleUrls: ['./doc-preview.component.scss'],

})
export class DocPreviewComponent implements OnInit {
  @Input() content: string;

  dynamicComponent: any;
  dynamicModule: any;

  constructor(private _compiler: Compiler) {

  }

  ngOnInit() {
    this.build();
  }


  build() {
    this.dynamicComponent = this.createDynamicComponent(this.content);
    this.dynamicModule = this._compiler.compileModuleSync(this.createDynamicModule(this.dynamicComponent));
  }

  createDynamicModule(componentType: any) {
    @NgModule({
      imports: [
        NwbModule,
        FormsModule,
      ],
      declarations: [
        componentType
      ],
      entryComponents: [componentType]
    })
    class RuntimeModule {
    }

    return RuntimeModule;
  }

  createDynamicComponent(template: string) {
    @Component({
      selector: 'dynamic-component',
      template: template ? template : '<div></div>'
    })
    class DynamicComponent {
      constructor() {
      }
    }

    return DynamicComponent;
  }
}
