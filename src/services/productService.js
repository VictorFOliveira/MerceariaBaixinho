// src/services/productService.js
import { db } from '../componets/config/firebaseConfig' // Ajuste o caminho conforme necessário
import { collection, addDoc } from 'firebase/firestore';

export const addProduct = async (name, price, quantity) => {
  try {
    // Adiciona o produto à coleção "products"
    await addDoc(collection(db, 'products'), {
      name,
      price: parseFloat(price), // Converte o preço para número
      quantity: parseInt(quantity, 10), // Converte a quantidade para número
    });
  } catch (error) {
    console.error("Erro ao adicionar produto: ", error);
    throw error; // Lança o erro para ser capturado no AddProductScreen
  }
};
