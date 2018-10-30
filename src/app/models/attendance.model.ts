import {TimeRecord} from './time.record.model';

export class Attendance {
  public day: string;
  public date: Date;
  public timeRecords: TimeRecord[];

  constructor(day: string, date: Date, timeRecords: TimeRecord[]) {
    this.day = day;
    this.date = date;
    this.timeRecords = timeRecords;
  }
}
