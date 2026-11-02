let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("signupForm").addEventListener("submit", function(e){

    e.preventDefault();

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    let user = {
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        profilePicture: "images/default-user.png"
    };

    localStorage.setItem("user", JSON.stringify(user));

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    document.getElementById("signupForm").reset();

    window.location.href = "log-in.html";
});
