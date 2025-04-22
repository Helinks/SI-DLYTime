import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/views/register/RegisterScreen';
import LoginScreen from './src/views/login/LoginScreen';


export type RootStackParamList = {
  HomeScreen: undefined;
  Login: undefined;
  RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator({ onLogin }: { onLogin: () => void }) {
  return (
    <Stack.Navigator initialRouteName="Login"
      screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Login">
        {(props: any) => <LoginScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: "Registro",
        }} />
    </Stack.Navigator>
  );
}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const rol = await AsyncStorage.getItem('userRole');
      const id = await AsyncStorage.getItem('userId');
      setIsLoggedIn(!!token);
      setIsLoading(false);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  const handleLoginSucces = () => {
    setIsLoggedIn(true);
  }

  if (isLoading) {

    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>

        <DrawerNavigation />

          {isLoggedIn ? (<DrawerNavigation onLogout={handleLogout}/>) : <AuthNavigator onLogin={handleLoginSucces}/>}

      </NavigationContainer>
    </SafeAreaView>
  );
}