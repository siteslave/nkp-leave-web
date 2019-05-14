import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit {

  @ViewChild('content') private content;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // save
    }, (reason) => {
      // cancel
    });
  }

}
