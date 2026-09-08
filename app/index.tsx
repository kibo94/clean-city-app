import { useEffect } from 'react';
import FullScreenCircularSpinner from '~/components/LoadingSpinner';
import { useData } from '~/context/DataContext';
import useAuth from '~/hooks/useAuth';
import { ObjectModel } from '~/models/object';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
const index = () => {
  const { objects, setObjects } = useData();

  const { user } = useAuth();
  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //     try {
  //       firestore()
  //         .collection('objects')
  //         .where('creatorId', '==', user?.uid)

  //         .get()
  //         .then(async (data) => {
  //           if (data.empty) {
  //             setObjects([]);
  //           } else {
  //             const fetchedObjects: ObjectModel[] = data.docs.map((doc) => ({
  //               id: doc.id,
  //               name: doc.data().name,
  //               address: doc.data().address,
  //               city: doc.data().city,
  //               workHours: doc.data().workHours,
  //             }));
  //             setObjects(fetchedObjects);
  //           }
  //         });
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // }, [user]);

  return (
    <SafeAreaView className="relative h-full">{/* <FullScreenCircularSpinner />; */}</SafeAreaView>
  );
};

export default index;
