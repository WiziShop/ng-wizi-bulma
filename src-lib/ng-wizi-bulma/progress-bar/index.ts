/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NwbProgressBarComponent} from './progress-bar.component';


@NgModule({
  imports: [CommonModule],
  exports: [NwbProgressBarComponent],
  declarations: [NwbProgressBarComponent],
})
export class NwbProgressBarModule {
}


export * from './progress-bar.component';
