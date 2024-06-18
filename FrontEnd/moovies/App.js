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
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MovieInfo" component={MovieInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
<<<<<<< HEAD
};

export default App;
=======
}
>>>>>>> af1bae32e9971277d43ade17c9b1e6a01a3efbb2
