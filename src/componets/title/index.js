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
        fontSize: 30, 
        fontWeight: 'bold', 
        color: '#2E8B57', 
        textAlign: 'center', 
    },
    subtitle: {
        fontSize: 20, 
        color: '#3CB371', 
        textAlign: 'center',
        marginVertical: 5, 
    },
    message: {
        fontSize: 16, 
        color: '#556B2F', 
        textAlign: 'center',
        marginTop: 5,
    },
});
