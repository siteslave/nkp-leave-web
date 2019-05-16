import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-new-leave',
  templateUrl: './modal-new-leave.component.html',
  styles: []
})
export class ModalNewLeaveComponent implements OnInit {

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
