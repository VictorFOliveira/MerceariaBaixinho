import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const AdminScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Valor inicial da animação

  useEffect(() => {
    // Aqui você pode buscar produtos se precisar, mas não é necessário para o botão de edição
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(fadeAnim, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeMessage}>Bem-vindo à Tela de Administração!</Text>
      </View>

      {menuVisible && (
        <Animated.View style={[styles.menu, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Text style={styles.buttonText}>Cadastrar Produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SaleScreen')}
          >
            <Text style={styles.buttonText}>Realizar Venda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ReportScreen')}
          >
            <Text style={styles.buttonText}>Relatório do Dia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('StockScreen')}
          >
            <Text style={styles.buttonText}>Produtos no Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProductScreen')} // Navega diretamente para a tela de edição
          >
            <Text style={styles.buttonText}>Editar Produto</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    paddingBottom: 10,
  },
  welcomeMessage: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4E69',
    flex: 1,
    textAlign: 'center',
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 30,
    color: '#4A4E69',
  },
  menu: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#9A8C98',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminScreen;
