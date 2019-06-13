import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

export class MomentDateFormatter extends NgbDateParserFormatter {

  readonly DT_FORMAT = 'D MMM YYYY';

  parse(value: string): NgbDateStruct {
    if (value) {
      value = value.trim();
      let mdt = moment(value, this.DT_FORMAT)
    }
    return null;
  }
  format(date: NgbDateStruct): string {
    if (!date) return '';
    let mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid()) return '';
    var thaiDate = `${mdt.locale('th').format('D MMM')} ${mdt.get('year') + 543}`;
    return thaiDate;
  }
}