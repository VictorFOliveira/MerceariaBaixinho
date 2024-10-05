import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/componets/login'; 
import AdminScreen from './src/componets/screens/AdminScreen'; 
import AddProductScreen from './src/componets/screens/AddProductScreen'; 
import { StatusBar } from 'expo-status-bar';
import StockScreen from './src/componets/screens/StockScreen';
import ReportScreen from './src/componets/screens/ReportScreen';
import SaleScreen from './src/componets/screens/SalesScreen';
import EditProductScreen from './src/componets/screens/EditProductScreen';
import DeleteProductScreen from './src/componets/screens/DeleteProductScreen';
import HelpCenterScreen from './src/componets/screens/HelpCenterScreen'; 


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Admin" component={AdminScreen} options={{ headerTitle: "Gestão" }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen}  options={{headerTitle:"Criação de produtos"}}/>
        <Stack.Screen name="StockScreen" component={StockScreen} options={{headerTitle:"Estoque"}}/>
        <Stack.Screen name="ReportScreen" component={ReportScreen} options={{headerTitle:"Relatório do dia"}}/>
        <Stack.Screen name="SaleScreen" component={SaleScreen} options={{headerTitle:"Realize suas vendas"}}/> 
        <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{headerTitle:"Altere o produto"}} />
        <Stack.Screen name="DeleteProductScreen" component={DeleteProductScreen} options={{headerTitle:"Exclua um produto"}}/>
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ headerTitle: "Central de Ajuda" }} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
