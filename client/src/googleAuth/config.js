import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCHSFAheteqCgdlgHQqZcN9AW8u8mYINJ4",
  authDomain: "airbnbtestauth.firebaseapp.com",
  projectId: "airbnbtestauth",
  storageBucket: "airbnbtestauth.appspot.com",
  messagingSenderId: "723355633991",
  appId: "1:723355633991:web:021240d7499198c4cea462",
  measurementId: "G-57SZV0JRVW"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
