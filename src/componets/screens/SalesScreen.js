import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { db } from '../config/firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient'; // Importando o LinearGradient

const SaleScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

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

  const handleSelectProduct = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveProduct = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists.quantity > 1) {
        return prev.map(item => item.id === product.id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
        );
      } else {
        return prev.filter(item => item.id !== product.id);
      }
    });
  };

  const handleConfirmSale = async () => {
    try {
      const reportData = {
        date: new Date(),
        products: selectedProducts,
        total: selectedProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      };

      await addDoc(collection(db, 'reports'), reportData);
      
      // Atualizar estoque
      await Promise.all(selectedProducts.map(async (item) => {
        const productRef = doc(db, 'products', item.id);
        const updatedQuantity = item.quantity; // Quantidade a ser subtraída
        
        // Busca a quantidade atual do produto
        const productSnapshot = await getDoc(productRef);
        const currentQuantity = productSnapshot.data().quantity; // Supondo que há um campo 'quantity'

        // Atualiza a quantidade no estoque
        await updateDoc(productRef, { quantity: currentQuantity - updatedQuantity });
      }));

      alert('Venda realizada com sucesso!');
      setSelectedProducts([]); // Limpa a seleção após a venda
    } catch (error) {
      console.error("Erro ao registrar venda: ", error);
    }
  };

  useEffect(() => {
    const total = selectedProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(total);
  }, [selectedProducts]);

  const renderProductItem = ({ item }) => {
    const selectedProduct = selectedProducts.find(p => p.id === item.id);
    const quantity = selectedProduct ? selectedProduct.quantity : 0;

    return (
      <View style={styles.productItem}>
        <Text style={styles.productText}>
          {item.name} - R${item.price.toFixed(2)} (Estoque: {item.quantity})
        </Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => handleRemoveProduct(item)} disabled={quantity === 0}>
            <Text style={[styles.controlText, quantity === 0 && styles.disabledControl]}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleSelectProduct(item)} disabled={item.quantity === 0}>
            <Text style={[styles.controlText, item.quantity === 0 && styles.disabledControl]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const availableProducts = products.filter(product => product.quantity > 0); // Filtra produtos disponíveis

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#9013FE']} style={styles.header}>
        <Text style={styles.title}>Venda de Produtos</Text>
      </LinearGradient>
      <FlatList
        data={availableProducts} // Exibe apenas produtos disponíveis
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.totalText}>Total: R${total.toFixed(2)}</Text>
      <Button title="Confirmar Venda" onPress={handleConfirmSale} disabled={selectedProducts.length === 0} color="#4A90E2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  productItem: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  controlText: {
    fontSize: 20,
    paddingHorizontal: 5,
    color: '#4A90E2',
  },
  disabledControl: {
    color: '#ccc',
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#4A90E2',
  },
});

export default SaleScreen;
