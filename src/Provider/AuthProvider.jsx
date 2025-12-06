import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  //create user........................
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login............................
  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login...........

  const GoogleLogin = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //state change...................
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
      setloading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //object...............
  const authData = {
    createUser,
    Login,
    loading,
    GoogleLogin,
    setloading,
    user,
    setuser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
