import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWoUV6PWVdnpdpSQ4HlXwCRnDH27t9ziQ",
  authDomain: "movies-app-347ea.firebaseapp.com",
  projectId: "movies-app-347ea",
  storageBucket: "movies-app-347ea.firebasestorage.app",
  messagingSenderId: "642359137355",
  appId: "1:642359137355:web:623bde57942611cfb5e9ce",
  measurementId: "G-YJ0KE0Q4MS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);