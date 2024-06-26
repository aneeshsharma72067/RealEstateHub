import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore();
const storage = getStorage(firebaseApp);

const firestoreCollections = {
  USERS: "users",
  OWNERS: "owners",
  HOUSES: "houses",
  PLOTS: "plots",
  PG: "pg",
  RENTALS: "rentals",
};

export const firebaseStorage = {
  AVATAR: (imageName: string): string => {
    return `avatars/${imageName}`;
  },
  HOUSE: (imageName: string): string => {
    return `house/${imageName}`;
  },
};

export { firebaseApp, firebaseAuth, firestore, storage, firestoreCollections };
