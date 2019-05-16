import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalNewLeaveComponent } from '../../shared/modal-new-leave/modal-new-leave.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  @ViewChild('mdlNewLeave') private mdlNewLeave: ModalNewLeaveComponent;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.mdlNewLeave.open();
  }

}
