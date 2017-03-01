#NG Wizi Bulma

This repo contains Angular 2+ components build using [Bulma css](http://bulma.io/)

#Install

run 
```
npm i -S ng-wizi-bulma

```

Then import the module into your app module : 

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

Then add the `nwb-app-root` tag into you app.component.html : 
```
<nwb-app-root></nwb-app-root>

```

#Try it

If you want to see how components work, just see the demo file : `src/demo-app/demo-app/demo-app.ts`
