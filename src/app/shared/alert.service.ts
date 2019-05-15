import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  success(message: string = 'ดำเนินการเรียบร้อย') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: 'success',
      title: message
    });
  }

  error(message: string = 'เกิดข้อผิดพลาด') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: 'error',
      title: message
    });
  }

  async confirm(title: string = 'กรุณายืนยัน', text: string = 'ต้องการดำเนินการใช่หรือไม่?') {
    const confirm = await Swal.fire({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    });

    if (confirm.value) {
      return true;
    } else {
      return false;
    }
  }

  warning(message: string = 'กรุณาตรวจสอบ') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: 'warning',
      title: message
    });
  }
}
