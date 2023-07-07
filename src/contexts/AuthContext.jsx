import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6YNh1TXCUrdaRCwQ-nSqeD17_d_hUf08",
  authDomain: "gamehub-721b3.firebaseapp.com",
  projectId: "gamehub-721b3",
  storageBucket: "gamehub-721b3.appspot.com",
  messagingSenderId: "849360036594",
  appId: "1:849360036594:web:733387cfef3f4b6917666b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { user } = await signInWithPopup(auth, provider);
    setUser(user);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const authContextValue = {
    user,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
