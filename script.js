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

    sidebarToggle.setAttribute(
        "aria-expanded",!isCollapsed);

    sidebarToggle.setAttribute(
        "aria-label",
        isCollapsed ? "Expand navigation" : "Collapse navigation");

    sidebarToggle.innerHTML = isCollapsed? '<i class="bi bi-list"></i>': '<i class="bi bi-list"></i>';

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
const profilePreview = document.getElementById("profile-preview");


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
    profilePreview.src = imageURL;

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



resumeForm.addEventListener("submit", function(event) 
{

    //Preserve data*/
    event.preventDefault();


    /*Confirmation notification*/
    resumeMessage.textContent ="Your resume details have been updated successfully.";

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