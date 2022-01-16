import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import firebase from 'firebase';
import { DocumentResult } from 'expo-document-picker';

export type FirestoreUpload = {
	uploadFile: (uri: string) => Promise<string>;
}
const useFirestoreUpload = (
  reference: string,
  fileToUploadRef: DocumentResult | undefined,
  setFileToUpload: Dispatch<SetStateAction<DocumentResult | undefined>>,
	setUploading: Dispatch<SetStateAction<boolean>>,
): FirestoreUpload => {
/*  const [fileUrl, setFileUrl] = useState('');
  const [status, setStatus] = useState('idle'); */
/*  const returnRef: { idle: string; pending: string; complete: string } = {
    idle: 'idle',
    pending: 'pending',
    complete: fileUrl,
  }; */
  const storageRef = firebase.storage().ref().child(reference);

  const uploadFile = async (uri: string): Promise<string> => {
  	setUploading(true)
  	const file = await fetch(uri);
  	const blob = await file.blob();
  	const firebaseUploadSnapShot = await storageRef.put(blob);
		return firebaseUploadSnapShot.ref.getDownloadURL()
	}
/*
useEffect(() => {
    if (
      fileToUploadRef &&
      fileToUploadRef.type === 'success' &&
      fileToUploadRef.uri
    ) {
      const uploadFile = async () => {
        const file = await fetch(fileToUploadRef.uri);
        const blob = await file.blob();
        const firebaseUploadSnapshot = await storageRef.put(blob);
        const fileUri = await firebaseUploadSnapshot.ref.getDownloadURL();
        setFileUrl(fileUri);
        setFileToUpload(undefined);
      };
      setStatus('pending');
      uploadFile()
        .then()
        .finally(() => setStatus('complete'));
    }
  }, [setFileToUpload, status, setFileUrl, fileToUploadRef, storageRef]); */
	return { uploadFile }
};

export default useFirestoreUpload;
