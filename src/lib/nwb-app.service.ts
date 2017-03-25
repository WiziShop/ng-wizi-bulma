import {Injectable} from '@angular/core';
import {NwbRootComponent} from './nwb-root/nwb-root.component';

@Injectable()
export class NwbAppService {
  private nwbRootCpm: NwbRootComponent;

  getNwbRootComponent(): NwbRootComponent {
    if (!this.nwbRootCpm) {
      throw 'NwbRootComponent has not been initialized yet.';
    }

    return this.nwbRootCpm;
  }

  setNwbRootComponent(component: NwbRootComponent) {
    this.nwbRootCpm = component;
  }
}
