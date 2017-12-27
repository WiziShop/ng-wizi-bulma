# NG Wizi Bulma

[![npm](https://img.shields.io/npm/v/ng-wizi-bulma.svg)](https://www.npmjs.com/package/ng-wizi-bulma)
[![npm](https://img.shields.io/npm/dm/ng-wizi-bulma.svg)](https://www.npmjs.com/package/ng-wizi-bulma)

[Bulma](http://bulma.io/) components for Angular 5+

The library uses [ng-packagr](https://github.com/dherges/ng-packagr) to transpile into the Angular Package Format

## Demo

Try out the [demo](https://ng-wizi-bulma.firebaseapp.com/)

## Install

Run: 
```
npm i -S ng-wizi-bulma && npm i -S bulma
```

Import bulma css into your main css file:

```
@import '~bulma/bulma';
```

Load the Materials icon font in your index.html.

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Import the `NwbModule`, `BrowserAnimationsModule` and `FormsModule` into your app module: 

````

import {ApplicationRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {NwbModule} from 'ng-wizi-bulma';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NwbModule,
  ],
  declarations: [],
  providers: [],
  entryComponents: [],
})
export class AppModule {
 
}

````



## How to use it

If you want to see how components work, just see the demo file : `src/demo-app/demo-app/demo-app.ts`
