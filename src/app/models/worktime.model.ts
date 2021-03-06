import { WorktimeTypeEnum } from './worktime-type.enum';

export interface WorktimeModel {
  timestamp: Date;
  type: WorktimeTypeEnum;
  uid: string;
  latitude: number;
  longitude: number;
  docId: string;
}
