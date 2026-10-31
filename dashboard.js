const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

document.getElementById("totalJobs").textContent = jobs.length;
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

new Chart(chartContext, {
    type: "bar",
    data: {
        labels: statuses,
        datasets: [{
            label: "Applications",
            data: statusCounts,
            backgroundColor: ["#36cbd1", "#ffc107", "#198754", "#dc3545"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    color: "white"
                }
            },
            x: {
                ticks: {
                    color: "white"
                }
            }
        }
    }
});
