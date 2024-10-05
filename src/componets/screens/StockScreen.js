import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { db } from '../config/firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

const StockScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <LinearGradient colors={['#FFFFFF', '#E2E2E2']} style={styles.container}>
      <Text style={styles.title}>Produtos em Estoque</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
            <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  productItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  productPrice: {
    fontSize: 18,
    color: '#333',
  },
  productQuantity: {
    fontSize: 18,
    color: '#777',
  },
});

export default StockScreen;
