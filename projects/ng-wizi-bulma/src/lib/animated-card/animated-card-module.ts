import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NwbCommonModule } from '../shared/common-module';
import { NwbAnimatedCardComponent } from './animated-card.component';

@NgModule({
    imports: [CommonModule, NwbCommonModule],
    providers: [],
    declarations: [NwbAnimatedCardComponent],
    exports: [NwbAnimatedCardComponent]
})
export class NwbAnimatedCardModule {}
