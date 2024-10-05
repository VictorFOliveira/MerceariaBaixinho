import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { addProduct } from '../../services/productService'; 

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = async () => {
    try {
      await addProduct(name, price, quantity);
      Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      setName('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Adicionar Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço do Produto"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade do Produto"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', 
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
    marginTop: -90,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25, 
  },
  input: {
    height: 50,
    width: '100%', 
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15, 
    backgroundColor: '#f0f0f0', 
  },
  button: {
    backgroundColor: '#841584',
    borderRadius: 8,
    paddingVertical: 15,
    width: '100%', 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
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
    textAlign: 'center',
  },
});

export default AddProductScreen;
