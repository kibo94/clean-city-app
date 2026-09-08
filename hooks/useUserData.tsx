import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = firestore().collection('users').doc(user.uid);
        const doc = await userRef.get();

        if (doc.exists) {
          setUserData({ ...doc.data(), id: doc.id });
        } else {
          setUserData(null);
        }
      } catch (err) {
        setError(err.message || err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return { userData, loading, error, setUserData };
};

export default useUserData;
