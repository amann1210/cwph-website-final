import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyChd6nO8GFE8q2P8dVVl_TWOm_aErZ770U",
  authDomain: "cwph-lnmiit-jaipur-24ac3.firebaseapp.com",
  projectId: "cwph-lnmiit-jaipur-24ac3",
  storageBucket: "cwph-lnmiit-jaipur-24ac3.appspot.com",
  messagingSenderId: "169476643966",
  appId: "1:169476643966:web:9a594edae16b9262d34c2f",
  measurementId: "G-140QWSMD70" 
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
