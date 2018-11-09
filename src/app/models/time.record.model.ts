import { TimeRecordEnum } from './time.record.enum';

export interface TimeRecord {
  from: Date;
  to: Date;
  type: TimeRecordEnum;
}
