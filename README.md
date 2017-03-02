#NG Wizi Bulma

This repo contains Angular 2+ components build using [Bulma css](http://bulma.io/)

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

Import the module into your app module: 

````

import {ApplicationRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {NwbModule} from 'ng-wizi-bulma';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NwbModule,
  ],
  declarations: [],
  providers: [],
  entryComponents: [],
})
export class AppModule {
 
}

````

3. add the `nwb-app-root` tag into you app.component.html : 
```
<nwb-app-root></nwb-app-root>
```


## How to use it

If you want to see how components work, just see the demo file : `src/demo-app/demo-app/demo-app.ts`
