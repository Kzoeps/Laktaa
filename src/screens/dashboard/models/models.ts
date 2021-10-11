import { APIStatuses, PostJobInfo } from '../../../shared/models/model';

export interface DashboardState {
  jobs: PostJobInfo[];
  status: APIStatuses;
}

export interface TrackUser {
  docId: string;
  currentUser: string;
  poster: string;
}
