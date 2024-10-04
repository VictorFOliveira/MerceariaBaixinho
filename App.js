import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/componets/login'; // Corrigir "componets" para "components"
import AdminScreen from './src/componets/screens/AdminScreen'; // Corrigir "componets" para "components"
import AddProductScreen from './src/componets/screens/AddProductScreen'; // Corrigir "componets" para "components"
import { StatusBar } from 'expo-status-bar';
import Title from './src/componets/title'; // Corrigir "componets" para "components"
import { View } from 'react-native'; // Remover importação de 'react-native-web'
import StockScreen from './src/componets/screens/StockScreen';
import ReportScreen from './src/componets/screens/ReportScreen';
import SaleScreen from './src/componets/screens/SalesScreen';
import EditProductScreen from './src/componets/screens/EditProductScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Admin" component={AdminScreen} options={{ headerTitle: "Gestão" }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="StockScreen" component={StockScreen}/>
        <Stack.Screen name="ReportScreen" component={ReportScreen}/>
        <Stack.Screen name="SaleScreen" component={SaleScreen} /> 
        <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
