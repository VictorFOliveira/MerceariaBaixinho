import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

const HelpCenterScreen = () => {
  const handlePress = (topic) => {
    Alert.alert(`Você clicou em: ${topic}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Central de Ajuda</Text>
      <Text style={styles.subtitle}>Como podemos ajudar?</Text>

      <TouchableOpacity style={styles.topic} onPress={() => handlePress('FAQ')}>
        <Text style={styles.topicText}>Perguntas Frequentes (FAQ)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.topic} onPress={() => handlePress('Suporte Técnico')}>
        <Text style={styles.topicText}>Suporte Técnico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.topic} onPress={() => handlePress('Política de Devolução')}>
        <Text style={styles.topicText}>Política de Devolução</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.topic} onPress={() => handlePress('Informações de Contato')}>
        <Text style={styles.topicText}>Informações de Contato</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  topic: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  topicText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HelpCenterScreen;
