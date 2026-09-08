import * as React from 'react';
import { Dimensions, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProductScreen from './ImageCarousel';

const First = () => (
  <View style={{ marginTop: 32 }} className="container">
    <ProductScreen />
  </View>
);

const Second = () => (
  <View style={{ marginTop: 32 }} className="container">
    <Text>Drugi tab</Text>
  </View>
);

const renderScene = SceneMap({
  first: First,
  second: Second,
});

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];

export default function TabViewExample() {
  const layout = Dimensions.get('window');
  const [index, setIndex] = React.useState(0);

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: 'white', elevation: 0 }} // header bg
            indicatorStyle={{
              borderWidth: 1,

              backgroundColor: 'black',
              height: 3,
              borderRadius: 100,
              alignContent: 'center',
              justifyContent: 'center',
              marginRight: 40,
              width: layout.width / 2 - 80,
              marginLeft: 40,
            }} // underline
            labelStyle={{ color: 'blue', fontSize: 16, fontWeight: '600' }} // text style
            activeColor="black"
            inactiveColor="#888"
          />
        )}
      />
    </View>
  );
}
