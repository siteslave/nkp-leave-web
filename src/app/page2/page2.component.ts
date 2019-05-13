import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styles: []
})
export class Page2Component implements OnInit {

  name: string;
  version: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
      });
  }

  ngOnInit() {
  }

}
