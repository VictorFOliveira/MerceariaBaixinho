import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Title() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mercadinho Fazenda!</Text>
            <Text style={styles.subtitle}>Produtos fresquinhos e qualidade!</Text>
            <Text style={styles.message}>A natureza traz o melhor para você.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
    },
    title: {
        fontSize: 30, // Tamanho do título
        fontWeight: 'bold', // Peso da fonte
        color: '#2E8B57', // Verde vibrante
        textAlign: 'center', // Centraliza o texto
    },
    subtitle: {
        fontSize: 20, // Tamanho do subtítulo
        color: '#3CB371', // Verde mais claro
        textAlign: 'center',
        marginVertical: 5, // Espaçamento vertical
    },
    message: {
        fontSize: 16, // Tamanho da mensagem
        color: '#556B2F', // Verde escuro
        textAlign: 'center',
        marginTop: 5,
    },
});
