import firebase from 'firebase';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { PostJobInfo } from '../models/models';

// eslint-disable-next-line import/prefer-default-export
export const FIREBASE_POSTJOB_CALLS = {
  postJob: (info: PostJobInfo) =>
    firebase.firestore().collection('jobs').doc().set(info),
};
