/*Nav*/

/*buttons selection*/
const navLinks = document.querySelectorAll(
    ".navbar-contents button"
);

/*page sections*/
const pages = document.querySelectorAll(
    ".page-section"
);



const pageNames = {

    "dashboard": "dashboard",
    "resume": "resume",
    "add-application": "add-application",
    "jobs-of-interest": "jobs-of-interest",
    "settings": "settings"

};


/*Page display*/
function showPage(pageId) {

    /*button's data-page value to  section id*/
    const actualPageId = pageNames[pageId] || pageId;

    

const selectedPage = document.getElementById(actualPageId);

    /*Page handling error*/
    if (!selectedPage)
         {console.error("Sorry, page not found:", actualPageId);
        return;}

    /*Handle inactive sections*/
    pages.forEach(function(page) {
        page.classList.remove("active");
    }
)
;

    /*Active page*/
    selectedPage.classList.add("active");

    /*Inactive button design*/
    navLinks.forEach(function(button) {
        button.classList.remove("active");
        button.removeAttribute("aria-current");
    }
)
;

    /*button linked to selected page*/
    const activeButton = Array.from(navLinks).find(function(button) {return button.dataset.page === pageId;
    });

    /*Active button*/
    if (activeButton) 
        {
        activeButton.classList.add("active");
        activeButton.setAttribute("aria-current", "page");
    }

}

/* Collapse and expand the side bar*/

const sidebar = document.querySelector(".sidenavbar");

const sidebarToggle = document.getElementById("sidebar-toggle");

sidebarToggle.addEventListener("click", function() 
{sidebar.classList.toggle("collapsed");
    const isCollapsed = sidebar.classList.contains("collapsed");

    sidebarToggle.setAttribute("aria-expanded",!isCollapsed);

    sidebarToggle.setAttribute(
        "aria-label",isCollapsed ? "Expand navigation" : "Collapse navigation");


});


navLinks.forEach(function(button) 
{button.addEventListener("click", function() 
    {const selectedPage = button.dataset.page;
        showPage(selectedPage);

    }
);});

const homeLink=document.querySelector(".Navbar");

homeLink.addEventListener("click",function(event)
{event.preventDefault();
    showPage("dashboard");
}
);

/*Dashboard as a landing page*/
showPage("dashboard");



/* Profile picture setup */

/*Picture upload*/
const profilePicture = document.getElementById("profile-picture");

/*Preview*/
const resumeProfilePreview = document.getElementById("resume-profile-preview");


/*Picture selection*/
profilePicture.addEventListener("change", function() {

    const selectedFile = profilePicture.files[0];

    if (!selectedFile) 
        { return;}

    /*Image verification- prohibit files*/
    if (!selectedFile.type.startsWith("image/")) 
        {alert("Please select a valid image.");
            profilePicture.value = "";
            return;
    }

    /*URL for picture (temp)*/
    const imageURL = URL.createObjectURL(selectedFile);

    /* Display*/
    resumeProfilePreview.src = imageURL;

});



/* Uploading of supporting documents */

/*Docs upload */
const cvUpload = document.getElementById("cv-upload");

/* Display uploaded file name*/
const cvFileName = document.getElementById("cv-file-name");


cvUpload.addEventListener("change", function() {

    const selectedFile = cvUpload.files[0];

    if (selectedFile) 
        {cvFileName.textContent =
            selectedFile.name + " selected.";} 
            else {cvFileName.textContent = "There are currently no documents added.";

}});



/*Online resume submission*/

const resumeMessage = document.getElementById("resume-message");


const resumeForm = document.getElementById("resume-form");

/*Preserve data*/

resumeForm.addEventListener("submit", function(event) 
{ event.preventDefault();

    resumeMessage.textContent ="Your resume details have been updated successfully.";
    resumeMessage.classList.add("success-message");

});

/* Button to customized CV */

const canvaButton = document.getElementById("canva-button");


/*Navigation to Canva*/
canvaButton.addEventListener("click", function() {

    window.open(
        "https://www.canva.com/resumes/templates/",
        "_blank",
        "noopener,noreferrer"
    );
}
)
;

/* Themes*/

const themeOptions = document.querySelectorAll(
    'input[name="theme"]'
);


/*Theme selection*/
function changeTheme(themeName) 

{document.body.dataset.theme = themeName;

}

/*Theme updates*/

// Default
changeTheme("teal");

themeOptions.forEach(function(option) 
{option.checked = option.value === "teal";}
);


themeOptions.forEach(function(option) 
{
    option.addEventListener("change", function() 
    {if (option.checked) {changeTheme(option.value);}});

}
);

/*Intrested jobs*/
const jobSearchForm = document.getElementById("jobSearchForm");

jobSearchForm.addEventListener("submit", function(event) 
{event.preventDefault();

    const category = document.getElementById("jobCategory").value;
    const location = document.getElementById("jobLocation").value;

    if (!category || !location) 
        {alert("Please select a job category and location.");
        return;
    }

    const pnetURL =`https://www.pnet.co.za/jobs/${encodeURIComponent(category)}/in-${encodeURIComponent(location)}`;

    window.open(pnetURL, "_blank");
});



