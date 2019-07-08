import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-setting',
  templateUrl: './leave-setting.component.html',
  styles: []
})
export class LeaveSettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showNotify() {
    setTimeout(() => {
      let myNotification = new Notification(
        "ทดสอบ",
        {
          body: 'Lorem Ipsum Dolor Sit Amet'
        });
    }, 3000)
  }
}
