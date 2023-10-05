import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5rEv_k0RUkuDkRAzkNZAbEXgZbURjDcA",
    authDomain: "thecrudstory.firebaseapp.com",
    projectId: "thecrudstory",
    storageBucket: "thecrudstory.appspot.com",
    messagingSenderId: "883980478513",
    appId: "1:883980478513:web:3b9ff441c8788b1c360d10",
    measurementId: "G-M486M33NF1"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);