/* Font settings*/

/* Options*/
const fontChoice = document.getElementById("font-choice");


fontChoice.addEventListener("change", function() {

    /*Resetting previous font*/
    document.body.classList.remove("font-classic");

    
    if (fontChoice.value === "classic") {document.body.classList.add("font-classic");

    }

}
)
;


/*Default*/
document.body.classList.remove("font-classic");


/*Popup */

const publicProfileButton = document.getElementById("public-profile-button");

const publicProfilePopup = document.getElementById("public-profile-popup");

const publicYes = document.getElementById("public-yes");

const publicNo = document.getElementById("public-no");


publicProfileButton.addEventListener("click", function() {publicProfilePopup.hidden = false;

});

/* Yes  selection */

publicYes.addEventListener("click", function() {publicProfilePopup.hidden = true;});

/* No selecttion*/

publicNo.addEventListener("click", function() 
{publicProfilePopup.hidden = true;});

/* ADD APPLICATION */

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

const statusStyles = {
    Applied: "primary",
    Interview: "warning",
    Offer: "success",
    Rejected: "danger"
};

function renderJobs() {

    jobList.innerHTML = "";

    jobs.forEach(function(job) {

        const column = document.createElement("div");
        column.className = "col-md-4 mb-3";

        const card = document.createElement("div");
        card.className = "job-card";

        const title = document.createElement("h4");
        title.textContent = job.position;
        card.appendChild(title);

        [
            ["Company", job.company],
            ["Location", job.location],
            ["Type", job.type],
            ["Application Date", job.applicationDate || "Not specified"],
            ["CV", job.resume]
        ].forEach(function([label, value]) {

            const detail = document.createElement("p");

            const text = document.createElement("strong");
            text.textContent = `${label}: `;

            detail.append(text, document.createTextNode(value));
            card.appendChild(detail);

        });

        const status = document.createElement("p");

        const statusLabel = document.createElement("strong");
        statusLabel.textContent = "Status: ";

        const statusBadge = document.createElement("span");
        statusBadge.className =
            `badge text-bg-${statusStyles[job.status] || "secondary"}`;

        statusBadge.textContent = job.status;

        status.append(statusLabel, statusBadge);
        card.appendChild(status);

        column.appendChild(card);
        jobList.appendChild(column);

    });

}


jobForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const position = document.getElementById("position").value.trim();
    const company = document.getElementById("company").value.trim();
    const location = document.getElementById("job-location").value.trim();

    if (!position || !company || !location) {
        alert("Please fill in all required fields");
        return;
    }

    const resume = document.getElementById("job-resume-file").files[0];

    jobs.push({

        position,
        company,
        location,

        status: document.getElementById("status").value,
        type: document.getElementById("type").value,

        applicationDate: document.getElementById("applicationDate").value,

        resume: resume ? resume.name : "No File Uploaded"

    });

    localStorage.setItem("jobs", JSON.stringify(jobs));

    document.dispatchEvent(new Event("jobsUpdated"));

    renderJobs();

    jobForm.reset();

    alert("Job Added Successfully!");

});

renderJobs();

/* Dashboard*/

(function () {

    let jobChart = null;

    function updateDashboard() {

        const dashboard = document.getElementById("dashboard");

        if (!dashboard) return;

        // Retrieve applications from Add Application
        const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

        // Update statistic cards
        document.getElementById("totalJobs").textContent = jobs.length;

        document.getElementById("interviewJobs").textContent =
            jobs.filter(job => job.status === "Interview").length;

        document.getElementById("offerJobs").textContent =
            jobs.filter(job => job.status === "Offer").length;

        document.getElementById("rejectedJobs").textContent =
            jobs.filter(job => job.status === "Rejected").length;

        // Prepare chart data
        const statuses = ["Applied", "Interview", "Offer", "Rejected"];

        const statusCounts = statuses.map(status =>
            jobs.filter(job => job.status === status).length
        );


        const chartCanvas = document.getElementById("jobChart");

        if (!chartCanvas || typeof Chart === "undefined") return;

        // match the current theme colours
        const styles = getComputedStyle(document.body);

        const textColour = styles.getPropertyValue("--text").trim();
        const primaryColour = styles.getPropertyValue("--primary").trim();
        const mutedColour = styles.getPropertyValue("--muted").trim();

        const chartColours = [
            primaryColour,
            "#D9A441",
            "#AD7181",
            "#765078"
        ];

        // Prevent duplicates
        if (jobChart) {

            jobChart.data.datasets[0].data = statusCounts;
            jobChart.data.datasets[0].backgroundColor = chartColours;

            jobChart.options.plugins.legend.labels.color = textColour;
            jobChart.options.scales.x.ticks.color = textColour;
            jobChart.options.scales.y.ticks.color = textColour;
            jobChart.options.scales.y.grid.color = mutedColour;

            jobChart.update();

            return;
        }

// Chart creation
const chartContext = chartCanvas.getContext("2d");

jobChart = new Chart(chartContext, {type: "bar",

    data: {labels: statuses,

        datasets: [{
                label: "Applications",
                data: statusCounts,
                backgroundColor: chartColours,
                borderRadius: 6
                }]
            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        labels: {
                            color: textColour
                        }
                    }
                },

                scales: {

                    y: {
                        beginAtZero: true,

                        ticks: {
                            precision: 0,
                            color: textColour
                        },

                        grid: {
                            color: mutedColour
                        }
                    },

                    x: {
                        ticks: {
                            color: textColour
                        },

                        grid: {
                            display: false
                        }
                    }

                }

            }

        });

    }

    document.addEventListener("jobsUpdated",updateDashboard);

    // Initial dashboard display
    updateDashboard();

    // Refresh when Dashboard is selected
    document.querySelectorAll(
        '.navbar-contents button[data-page="dashboard"]'
    ).forEach(button => {
        button.addEventListener("click", updateDashboard);
    });

    // Refresh chart colours to match theme
    document.querySelectorAll('input[name="theme"]').forEach(input => {
        input.addEventListener("change", updateDashboard);
    });

})();


