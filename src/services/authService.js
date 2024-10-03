import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../componets/config/firebaseConfig'; // Verifique o caminho


const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        throw error;
    }
};

export { loginUser };
