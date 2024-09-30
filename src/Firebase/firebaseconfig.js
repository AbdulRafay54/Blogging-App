// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGNZ9xgnx1pVgnzaRx-848NAQThGFK0DE",
  authDomain: "blogging-app-9a26a.firebaseapp.com",
  projectId: "blogging-app-9a26a",
  storageBucket: "blogging-app-9a26a.appspot.com",
  messagingSenderId: "878879403569",
  appId: "1:878879403569:web:8b19fe82d33451c915ef10",
  measurementId: "G-PQ6V404JBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;