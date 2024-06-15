import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import MovieInfo from './screens/MovieInfo';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import SignUpForm from './screens/SignUpForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpForm} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="MovieInfo" component={MovieInfo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}