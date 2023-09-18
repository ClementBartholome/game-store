import { createContext, useEffect, useState } from "react";
import { app } from "../FirebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      setUser(user);
    } catch (error) {
      console.error("Erreur de connexion avec Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  const authContextValue = {
    user,
    handleLogin,
    handleLogout,
    isLoading, // Ajoutez isLoading au contexte
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
