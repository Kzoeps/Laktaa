import { Container, Content, Form, Input, Item, Label } from 'native-base';
import React, { FC } from 'react';
import { SIGN_UP_SCHEMA } from './models/constants';

const SignUpScreen: FC = () => {
  const initialFormValues = {
    email: '',
    password: '',
  };

  const signUpSchema = SIGN_UP_SCHEMA;
  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input keyboardType="visible-password" />
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUpScreen;
