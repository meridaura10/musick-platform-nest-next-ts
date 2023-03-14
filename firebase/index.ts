import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDri30HcoDReF-BX1cRFvpU1i7ioDYEA1U",
  authDomain: "music-platform-41f06.firebaseapp.com",
  projectId: "music-platform-41f06",
  storageBucket: "music-platform-41f06.appspot.com",
  messagingSenderId: "601515314654",
  appId: "1:601515314654:web:115c1421f0c06caf18614f",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const audiosRef = ref(storage, "audio");
const storageRef = ref(storage);
