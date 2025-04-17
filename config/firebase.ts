// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXDTLsj_x9Q33r-HhTBn6f9KIpIQ3EnW4",
  authDomain: "expense-tracker-9c5f5.firebaseapp.com",
  projectId: "expense-tracker-9c5f5",
  storageBucket: "expense-tracker-9c5f5.firebasestorage.app",
  messagingSenderId: "885152645013",
  appId: "1:885152645013:web:319e422142113bc60e009c",
  measurementId: "G-J50VSQNY75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// auht
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const firestore = getFirestore(app);
