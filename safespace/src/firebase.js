import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoV7HQHK3vR9OkDQq03IJoWIFfYKm0tX8",
  authDomain: "safespace-85f29.firebaseapp.com",
  projectId: "safespace-85f29",
  storageBucket: "safespace-85f29.appspot.com",  // <-- FIXED
  messagingSenderId: "902794350646",
  appId: "1:902794350646:web:e425e6422d7afd5481c897"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
