// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhMps1h8nAPxVDMA9vgm6StRd5thFobu4",
    authDomain: "react-test-app-2-afd70.firebaseapp.com",
    projectId: "react-test-app-2-afd70",
    storageBucket: "react-test-app-2-afd70.firebasestorage.app",
    messagingSenderId: "669301609819",
    appId: "1:669301609819:web:b587879390d454395bf67e",
    measurementId: "G-GN96TQ3KK9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);