import React, { ReactElement, useEffect, useState } from 'react';
import firebase from 'firebase';
import { FIREBASE_CALLS } from 'src/screens/auth/utils/API.tsx.ts';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }: Record<string, ReactElement>) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged((user: User | null) => {
    //         eslint-disable-next-line no-unused-expressions
    // user && setCurrentUser(user)
    // })
    // }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                login: () => FIREBASE_CALLS.signIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
