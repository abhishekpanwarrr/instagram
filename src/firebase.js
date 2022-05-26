// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDOSB2rNEc8OmKheuBocx8nNiVXCY-Wp0",
  authDomain: "insta-app-a9157.firebaseapp.com",
  projectId: "insta-app-a9157",
  storageBucket: "insta-app-a9157.appspot.com",
  messagingSenderId: "134003486894",
  appId: "1:134003486894:web:60f4f8ee4b6f715c643d3f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)