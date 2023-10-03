// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCNVyJ1qLPvMiuZDK97O-rmB3mz48UqC1g',
  authDomain: 'pium-7445f.firebaseapp.com',
  projectId: 'pium-7445f',
  storageBucket: 'pium-7445f.appspot.com',
  messagingSenderId: '14284052337',
  appId: '1:14284052337:web:4ccb34224d907e73fa48d0',
  measurementId: 'G-Z5F62MDJ8N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
