
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCPKru3mfkGPmPgHyQm-TARLW76QsO1CRw",
    authDomain: "login-468fd.firebaseapp.com",
    projectId: "login-468fd",
    storageBucket: "login-468fd.appspot.com",
    messagingSenderId: "401960497322",
    appId: "1:401960497322:web:dc1a1d029d394945f820d3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//getting textfields and elements
const txtEmail = document.getElementById("email");
const txtPsw = document.getElementById("psw");
const btnLogin = document.getElementById("login");
const btnSignUp = document.getElementById("signUp");
const aFpsw = document.getElementById("fpsw");

//text-field variables
let email, psw;

//update text fields on input
txtEmail.oninput = () => {
    email = txtEmail.value.trim();
}

txtPsw.oninput = () => {
    psw = txtPsw.value.trim();
}

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
})

btnLogin.addEventListener("click", () => {
    firebase.auth().signInWithEmailAndPassword(email, psw)
        .then((userCredential) => {
            var user = userCredential.user;
            window.location.href = "loggedin.html";
        })
        .catch((error) => {
            console.error(error.code);
            if (error.code === "auth/user-not-found") {
                window.alert("User not found, click 'OK' to redirect to the Sign-Up page");
                window.location.href = "signup.html";
            }
            else if (error.code === "auth/wrong-password") {
                window.alert("Please enter the correct password");
            }
        });
});

aFpsw.addEventListener("click", () => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            window.alert("Password Reset email was sent");
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            console.log(error.code);
            if (error.code === "auth/user-not-found") {
                window.alert(`${error.message}. Click 'OK' to create a new account with ${email}`);
                window.location.href = "signup.html";
            }
            // ..
        });
})