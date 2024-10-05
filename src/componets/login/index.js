import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { loginUser } from '../../services/authService';
import { auth } from "../config/firebaseConfig"; // Certifique-se de que o caminho está correto
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { sendPasswordResetEmail } from 'firebase/auth'; // Importe a função de redefinição de senha

const backgroundImage = require('../../../assets/mercantil_publico.jpg');

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

    const handleBiometricLogin = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, insira seu e-mail antes de usar a impressão digital.');
            return;
        }

        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (!compatible) {
            Alert.alert('Erro', 'Seu dispositivo não suporta autenticação biométrica.');
            return;
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
            Alert.alert('Erro', 'Nenhuma impressão digital cadastrada.');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autentique-se',
            fallbackLabel: 'Usar senha',
        });

        if (result.success) {
            Alert.alert('Sucesso', 'Você foi autenticado com sucesso!');
            navigation.navigate('Admin');
        } else {
            Alert.alert('Erro', 'Autenticação falhou.');
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, insira seu e-mail para redefinir a senha.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sucesso', 'E-mail de redefinição de senha enviado!');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
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
                <View style={styles.spacing} />
                <Button title="Impressão Digital" color="#841584" onPress={handleBiometricLogin} />
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 30,
        padding: 30,
        marginHorizontal: 30,
        elevation: 30,
        width: '80%',
        maxWidth: 300,
        marginTop: -100,
    },
    label: {
        fontSize: 20,
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
    spacing: {
        marginVertical: 5,
    },
});
