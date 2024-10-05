import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const EditProductScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState({ price: '', quantity: '' });
  const [isListVisible, setIsListVisible] = useState(false);

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

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
    setProduct({ price: item.price.toString(), quantity: item.quantity.toString() });
    setIsListVisible(false);
  };

  const handleSave = async () => {
    if (!selectedProduct) {
      Alert.alert('Por favor, selecione um produto.');
      return;
    }

    const docRef = doc(db, 'products', selectedProduct.id);
    await updateDoc(docRef, {
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10),
    });
    Alert.alert('Produto atualizado com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Editar Produto</Text>

        <TouchableOpacity style={styles.toggleButton} onPress={() => setIsListVisible(!isListVisible)}>
          <Text style={styles.toggleButtonText}>{isListVisible ? '▼' : '►'} Selecionar Produto</Text>
        </TouchableOpacity>

        {isListVisible && (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productButton}
                onPress={() => handleSelectProduct(item)}
              >
                <Text style={styles.productText}>{item.name} - Preço: {item.price} - Quantidade: {item.quantity}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {selectedProduct && (
          <View>
            <Text style={styles.title}>Editar Produto: {selectedProduct.name}</Text>

            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Preço"
              value={product.price}
              onChangeText={(text) => setProduct({ ...product, price: text })}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Quantidade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={product.quantity}
              onChangeText={(text) => setProduct({ ...product, quantity: text })}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Mercadinho Fazenda</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4E69',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleButton: {
    padding: 15,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#4A4E69',
  },
  productButton: {
    padding: 15,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    color: '#4A4E69',
  },
  label: {
    fontSize: 16,
    color: '#4A4E69',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%', 
  },
  button: {
    backgroundColor: '#9A8C98',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', 
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 15,
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff', 
    alignItems: 'center', 
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 20, 
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export default EditProductScreen;
