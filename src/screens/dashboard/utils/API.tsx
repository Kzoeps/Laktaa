import firebase from 'firebase';

// eslint-disable-next-line import/prefer-default-export
export const FIREBASE_FETCHJOB_CALLS = {
  fetchData: () => {
    const data = firebase.firestore().collection('jobs').get();
    // data.map((item) => {
    //   console.log(`item: ${item}`);
    // });
    return data;
  },
};
