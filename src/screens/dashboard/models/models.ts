import { PostJobInfo } from '../../postjob/models/models';
import { APIStatuses } from '../../../shared/models/model';

export interface DashboardState {
  jobs: PostJobInfo[];
  status: APIStatuses;
}

export interface TrackUser {
  docId: string;
  currentUser: string;
  poster: string;
}
