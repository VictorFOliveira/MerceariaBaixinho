import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebaseConfig' //Ajuste o caminho conforme necessário
import { collection, getDocs } from 'firebase/firestore';

const AdminScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Administração</Text>
        <Text style={styles.welcomeMessage}>Bem-vindo à Tela de Administração!</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Text style={styles.buttonText}>Cadastrar Produtos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => { /* Lógica para realizar venda */ }}
        >
          <Text style={styles.buttonText}>Realizar Venda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => { /* Lógica para ver relatórios */ }}
        >
          <Text style={styles.buttonText}>Relatório do Dia</Text>
        </TouchableOpacity>
        <TouchableOpacity 
  style={styles.button}
  onPress={() => navigation.navigate('StockScreen')}
>
  <Text style={styles.buttonText}>Produtos no Estoque</Text>
  </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#4A4E69',
    padding: 20,
    justifyContent: 'flex-start',
    height: '100%', // Garante que a sidebar ocupe toda a altura
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#F9F9F9', // Cor do texto
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 20,
    color: '#F9F9F9',
  },
  button: {
    backgroundColor: '#9A8C98',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15, // Espaçamento entre os botões
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
  },
});

export default AdminScreen;
