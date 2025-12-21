import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { auth } from "./firebase.js";

// signup
const signupForm = document.querySelector("#signup-form");
if (signupForm) {                               // makes logout modal work on all pages outside login.html
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        //get user info
        const email = signupForm["signup-email"].value;
        const password = signupForm["signup-password"].value;

        // sign up the user
        createUserWithEmailAndPassword(auth, email, password).then(cred => {
                alert("Account created successfully!");
                const modal = document.querySelector("#modal-signup");
                M.Modal.getInstance(modal).close();
                signupForm.reset();
            })

            .catch((err) => {
                console.error(err.message);
                alert("Unable to create account.")
            });
    });

}

// logout
const logout = document.getElementById("logout-popup");
const closeLogout = document.getElementById("close-logout");

document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth);
    logout.style.display = "flex";
});

closeLogout.addEventListener("click", () => {
    logout.style.display = "none";
})

// login
const loginForm = document.querySelector("#login-container");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        console.log(cred.user);
        window.location.href = "/WebsiteDevelopmentProject/geocaches.html";
    })
    .catch((err) => {
        console.error(err.message);
        alert("Login failed");
    });
})