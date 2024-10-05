import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../../../assets/bar.jpg');

const AdminScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // 

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(fadeAnim, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>

        {menuVisible && (
          <Animated.View style={[styles.menu, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddProduct')}>
              <Text style={styles.buttonText}>Cadastrar Produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SaleScreen')}>
              <Text style={styles.buttonText}>Realizar Venda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportScreen')}>
              <Text style={styles.buttonText}>Relatório do Dia</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StockScreen')}>
              <Text style={styles.buttonText}>Produtos no Estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProductScreen')}>
              <Text style={styles.buttonText}>Editar Produto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeleteProductScreen')}>
              <Text style={styles.buttonText}>Excluir Produto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HelpCenter')}>
              <Text style={styles.buttonText}>Central de Ajuda</Text>
            </TouchableOpacity>

          </Animated.View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
  },
  hamburger: {
    padding: 10,
    position: 'absolute', 
    top: 20,
    right: 130, 
    backgroundColor: 'rgba(240, 244, 248, 0.6)', 
    borderRadius: 30, 
  },
  hamburgerText: {
    fontSize: 25,
    color: '#4A4E69',
  },
  menu: {
    marginTop: 100, 
    borderRadius: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    position: 'absolute', 
    top: 20,
    left: -130, 
    width: '90%', 
    backgroundColor: 'rgba(220, 204, 209, 0.8)', 
  },
  button: {
    backgroundColor: '#9A8C98',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3, 
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default AdminScreen;
