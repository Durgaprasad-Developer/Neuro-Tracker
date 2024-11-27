let chartInstance;

// Function to render Chart.js
function renderChart(labels, data, title,type) {
    const ctx = document.getElementById('progressChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy(); // Clear the existing chart
    }

    chartInstance = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                x: { title: { display: true, text: 'Tasks' } },
                y: { title: { display: true, text: 'Score' }, beginAtZero: true }
            }
        }
    });
}

// Dummy daily task data
const dailyTasks = [
    { name: 'Task 1', status: 'Completed' },
    { name: 'Task 2', status: 'In Progress' },
    { name: 'Task 3', status: 'Pending' }
];

// Function to show daily tasks
function showDaily() {
    document.getElementById('taskMatrix').style.display = 'block';
    document.getElementById('badge').style.display = 'block';
    let type = 'bar';

    const tasksTable = document.getElementById('tasksTable');
    tasksTable.innerHTML = '';

    const statusCount = { Completed: 0, 'In Progress': 0, Pending: 0 };
    let totalScore = 0;
    const maxScore = 10;

    dailyTasks.forEach(task => {
        const score = task.status === 'Completed' ? 5 : task.status === 'In Progress' ? 3 : 1;
        totalScore += score;
        statusCount[task.status]++;

        tasksTable.innerHTML += `
            <tr>
                <td>${task.name}</td>
                <td>${task.status}</td>
                <td>${score}</td>
            </tr>
        `;
    });

    const taskScores = [5, 3, 1]; 
    const maxWeeklyScore = 5;

    renderChart(['task 1','task 2', 'task 3'], taskScores, 'daily Progress',type);

    // Display chart for daily progress
    // renderChart(['Completed', 'In Progress', 'Pending'], [statusCount.Completed, statusCount['In Progress'], statusCount.Pending], 'Daily Progress',type);

    // Display badge based on score
    displayBadge(totalScore, maxScore);
}

// Function to show weekly progress and badge
function showWeekly() {
    document.getElementById('taskMatrix').style.display = 'none';
    document.getElementById('badge').style.display = 'block';
    let type = 'line';

    const weeklyScores = [7, 6, 8, 5, 7, 6, 8]; // Example data
    const totalWeeklyScore = weeklyScores.reduce((a, b) => a + b, 0);
    const maxWeeklyScore = 10;

    renderChart(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], weeklyScores, 'Weekly Progress',type);

    displayBadge(totalWeeklyScore, maxWeeklyScore);
}

// Function to show monthly progress
function showMonthly() {
    document.getElementById('taskMatrix').style.display = 'none';
    document.getElementById('badge').style.display = 'block';
    let type = 'line';

    const monthlyScores = Array(30).fill(5).map(() => Math.floor(Math.random() * 10 + 1));
    renderChart(Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), monthlyScores, 'Monthly Progress',type);

    const totalMonthlyScore = monthlyScores.reduce((a, b) => a + b, 0);
    const maxMonthlyScore = 10;
    
    displayBadge(totalMonthlyScore, maxMonthlyScore);
}

// Function to show yearly progress
function showYearly() {
    document.getElementById('taskMatrix').style.display = 'none';
    document.getElementById('badge').style.display = 'block';
    let type = 'liner';

    const yearlyScores = Array(12).fill(5).map(() => Math.floor(Math.random() * 10 + 1));
    renderChart(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], yearlyScores, 'Yearly Progress',type);

    const totalYearlyScore = yearlyScores.reduce((a, b) => a + b, 0);
    const maxYearlyScore = 10;

    displayBadge(totalYearlyScore, maxYearlyScore);
}

// Function to display badge based on score
function displayBadge(totalScore, maxScore) {
    const badge = document.getElementById('badge');
    const scorePercentage = (totalScore / maxScore) * 100;

    if (scorePercentage >= 70) {
        badge.textContent = 'Focus Student';
        badge.className = 'badge focus';
    } else if (scorePercentage >= 50) {
        badge.textContent = 'Productive';
        badge.className = 'badge productive';
    } else {
        badge.textContent = 'Procrastination';
        badge.className = 'badge procrastination';
    }
}

// Call the showDaily function by default
showDaily();
