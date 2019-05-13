import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styles: []
})
export class Page3Component implements OnInit {

  name: string;
  version: string;

  constructor(private route: ActivatedRoute) {
    const params = this.route.snapshot.params;
    this.name = params.name;
    this.version = params.version;
    //
    console.log(params.name);
  }

  ngOnInit() {
  }

}
