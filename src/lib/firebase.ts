import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add this import
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYwS2qjB95g15UH7vn2uxjsMtuGSeQy0Q",
  authDomain: "student-dashboard-3375d.firebaseapp.com",
  projectId: "student-dashboard-3375d",
  storageBucket: "student-dashboard-3375d.firebasestorage.app",
  messagingSenderId: "494533968301",
  appId: "1:494533968301:web:de4e85012a2213a6fbe124",
  measurementId: "G-8VGKB9BBTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth
const db = getFirestore(app);

// Export the services you want to use
export { auth,db }; // Add this export
export default app;