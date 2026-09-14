import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userData) => {
      setUser(userData);
      setAuthChecked(true);
    });

    return subscriber;
  }, []);

  return { user, authChecked };
};

export default useAuth;
