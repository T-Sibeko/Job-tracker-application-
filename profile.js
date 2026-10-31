const profileForm = document.getElementById("profileForm");
const savedProfileImage = document.getElementById("savedProfileImage");
const profile = JSON.parse(localStorage.getItem("profile") || "null");

if (profile) {
    ["firstName", "lastName", "email", "phone", "address"].forEach(function(field) {
        document.getElementById(field).value = profile[field] || "";
    });
}

function showSavedImageName(imageName) {
    savedProfileImage.textContent = imageName && imageName !== "No Image"
        ? `Previously selected file: ${imageName} (select it again to upload the file)`
        : "";
}

showSavedImageName(profile && profile.profileImage);

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const profileImage = document.getElementById("profileImage").files[0];

    if (!firstName || !email) {
        alert("Please complete all required fields");
        return;
    }

    const savedProfile = {
        firstName,
        lastName,
        email,
        phone,
        address,
        profileImage: profileImage
            ? profileImage.name
            : (profile && profile.profileImage) || "No Image"
    };

    localStorage.setItem("profile", JSON.stringify(savedProfile));
    showSavedImageName(savedProfile.profileImage);

    alert("Profile Saved Successfully!");
});