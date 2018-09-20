import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'demo-tabs',
  templateUrl: './tabs-demo.component.html',
  styleUrls: []
})
export class TabsDemo implements OnInit {
  tabBasicIndex = 2;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['basicTabIndex']) {
        this.tabBasicIndex = +params['basicTabIndex'];
      }
    });
  }

  tabBasicIndexChange(index) {
    console.log('tabBasicIndexChange', index);
    this.router.navigate(['/tabs/' + index]);
  }
}
