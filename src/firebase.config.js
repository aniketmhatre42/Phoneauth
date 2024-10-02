// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVaCOPr3yMISFRgR3DzKkaLu4x9Amz1gg",
  authDomain: "mediconnect-152b9.firebaseapp.com",
  projectId: "mediconnect-152b9",
  storageBucket: "mediconnect-152b9.appspot.com",
  messagingSenderId: "534780202458",
  appId: "1:534780202458:web:721d911f4383dfb822c4e3",
  measurementId: "G-PP2B6031XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)