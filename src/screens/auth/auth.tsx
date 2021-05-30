import React, { ReactElement, useEffect, useState } from 'react'
import firebase from 'firebase'
import User = firebase.User

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }: Record<string, ReactElement>) => {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: User | null) => {
            // eslint-disable-next-line no-unused-expressions
            user && setCurrentUser(user)
        })
    }, [])

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    )
}
