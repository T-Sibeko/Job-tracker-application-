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
        statusBadge.className = `badge text-bg-${statusStyles[job.status] || "secondary"}`;
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
    const location = document.getElementById("location").value.trim();

    if (!position || !company || !location) {
        alert("Please fill in all required fields");
        return;
    }

    const resume = document.getElementById("resume").files[0];
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

    renderJobs();

    jobForm.reset();
    alert("Job Added Successfully!");
});

renderJobs();