import { View, Text } from 'react-native';
import React, { useState } from 'react';

const TrashResult = () => {
  const [trashResult, setTrashResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if (image) {
  //     analyzeTrash(image);
  //   }
  // }, [image]);
  return (
    <View>
      {trashResult && !loading && (
        <View className="mt-6 w-72 rounded-xl bg-gray-50 p-4 shadow">
          <Text className="font-bold font-regular text-lg">Result</Text>

          {trashResult && (
            <>
              {/* <Text className="mt-2 text-gray-700">
                🗑 Contains Trash: <Text className="font-bold">{trashResult.confidence}%</Text>
              </Text> */}

              <Text className="mt-2 font-regular text-gray-700">
                ✔ Trash Detected:{' '}
                <Text className="font-bold font-regular">
                  {trashResult.isRealPhoto ? 'Yes' : 'No'}
                </Text>
              </Text>

              <Text className="mt-2 font-regular text-gray-500">{trashResult.description}</Text>
            </>
          )}

          {trashResult?.error && (
            <Text className="mt-2 font-regular text-red-400">Analysis failed.</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default TrashResult;
