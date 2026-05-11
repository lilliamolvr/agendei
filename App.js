import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/splashScreen';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import MedicoScreen from './screens/medicoScreen';
import ClinicaScreen from './screens/clinicaScreen';
import ReservasScreen from './screens/reservasScreen';
import ProfileScreen from './screens/profileScreen';
import AgendarScreen from './screens/agendarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Medico" component={MedicoScreen} />
        <Stack.Screen name="Clinica" component={ClinicaScreen} />
        <Stack.Screen name="Reservas" component={ReservasScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Agendar" component={AgendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}