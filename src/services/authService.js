// src/services/authService.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../componets/config/firebaseConfig'; // Ajuste o caminho conforme necessário

// Função de Login
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Retorna o usuário logado
    } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        throw error; // Propaga o erro
    }
};

export { loginUser };
