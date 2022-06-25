import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NwbPaginatorComponent } from './paginator.component';
import { NwbPaginatorIntl } from './paginator-intl';
import { NwbCommonModule } from '../shared/common-module';

@NgModule({
    imports: [CommonModule, NwbCommonModule],
    providers: [NwbPaginatorIntl],
    declarations: [NwbPaginatorComponent],
    exports: [NwbPaginatorComponent]
})
export class NwbPaginatorModule {}
