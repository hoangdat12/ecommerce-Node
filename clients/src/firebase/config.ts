// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyChQMDbZiTCrsK9sSOfUHjVy9396y91naY',
  authDomain: 'ecommerce-app-2abd4.firebaseapp.com',
  projectId: 'ecommerce-app-2abd4',
  storageBucket: 'ecommerce-app-2abd4.appspot.com',
  messagingSenderId: '798946086157',
  appId: '1:798946086157:web:aab97c40fc420886cf7444',
  measurementId: 'G-P213ZQ5JWZ',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
