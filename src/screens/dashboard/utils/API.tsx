import firebase from 'firebase';

// eslint-disable-next-line import/prefer-default-export
export const FIREBASE_FETCHJOB_CALLS = {
  fetchData: async (): Promise<any> => {
    const data = await firebase.firestore().collection('jobs').get();
    return data;
  },
};
