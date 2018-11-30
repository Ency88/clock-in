import { TimeRecord } from './time.record.model';
export interface Attendance {
  day: string;
  date: Date;
  timeRecords: TimeRecord[];
}
