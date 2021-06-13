import React, { ReactElement, useState } from 'react';
import firebase from 'firebase';
import { FIREBASE_CALLS } from './utils/API';

export const AuthContext = React.createContext<Record<string, any>>({});

export const AuthProvider: React.FC<any> = ({
  children,
}: Record<string, ReactElement>) => {
  const [currentUser, setCurrentUser] =
    useState<firebase.User | undefined>(undefined);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        // eslint-disable-next-line no-unused-vars
        login: (): ((
          phoneNumber: string,
          applicationVerifier: firebase.auth.ApplicationVerifier
        ) => Promise<firebase.auth.ConfirmationResult>) =>
          FIREBASE_CALLS.signIn,
        loginWithEmail: (email: string, password: string) =>
          FIREBASE_CALLS.signInWithEmail(email, password),
        signUpWithEmail: (email: string, password: string) =>
          FIREBASE_CALLS.signUpWithEmail(email, password),
        logout: () => FIREBASE_CALLS.logout(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
