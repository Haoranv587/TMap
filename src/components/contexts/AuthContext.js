import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  // connectAuthEmulator,
  signOut,
} from "firebase/auth";
import app from "../../firebase";

const AuthContext = React.createContext();
const authInstance = getAuth(app);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(authInstance, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(authInstance, email, password);
  };

  const logout = () => {
    return signOut(authInstance);
  };

  useEffect(() => {
    // connectAuthEmulator(authInstance, "http://localhost:9099");

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
    //this is going to unsubscribe us from the listener on AuthStateChanged(), when ever we unmount this component
  }, []);
  // dependency is empty so it will run once, this is firebase code, so it will know onAuthStateChanged()

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
