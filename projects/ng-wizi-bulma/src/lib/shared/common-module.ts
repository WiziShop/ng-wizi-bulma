import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OVERLAY_CONTAINER_PROVIDER } from './overlay/overlay-container';
import { DOM_SERVICE_PROVIDER } from './dom/dom.service';
import { NwbDebounceDirective } from './directives/debounce/debounce.directive';
import { NwbToolTipDirective } from './directives/tooltip/tooltip.directive';
import { NwbSpinnerComponent } from './components/spinner/spinner.component';
import { NwbFilterRoutingBuilder } from './services/filter-routing/filter-routing-group.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
    imports: [CommonModule, FormsModule],
    providers: [OVERLAY_CONTAINER_PROVIDER, DOM_SERVICE_PROVIDER, NwbFilterRoutingBuilder],
    declarations: [NwbSpinnerComponent, NwbDebounceDirective, NwbToolTipDirective, SafeHtmlPipe],
    exports: [NwbSpinnerComponent, NwbDebounceDirective, NwbToolTipDirective, SafeHtmlPipe]
})
export class NwbCommonModule {}