/* Profile button*/

const profileToggle = document.getElementById("profile-toggle");

const profilePanel = document.getElementById("profile-panel");

const profileClose = document.getElementById("profile-close");

const profileForm = document.getElementById("profileForm");

const savedProfileImage = document.getElementById("savedProfileImage");

const topProfilePreview = document.getElementById("top-profile-preview");

const profileImageInput = document.getElementById("profileImage");

const profileMessage = document.getElementById("profile-message");

const differentAccountButton = document.getElementById("different-account-button");


/* Input fields */
const profileFields = {

    firstName: document.getElementById("profileFirstName"),
    lastName: document.getElementById("profileLastName"),
    email: document.getElementById("profileEmail"),
    phone: document.getElementById("profilePhone"),
    address: document.getElementById("profileAddress"),
    bio: document.getElementById("profileBio")
};


/* Saved the profile */
let profile = JSON.parse(
    localStorage.getItem("profile") || "null"
);


/* Image memory */
let profileImageData = profile?.profileImageData || "";


/* Previously information */
if (profile) {

Object.keys(profileFields).forEach(function(field) { profileFields[field].value = profile[field] || "";

    });

if (profileImageData) { topProfilePreview.src = profileImageData;
    savedProfileImage.textContent = "Previously saved profile picture.";} 
    else { savedProfileImage.textContent = profile.profileImage && profile.profileImage !== "No Image"? "Previously selected: " + profile.profileImage : "";

    }

}



profileToggle.addEventListener("click", function() { profilePanel.hidden = !profilePanel.hidden;

    profileToggle.setAttribute( "aria-expanded",
        String(!profilePanel.hidden)
    );

});


profileClose.addEventListener("click", function() { profilePanel.hidden = true;
profileToggle.setAttribute("aria-expanded", "false");

});


/* Profile picture */
profileImageInput.addEventListener("change", function() {

    const selectedFile = profileImageInput.files[0];

    if (!selectedFile) return; 
    if (!selectedFile.type.startsWith("image/")) { alert("Please select a valid image.");

        profileImageInput.value = "";
        return;

    }

    const reader = new FileReader();

    reader.onload = function(event) {

        profileImageData = event.target.result;
        topProfilePreview.src = profileImageData;
        savedProfileImage.textContent = selectedFile.name;

    };

    reader.readAsDataURL(selectedFile);

});


/* Save the profile */
profileForm.addEventListener("submit", function(event) { event.preventDefault();

    const firstName = profileFields.firstName.value.trim();
    const lastName = profileFields.lastName.value.trim();
    const email = profileFields.email.value.trim();
    const phone = profileFields.phone.value.trim();
    const address = profileFields.address.value.trim();
    const bio = profileFields.bio.value.trim();

    if (!firstName || !email) {
        alert("Please enter your first name and email address.");
         return;
    }

    const savedProfile = {

        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        bio: bio,

        profileImage: profileImageInput.files[0] ? profileImageInput.files[0].name : (profile?.profileImage || "No Image"), profileImageData: profileImageData

    };


    try {

        localStorage.setItem( "profile",
            JSON.stringify(savedProfile)
        );

        profile = savedProfile;

        profileMessage.textContent =
            "Your profile has been saved successfully.";

        profileMessage.classList.add("visible");

        savedProfileImage.textContent = profile.profileImage !== "No Image" ? "Saved picture: " + profile.profileImage : "No profile picture uploaded."; } catch (error) {

        profileMessage.textContent =
            "Unable to save your profile. Try using a smaller picture.";

        profileMessage.classList.add("visible");

    }

});


/* Sign in option button */
differentAccountButton.addEventListener("click", 
    function() {alert("Sign in with another account is not connected yet.");

});