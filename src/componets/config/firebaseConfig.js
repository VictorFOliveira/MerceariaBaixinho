// src/components/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBXWZvg0vf84vtLPQ862RD6OGjNIO04Lwk",
    authDomain: "mercadinhofazenda-38f55.firebaseapp.com",
    projectId: "mercadinhofazenda-38f55",
    storageBucket: "mercadinhofazenda-38f55.appspot.com",
    messagingSenderId: "527930716199",
    appId: "1:527930716199:android:8cf3f60396866872219e02"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicializar Auth com persistência
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { app, db, auth }; // Certifique-se de exportar o auth também
