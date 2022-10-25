import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { createUserWithEmailAndPassword,getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAaDk5IOnFYdpYB3QsVt7UrQqWse54NL-g",
    authDomain: "twop-call.firebaseapp.com",
    projectId: "twop-call",
    storageBucket: "twop-call.appspot.com",
    messagingSenderId: "401261069821",
    appId: "1:401261069821:web:08d112c9cae295a61a0594"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
const auth = getAuth()

////sign up
export const SignUpWithEmailAndPassword=(email , password) =>{
  return createUserWithEmailAndPassword(auth , email , password)
}
////log in
export const LogInWithEmailAndPassword =(email , password)=>{
  return signInWithEmailAndPassword(auth , email , password)
}
/// sign out

export const LogOut = ()=>{
  return signOut(auth)
}
// get currentUser
export const useAuth = ()=>{
  const [CU , setCU] = useState(null)
  useEffect(()=>{
   const unsub = onAuthStateChanged(auth , (user)=>{setCU(user)})
   return unsub
  },[])
  return CU
}

