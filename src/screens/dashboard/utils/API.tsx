import firebase from 'firebase';

// eslint-disable-next-line import/prefer-default-export
export const FIREBASE_FETCHJOB_CALLS = {
  fetchData: async (filters): Promise<any> => {
    let query = firebase.firestore().collection('jobs');
    if (filters.pickUpLocation) {
      query = query.where('pickDzongkhag', '==', filters.pickUpLocation);
    }
    if (filters.pickUpLocation) {
      query = query.where('dropDzongkhag', '==', filters.dropOffLocation);
    }
    if (filters.fromDate) {
      query = query.where('dropOffDate', '>=', filters.fromDate);
    }
    if (filters.fromDate) {
      query = query.where('pickUpDate', '<=', filters.toDate);
    }
    const data = await query.get();
    return data;
  },
};
