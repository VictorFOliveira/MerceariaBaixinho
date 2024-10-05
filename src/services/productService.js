import { db } from '../componets/config/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore';

export const addProduct = async (name, price, quantity) => {
  try {
    
    await addDoc(collection(db, 'products'), {
      name,
      price: parseFloat(price), 
      quantity: parseInt(quantity, 10), 
    });
  } catch (error) {
    console.error("Erro ao adicionar produto: ", error);
    throw error;
  }
};
