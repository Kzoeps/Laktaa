import React, { FC, useContext } from 'react';
import { AuthContext } from './auth';
import LoginForm from './LoginForm';

const SignUpPhone: FC = () => {
	const { currentUser } = useContext(AuthContext);
	const initialValues = {
		phone: '',
		verificationCode: ''
	}
	return (
		<>
			<LoginForm/>
		</>
	)
}

export default SignUpPhone;
