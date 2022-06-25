import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NwbEditInPlaceComponent } from './edit-in-place.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NwbCommonModule } from '../shared/common-module';

@NgModule({
    imports: [CommonModule, NwbCommonModule, FormsModule, ReactiveFormsModule],
    providers: [],
    declarations: [NwbEditInPlaceComponent],
    exports: [NwbEditInPlaceComponent]
})
export class NwbEditInPlaceModule {}
