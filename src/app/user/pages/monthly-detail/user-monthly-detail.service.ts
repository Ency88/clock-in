import { Injectable } from '@angular/core';
import { WorktimeModel } from '../../../models/worktime.model';

@Injectable()
export class UserMonthlyDetailService {
  private workTime: WorktimeModel;
  public worktimes: WorktimeModel[] = [];
  public workTimesToUpdate: WorktimeModel[] = [];

  constructor() {}

  setWorkTime(workTime: WorktimeModel) {
    this.workTime = workTime;
  }

  getWorkTime() {
    return this.workTime;
  }

  formatWorkTime(worktime) {
    const headerDate = new Date(worktime.timestamp.seconds * 1000);
    return (
      headerDate.getDate() + '-' + (headerDate.getMonth() + 1) + '-' + headerDate.getFullYear()
    );
  }

  getKeyValuePairs(workTime: String) {
    const result: WorktimeModel[] = [];
    this.worktimes.forEach(e => {
      if (this.formatWorkTime(e) === workTime) {
        result.push(e);
      }
    });
    return result.reverse();
  }

  setWorkTimesToUpdate(workTimes: WorktimeModel[]) {
    this.workTimesToUpdate = workTimes;
  }

  getDateFromNumberTimestamp(timestamp) {
    const timestampDate = new Date(timestamp.seconds * 1000);
    let zero = '';
    if (timestampDate.getMinutes().toString().length === 1) {
      zero = '0';
    }
    return timestampDate.getHours() + ':' + zero + timestampDate.getMinutes();
  }

  getDate(timestamp) {
    if (timestamp instanceof Date) {
      return timestamp;
    }
    return new Date(timestamp.seconds * 1000);
  }
}
