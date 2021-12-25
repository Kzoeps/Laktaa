import { useToast } from 'native-base';
import firebase from 'firebase';
import React from 'react';
import { ApplicationVerifier } from '@firebase/auth-types';
import { getToastConfig } from '../../../shared/utils';
import { SetStateType, ToastTypes } from '../../../shared/models/model';

interface PhoneVerifierProps {
	setLoader: SetStateType<boolean>;
	recaptchaVerifier: ApplicationVerifier | undefined;
}

interface PhoneVerifierPayload {
	sendCode: (phoneNumber: string) => Promise<string | undefined>;
	confirmCode: (code: string) => Promise<void>;
}

const usePhoneVerifier = ({
														setLoader,
														recaptchaVerifier,
													}: PhoneVerifierProps): PhoneVerifierPayload => {
	const [verificationId, setVerificationId] = React.useState<string | undefined>(undefined);
	const toast = useToast();

	const sendVerification = async (phoneNumber: string): Promise<string | undefined> => {
		if (!phoneNumber || !recaptchaVerifier) {
			toast.show(getToastConfig('Phone Number is Required', ToastTypes.error));
			return undefined;
		}
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		try {
			const id = await phoneProvider.verifyPhoneNumber(
				`+975${phoneNumber}`,
				recaptchaVerifier,
			);
			toast.show(getToastConfig('OTP has been sent', ToastTypes.success));
			setVerificationId(id);
			return verificationId;
		} catch (error) {
			toast.show(getToastConfig(error.message, ToastTypes.error));
		} finally {
			setLoader(false);
		}
		return undefined;
	};

	const confirmCode = async (code: string): Promise<void> => {
		if (!verificationId) return;
		try {
			const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
			firebase.auth().signInWithCredential(credential).then(() => {
				toast.show(getToastConfig('Login Successful', ToastTypes.success));
			})
		} catch (error) {
			toast.show(getToastConfig(error.message, ToastTypes.error));
		}
	};
	return { sendCode: sendVerification, confirmCode };
};

export default usePhoneVerifier;
