import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'thaiDate'
})
export class ThaiDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (moment(value).isValid()) {
      const year = moment(value).get('year') + 543;
      return `${moment(value).locale('th').format('D MMM ')} ${year}`;
    } else {
      return '-';
    }
  }

}
