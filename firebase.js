import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQSZC4wdowd4N9Ez7sd5G4hzrT_NwNsSI",
    authDomain: "website-development-fall-2025.firebaseapp.com",
    projectId: "website-development-fall-2025",
    appId: "1:490461443020:web:8117ce052b08b348cd6369"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
