import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { loginUser } from '../../services/authService'; // Verifique o caminho
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const user = await loginUser(email, password);
            Alert.alert('Sucesso', `Bem-vindo, ${user.email}!`);
            navigation.navigate('Admin');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex. joao@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" color="#841584" onPress={handleLogin} />
            <TouchableOpacity onPress={() => alert('Recuperar Senha')}>
                <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        margin: 50,
        elevation: 20,
    },
    label: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 3,
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    forgotPassword: {
        marginTop: 15,
        color: '#841584',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
