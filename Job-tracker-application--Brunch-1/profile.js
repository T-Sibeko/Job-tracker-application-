const profileForms = document.querySelectorAll("[data-profile-form]");

profileForms.forEach(function(profileForm) {

    const savedProfileImage = profileForm.querySelector(".account-saved-image");
    const profileImageInput = profileForm.elements.namedItem("profileImage");
    const profileMessage = profileForm.querySelector(".account-profile-message");

    profileImageInput.addEventListener("change", function() {

        const selectedFile = profileImageInput.files[0];

        if (selectedFile) {
            savedProfileImage.textContent =
                `Selected file: ${selectedFile.name}`;
        } else {
            savedProfileImage.textContent = "";
        }

    });

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const firstName = profileForm.elements.namedItem("firstName").value.trim();
        const lastName = profileForm.elements.namedItem("lastName").value.trim();
        const email = profileForm.elements.namedItem("email").value.trim();
        const phone = profileForm.elements.namedItem("phone").value.trim();
        const address = profileForm.elements.namedItem("address").value.trim();

        const profileImage = profileImageInput.files[0];

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
            profileImage: profileImage ? profileImage.name : "No Image"
        };

        try {

            // Save profile
            localStorage.setItem(
                "profile",
                JSON.stringify(savedProfile)
            );

            // Clear the form
            profileForm.reset();

            // Clear file name text
            if (savedProfileImage) {
                savedProfileImage.textContent = "";
            }

            // Success message
            if (profileMessage) {
                profileMessage.textContent =
                    "Profile saved successfully!";
            } else {
                alert("Profile saved successfully!");
            }

        } catch (error) {

            if (profileMessage) {
                profileMessage.textContent =
                    "Unable to save profile. Please try again.";
            } else {
                alert("Unable to save profile. Please try again.");
            }

            console.error(error);
        }

    });

});