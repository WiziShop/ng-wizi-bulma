import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NwbAlertService } from './alert.service';
import { NwbAlertComponent } from './alert.component';
import { NwbCommonModule } from '../shared/common-module';

@NgModule({
    imports: [CommonModule, NwbCommonModule],
    providers: [NwbAlertService],
    declarations: [NwbAlertComponent],
    exports: [NwbAlertComponent]
})
export class NwbAlertModule {}
