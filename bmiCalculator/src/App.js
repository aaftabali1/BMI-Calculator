import 'react-native-gesture-handler';
import React from 'react';
import Home from './screens/Home';
import About from './screens/About';
import Colors from './constants/Colors';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: Colors.white},
            headerTintColor: Colors.themeBlue,
            headerTitleStyle: {
              color: Colors.black,
              fontWeight: '600',
            },
            headerShadowVisible: false,
            contentStyle: {backgroundColor: Colors.white},
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{title: 'About us'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
