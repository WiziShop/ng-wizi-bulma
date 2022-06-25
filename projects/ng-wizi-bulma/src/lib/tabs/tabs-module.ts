import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NwbTabComponent } from './tab.component';
import { NwbTabsComponent } from './tabs.component';
import { NwbCommonModule } from '../shared/common-module';

@NgModule({
    imports: [CommonModule, NwbCommonModule],
    providers: [],
    declarations: [NwbTabsComponent, NwbTabComponent],
    exports: [NwbTabsComponent, NwbTabComponent]
})
export class NwbTabsModule {}
