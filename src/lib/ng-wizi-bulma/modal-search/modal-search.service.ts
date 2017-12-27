import {Injectable, Injector} from '@angular/core';
import {DomService} from '../shared/dom/dom.service';
import {PortalInjector} from '../shared/portal/portal-injector';
import {extendObject} from '../shared/util/object-extend';
import {NwbModalSearchComponent} from './modal-search.component';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NwbModalSearchService {

  constructor(private domService: DomService, private injector: Injector) {

  }

  create(config: NwbModalSearchConfig): NwbModalSearchComponent {

    const componentRef = this.getComponentRef(config);

    return componentRef.instance;
  }


  private getComponentRef(config: NwbModalSearchConfig) {
    const injectionTokens = new WeakMap();

    injectionTokens.set(NwbModalSearchComponent, NwbModalSearchComponent);

    let injector = new PortalInjector(this.injector, injectionTokens);

    const componentRef = this.domService.attachComponentPortal(NwbModalSearchComponent, injector);

    componentRef.instance.config = extendObject(new NwbModalSearchConfig(), config);

    return componentRef;
  }
}


export class NwbModalSearchConfig {

  /** keys combination to open the modal **/
  keyCodes?: { specialKey: 'cmd' | 'ctrl' | 'alt' | 'shift' | 'windows' | null; key: string }[] = [{
    specialKey: 'cmd',
    key: 'k'
  }, {
    specialKey: 'ctrl',
    key: 'k'
  }];

  /** basic string array with all the values to search to **/
  records?: NwbFoundRow[];

  /** Custom method to filter the results you want to display **/
  customSearchFn?: (value: string) => NwbFoundRow[] | Observable<NwbFoundRow[]>;

  /** search input place holder **/
  inputPlaceholder?: string = 'Jump to...';

}

export interface NwbFoundRow {
  text: string;
  isSelectable?: boolean;
  data?: any;
}
