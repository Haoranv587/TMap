import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  connectAuthEmulator,
} from "firebase/auth";
import app from "../../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const authInstance = getAuth(app);
    connectAuthEmulator(authInstance, "http://localhost:9099");

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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
