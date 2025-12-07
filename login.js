function responseReceivedHandler() {
    let message = document.getElementById("login-message");
    if (this.status == 200) {
        let result = this.response;
        if (result.success) {
            message.innerHTML = "<p style='color:green'>Logging in.</p>";
            setTimeout(() => window.location.href = "geocaches.html", 10000);
        }
        else {
            message.innerHTML = `<p style='color:red'>Error: ${result.error}</p>`;
        }
    }
    else {
        console.error("Request failed, status: " + this.status + " " + this.statusText);
        message.innerHTML = "<p style='color:red'>Server error. Please try again later.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("login-container");
    let createBtn = document.querySelector('button[type="button"]');

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let message = document.getElementById("login-message");

        if (!email || !password) {
            message.innerHTML = "<p style='color:red'>You must fill out all fields.</p>";
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", responseReceivedHandler);
        xhr.responseType = "json";

        let queryString = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
        xhr.open("POST", "login.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(queryString);
    });


        // Create Account
    createBtn.addEventListener("click", function() {
        let createAcct = window.confirm("Do you want to create an account?");
        if (createAcct) {
            let newEmail = window.prompt("Enter your email address: ");
            if (newEmail) {
                let newPassword = window.prompt("Enter your new password: ");
                if (newPassword) {
                    let reenterPassword = window.prompt("Please re-enter your password: ");
                    if (reenterPassword == newPassword) {
                        document.getElementById("login-message").innerHTML = "<p style='color:green'>Account created for: " + newEmail + "</p>";
                    }
                    else {
                        document.getElementById("login-message").innerHTML = "<p style='color:red'>Passwords do not match. Unable to create account.</p>";
                    }
                }
                else {
                    document.getElementById("login-message").innerHTML = "<p style='color:red'>Unable to create account, no password entered.</p>";
                }
            }
            else {
                document.getElementById("login-message").innerHTML = "<p style='color:red'>Account creation cancelled.</p>";
            }
        }
    });
});