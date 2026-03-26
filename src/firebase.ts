import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCF_dx0FPBuIxmxy2mQ33mypkde4hBvvR9XbXdI",
    authDomain: "react-test-app-2-a3d71.firebaseapp.com",
    projectId: "react-test-app-2-a3d71",
    storageBucket: "react-test-app-2-a3d71.appspot.com",
    messagingSenderId: "1061931426651",
    appId: "1:1061931426651:web:ecf80df634daf0f221f07e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { signInWithPopup, signOut };
