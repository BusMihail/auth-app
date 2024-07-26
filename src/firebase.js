import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBuwzVt7IgJvumOvOKVDviPEYc2wb4Ie48",

  authDomain: "auth-app-88896.firebaseapp.com",

  projectId: "auth-app-88896",

  storageBucket: "auth-app-88896.appspot.com",

  messagingSenderId: "467406396099",

  appId: "1:467406396099:web:1684e1dbef60eb2c29e076",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged, signOut };
