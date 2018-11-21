import { SubmissionPeriodModel } from './submission-period.model';

export interface SubmissionModel {
  uid: string;
  period: SubmissionPeriodModel[];
}
