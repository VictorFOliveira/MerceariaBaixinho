import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebaseConfig'; 
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const DeleteProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProducts, setShowProducts] = useState(false); 

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

  const handleDeleteProduct = async () => {
    if (!selectedProduct) {
      Alert.alert("Erro", "Nenhum produto selecionado para exclusão.");
      return;
    }

    try {
      const productRef = doc(db, 'products', selectedProduct.id);
      await deleteDoc(productRef);
      Alert.alert("Sucesso", "Produto excluído com sucesso!");
      setProducts(prevProducts => prevProducts.filter(product => product.id !== selectedProduct.id));
      setSelectedProduct(null);
      setShowProducts(false); 
    } catch (error) {
      console.error("Erro ao excluir produto: ", error);
      Alert.alert("Erro", "Não foi possível excluir o produto.");
    }
  };

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={[styles.productItem, selectedProduct?.id === item.id && styles.selectedItem]}
        onPress={() => setSelectedProduct(item)}
      >
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R${item.price.toFixed(2)}</Text>
        <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Excluir Produto</Text>
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={() => setShowProducts(!showProducts)}
      >
        <Text style={styles.toggleButtonText}>{showProducts ? '▲' : '▼'} Selecionar Produto</Text>
      </TouchableOpacity>

      {showProducts && (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderProductItem}
        />
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProduct}>
        <Text style={styles.deleteButtonText}>Excluir Produto Selecionado</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#d0e1f9',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
  },
  productQuantity: {
    fontSize: 16,
    color: '#777',
  },
  deleteButton: {
    backgroundColor: '#E94E77',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DeleteProductScreen;
