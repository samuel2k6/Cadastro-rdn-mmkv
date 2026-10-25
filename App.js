import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cadastro from './src/screens/Cadastro';
import Confirmacao from './src/screens/Confirmacao';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Cadastro" component={Cadastro} />

        <Stack.Screen name="Confirmacao" component={Confirmacao} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}