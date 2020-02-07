# NG Wizi Bulma

[![npm](https://img.shields.io/npm/v/@wizishop/ng-wizi-bulma.svg)](https://www.npmjs.com/package/@wizishop/ng-wizi-bulma)
[![npm](https://img.shields.io/npm/dm/@wizishop/ng-wizi-bulma.svg)](https://www.npmjs.com/package/@wizishop/ng-wizi-bulma)

[Bulma](http://bulma.io/) components for Angular 9+

The library uses [ng-packagr](https://github.com/dherges/ng-packagr) to transpile into the Angular Package Format

## Demo

Try out the [demo](https://ng-wizi-bulma.firebaseapp.com/)

## Install

Run:

```
npm i -S @wizishop/ng-wizi-bulma bulma bulma-extensions @angular/cdk
```

Import bulma (and needed extensions) scss into your main scss file:

```
@import '~bulma';
@import '~bulma-extensions/bulma-switch/src/sass/index';
@import '~bulma-extensions/bulma-tooltip/src/sass/index';
@import '~bulma-extensions/bulma-calendar/src/sass/index';
```

After Bulma, import ng-wizi-bulma scss into your main scss file allowing you to custom all variable from bulma:

```
@import '~@wizishop/ng-wizi-bulma/ng-wizi-bulma';
```

Load the Fontawesome icon font in your index.html.

```
 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
```

Import the required modules `BrowserAnimationsModule` and `FormsModule` into your app module, then
import either all Nwb modules with `NwbAllModule` or only the module you want to use in your application for example `NwbDialogModule

```
import {ApplicationRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {NwbAllModule} from '@wizishop/ng-wizi-bulma';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NwbAllModule,
  ],
  declarations: [],
  providers: [],
  entryComponents: [],
})
export class AppModule {

}
```

## How to use it

If you want to see how components work, just see the demo file : `src/demo-app/demo-app/demo-app.ts`
