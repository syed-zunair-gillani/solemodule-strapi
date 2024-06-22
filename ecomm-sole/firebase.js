// utils/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLUANWQuykWUgKdwR_mne3KXLUVL2Uh5w",
  authDomain: "react-website-ba066.firebaseapp.com",
  databaseURL: "https://react-website-ba066-default-rtdb.firebaseio.com",
  projectId: "react-website-ba066",
  storageBucket: "react-website-ba066.appspot.com",
  messagingSenderId: "931071068458",
  appId: "1:931071068458:web:beadc79ecd62dbea09b653",
  measurementId: "G-P0Q5FQ2R7E",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
