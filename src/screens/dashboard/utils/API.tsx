import firebase from 'firebase';

// eslint-disable-next-line import/prefer-default-export
export const FIREBASE_FETCHJOB_CALLS = {
  fetchData: async (filters): Promise<any> => {
    let query = firebase.firestore().collection('jobs');
    if (filters.pickUpLocation) {
      query = query.where('pickDzongkhag', '==', filters.pickUpLocation);
    }
    if (filters.dropOffLocation) {
      query = query.where('dropDzongkhag', '==', filters.dropOffLocation);
    }
    if (filters.fromDate) {
      const start = firebase.firestore.Timestamp.fromDate(filters.fromDate);
      query = query.where('dropOffDate', '>=', start);
    }
    if (filters.toDate) {
      const end = firebase.firestore.Timestamp.fromDate(filters.toDate);
      query = query.where('dropOffDate', '<=', end);
    }
    const data = await query.get();
    return data;
  },
};
