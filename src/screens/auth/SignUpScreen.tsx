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

const MyTextInput: FC<{
  label: string;
  formik: FormikProps<FormikValues>;
  name: string;
}> = ({ label, formik, name }) => (
  <>
    <Item floatingLabel>
      <Label>{label}</Label>
      <Input onChangeText={formik.handleChange(name)} />
    </Item>
    {formik.touched[name] && formik.errors[name] && (
      <Text>{formik.errors[name]}</Text>
    )}
  </>
);

const SignUpScreen: FC = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = SIGN_UP_SCHEMA;

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

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
              <MyTextInput
                label="Email"
                name="email"
                formik={formik as unknown as FormikProps<FormikValues>}
              />
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  value={formik.values.email}
                />
              </Item>
              {formik.touched.email && formik.errors.email && (
                <Text>{formik.errors.email}</Text>
              )}
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  value={formik.values.password}
                />
              </Item>
              {formik.touched.password && formik.errors.password && (
                <Text>{formik.errors.password}</Text>
              )}
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
