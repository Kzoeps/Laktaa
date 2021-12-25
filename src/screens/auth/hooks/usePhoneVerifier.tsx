import { useToast } from 'native-base';
import firebase from 'firebase';
import { getToastConfig } from '../../../shared/utils';
import React from 'react';
import { ApplicationVerifier } from '@firebase/auth-types';
import { SetStateType, ToastTypes } from '../../../shared/models/model';

interface PhoneVerifierProps {
	setLoader: SetStateType<boolean>;
	recaptchaVerifier: ApplicationVerifier;
}

interface PhoneVerifierPayload {
	sendCode: (phoneNumber: string) => Promise<string | undefined>;
}

const usePhoneVerifier = ({
														setLoader,
														recaptchaVerifier,
													}: PhoneVerifierProps): PhoneVerifierPayload => {
	const toast = useToast();

	const sendVerification = async (phoneNumber: string): Promise<string | undefined> => {
		if (!phoneNumber) {
			toast.show(getToastConfig('Phone Number is Required', ToastTypes.error));
			return undefined;
		}
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		try {
			const verificationId = await phoneProvider.verifyPhoneNumber(
				`+975${phoneNumber}`,
				recaptchaVerifier,
			);
			toast.show(getToastConfig('OTP has been sent', ToastTypes.success));
			return verificationId;
		} catch (error) {
			toast.show(getToastConfig(error.message, ToastTypes.error));
		} finally {
			setLoader(false);
		}
		return undefined;
	};
	return { sendCode: sendVerification };
};

export default usePhoneVerifier;
