import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { syncCustomer } from '../api/client';
import { joinCustomerRoom } from '../socket';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const { data } = await syncCustomer({});
          setDbUser(data.user);
          joinCustomerRoom(data.user.id); // start listening for order updates
        } catch (err) {
          console.error('Failed to sync customer with backend', err);
        }
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signup = async (email, password, name, address) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    // sync with backend right away so name/address are saved
    const { data } = await syncCustomer({ name, address });
    setDbUser(data.user);
    return cred;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ firebaseUser, dbUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
