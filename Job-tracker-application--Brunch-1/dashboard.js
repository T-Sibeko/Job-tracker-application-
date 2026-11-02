const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

document.getElementById("totalJobs").textContent = jobs.length;
document.getElementById("appliedJobs").textContent = jobs.filter(
    job => job.status === "Applied"
).length;
document.getElementById("interviewJobs").textContent = jobs.filter(
    job => job.status === "Interview"
).length;
document.getElementById("offerJobs").textContent = jobs.filter(
    job => job.status === "Offer"
).length;
document.getElementById("rejectedJobs").textContent = jobs.filter(
    job => job.status === "Rejected"
).length;

const statuses = ["Applied", "Interview", "Offer", "Rejected"];
const statusCounts = statuses.map(
    status => jobs.filter(job => job.status === status).length
);

const chartContext = document.getElementById("jobChart").getContext("2d");
const themeStyles = getComputedStyle(document.body);
const textColor = themeStyles.getPropertyValue("--text").trim();
const chartColors = [
    themeStyles.getPropertyValue("--primary").trim(),
    themeStyles.getPropertyValue("--status-interview").trim(),
    themeStyles.getPropertyValue("--status-offer").trim(),
    themeStyles.getPropertyValue("--status-rejected").trim()
];

new Chart(chartContext, {
    type: "bar",
    data: {
        labels: statuses,
        datasets: [{
            label: "Applications",
            data: statusCounts,
            backgroundColor: chartColors
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    color: textColor
                }
            },
            x: {
                ticks: {
                    color: textColor
                }
            }
        }
    }
});
