import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import firebase from 'firebase';
import { DocumentResult } from 'expo-document-picker';

const useFirestoreUpload = (reference: string, fileToUploadRef: DocumentResult | undefined, setFileToUpload: Dispatch<SetStateAction<DocumentResult | undefined>>) => {
	const [fileUrl, setFileUrl] = useState('');
	const [status, setStatus] = useState('idle');
	const returnRef: { idle: string, pending: string, complete: string } = {
		'idle': 'idle',
		'pending': 'pending',
		'complete': fileUrl,
	};
	const storageRef = firebase.storage().ref().child(reference);
	useEffect(() => {
		if (fileToUploadRef && fileToUploadRef.type === 'success' && fileToUploadRef.uri) {
			const uploadFile = async () => {
				const file = await fetch(fileToUploadRef.uri);
				const blob = await file.blob();
				const firebaseUploadSnapshot = await storageRef.put(blob);
				const fileUri = await firebaseUploadSnapshot.ref.getDownloadURL();
				setFileUrl(fileUri);
				setFileToUpload(undefined);
			};
			setStatus('pending');
			uploadFile().then().finally(() => setStatus('complete'));
		}
	}, [setFileToUpload, status, setFileUrl, fileToUploadRef, storageRef]);
	return returnRef[status as 'idle' | 'pending' | 'complete'];
};

export default useFirestoreUpload;
