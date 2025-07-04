// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAM_ieuAoD...TfNs",
  authDomain: "unitypersistenciataller.firebaseapp.com",
  databaseURL: "https://unitypersistenciataller-default-rtdb.firebaseio.com",
  projectId: "unitypersistenciataller",
  storageBucket: "unitypersistenciataller.appspot.com",
  messagingSenderId: "920041981012",
  appId: "1:920041981012:web:36b71384c543940e9619c1"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
