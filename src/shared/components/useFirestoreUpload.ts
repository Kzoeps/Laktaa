import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import firebase from 'firebase';
import { DocumentResult } from 'expo-document-picker';

export type FirestoreUpload = {
  uploadFile: (uri: string) => Promise<string>;
};
const useFirestoreUpload = (
  reference: string,
  fileToUploadRef: DocumentResult | undefined,
  setFileToUpload: Dispatch<SetStateAction<DocumentResult | undefined>>,
  setUploading: Dispatch<SetStateAction<boolean>>
): FirestoreUpload => {
  const storageRef = firebase.storage().ref().child(reference);
  const uploadFile = async (uri: string): Promise<string> => {
    setUploading(true);
    const file = await fetch(uri);
    const blob = await file.blob();
    const firebaseUploadSnapShot = await storageRef.put(blob);
    return firebaseUploadSnapShot.ref.getDownloadURL();
  };

  return { uploadFile };
};

export default useFirestoreUpload;
