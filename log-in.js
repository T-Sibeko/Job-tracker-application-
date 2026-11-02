// Display username and profile picture
let user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("userNameDisplay").textContent =
        user.username;

    }



// Login functionality
document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if(
        user &&
        user.username === username &&
        user.password === password
    ){

        localStorage.setItem("loggedInUser", username);

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Username or Password");

    }

});