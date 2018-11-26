import { WorktimeTypeEnum } from './worktime-type.enum';

export interface WorktimeModel {
  timestamp: string;
  type: WorktimeTypeEnum;
  uid: string;
}
