import { FIREBASE_CONFIG } from "@src/config";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"

export const firebaseApp = initializeApp(FIREBASE_CONFIG)
export const firebaseAuth = getAuth(firebaseApp)
export const fireabaseStorage = getStorage(firebaseApp)