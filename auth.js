import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    // sign up the user
    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        console.log(cred.user);
        alert("Account created successfully!")
        const modal = document.querySelector("#modal-signup")
        M.Modal.getInstance(modal).close();
        signupForm.reset()
    })
    .catch((err) => {
            console.error(err.message);
        });
});