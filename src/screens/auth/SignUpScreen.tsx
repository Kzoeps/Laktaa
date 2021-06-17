import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import React, { FC } from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import { SIGN_UP_SCHEMA } from './models/constants';
import FMTextInput from '../../shared/components/TextInput';

const SignUpScreen: FC = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = SIGN_UP_SCHEMA;

  return (
    <Container>
      <Content>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {(formik: FormikProps<{ email: string; password: string }>) => (
            <Form>
              <FMTextInput
                label="Email"
                name="email"
                formik={formik as unknown as FormikProps<FormikValues>}
              />
              <FMTextInput
                label="Password"
                formik={formik as unknown as FormikProps<FormikValues>}
                name="password"
              />
              <Button onPress={formik.handleSubmit} block light>
                <Text>Sign Up</Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default SignUpScreen;
