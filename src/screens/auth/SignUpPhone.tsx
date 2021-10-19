import { Formik, FormikProps, FormikValues } from 'formik';
import React, { FC, useContext, useRef, useState } from 'react';
import { Button } from 'native-base';
import firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { ApplicationVerifier } from '@firebase/auth-types';
import FMTextInput from '../../shared/components/TextInput';
import { AuthContext } from './auth';

const SignUpPhone: FC = () => {
	const { currentUser } = useContext(AuthContext);
	const [verificationId, setVerificationId] = useState<string>('');
	const recaptchaVerifier = useRef(null);
	const initialValues = {
		phoneNumber: '',
		verificationCode: '',
	};

	const sendVerification = (phoneNumber: string) => {
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current as unknown as ApplicationVerifier).then(setVerificationId);
	}

	const confirmCode = (code: string) => {
		const credential = firebase.auth.PhoneAuthProvider.credential(
			verificationId,
			code
		);
		firebase.auth().signInWithCredential(credential).then((result) => {
			debugger;
		})
	}

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={({ phoneNumber, verificationCode }) => {
				if (!verificationCode) {
					sendVerification(phoneNumber);
					return;
				}
				confirmCode(verificationCode);
			}}>
				{(formik: FormikProps<{ phoneNumber: string, verificationCode: string }>) => (
					<>
						<FMTextInput label='Phone Number' name='phoneNumber'
												 formik={formik as unknown as FormikProps<FormikValues>} />
						<FMTextInput label='Verification Code' name='verificationCode'
												 formik={formik as unknown as FormikProps<FormikValues>} />
						<FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options}/>
						<Button onPress={formik.handleSubmit}>
							Sign up
						</Button>
					</>
				)}
			</Formik>
		</>
	)
}

export default SignUpPhone;
