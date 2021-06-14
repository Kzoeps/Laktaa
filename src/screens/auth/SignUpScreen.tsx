import { Button, Container, Content, Form, Input, Item, Label, Text } from 'native-base';
import React, { FC } from 'react';
import { useFormik } from 'formik';
import { SIGN_UP_SCHEMA } from './models/constants';

const SignUpScreen: FC = () => {
	const initialValues = {
		email: '',
		password: '',
	};

	const formik = useFormik({
		initialValues,
		onSubmit: values => {
			console.log(values);
		}
	})
  const signUpSchema = SIGN_UP_SCHEMA;
  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
				onChangeText={formik.handleChange('email')}
				onBlur={formik.handleBlur('email')}
				value={formik.values.email}
			/>
          </Item>
          {/*<Item floatingLabel last>*/}
          {/*  <Label>Password</Label>*/}
          {/*  <Input*/}
			{/*	name="password"*/}
			{/*	type="password"*/}
			{/*	onChange={formik.handleChange}*/}
			{/*	value={formik.values.password}*/}
			{/*/>*/}
          {/*</Item>*/}
			<Button onPress={formik.handleSubmit} block light>
				<Text>
					Sign Up
				</Text>
			</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUpScreen;
