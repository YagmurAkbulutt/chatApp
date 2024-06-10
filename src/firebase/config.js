// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//hangi girişi seçtiysen onu yazacaksın örn. TwitterAuthProvider, FacebookAuthProvider vs
import {getAuth, GoogleAuthProvider} from "firebase/auth"

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-7b1bf.firebaseapp.com",
  projectId: "chat-7b1bf",
  storageBucket: "chat-7b1bf.appspot.com",
  messagingSenderId: "272909961062",
  appId: "1:272909961062:web:c08c2e456745cf950e2aa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//authentication hizmetinin referansını al
//kullanıcı ekleme çıakrtma şifre sıfırlama gibi özellikleri kullandırır
export const auth = getAuth(app);

//google sağlayıcının kurulumu
export const provider = new GoogleAuthProvider();

//veritabanı hizmetinin referansını al
export const db = getFirestore(app)

