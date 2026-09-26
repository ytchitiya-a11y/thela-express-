import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBsAEpp3hooCCHYEdmTNqTId9aWK0a69Ms",
  authDomain: "ai-vit-52666.firebaseapp.com",
  projectId: "ai-vit-52666",
  storageBucket: "ai-vit-52666.firebasestorage.app",
  messagingSenderId: "137839510307",
  appId: "1:137839510307:web:c8f56f623c8234b4638296",
  measurementId: "G-CDTY9LJLC7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
