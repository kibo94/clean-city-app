import storage from '@react-native-firebase/storage';

async function getDownloadURL(id: string, imgData) {
  console.log(imgData);
  const imgExtension = imgData.type.split('/')[1];
  const fileName = `images/${id}`;
  const reference = storage().ref(fileName);
  await reference.putFile(imgData.uri);

  const downloadURL = await reference.getDownloadURL();
  return downloadURL;
}

export { getDownloadURL };
