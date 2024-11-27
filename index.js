class NeuroTracker {
    constructor() {
        this.tasks = [];
        this.history = []; // Array to store task history
        this.workStyle = 'Flexible';
        this.initEventListeners();
        this.updateLiveDate();
    }

    initEventListeners() {
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskInput = document.getElementById('taskInput');

        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if (taskText) {
                this.addTask(taskText);
                taskInput.value = '';
            }
        });
    }

    updateLiveDate() {
        const liveDate = document.getElementById('liveDate');
        setInterval(() => {
            liveDate.textContent = `Current Date: ${new Date().toLocaleString()}`;
        }, 1000);
    }

    generateAISuggestions(task) {
        const suggestions = {
            'Deep focus': [
                'Break task into 25-minute focused sessions',
                'Use noise-cancelling headphones',
                'Minimize digital distractions'
            ],
            'Flexible': [
                'Create flexible time blocks',
                'Allow short breaks between task segments',
                'Use adaptive scheduling techniques'
            ],
            'Structured': [
                'Create detailed step-by-step checklist',
                'Set precise time allocations',
                'Use rigid time management techniques'
            ]
        };

        return suggestions[this.workStyle];
    }

    addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            progress: 0,
            status: 'Pending',
            estimTime: '10 minutes',
            timeTaken: '0 minutes',
            note: '',
            suggestions: this.generateAISuggestions(taskText)
        };

        this.tasks.push(task);
        this.history.push({ 
            date: new Date().toLocaleString(),
            title: {
                text: task.text,
                suggestions: task.suggestions,
                status: task.status,
                estimTime: task.estimTime,
                timeTaken: task.timeTaken,
                note: task.note
            }
        });

        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <div class="task-header">
                    <span>${task.text}</span>
                    <button class="delete-btn" data-task-id="${task.id}">Delete</button>
                </div>
                <div class="task-progress">
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="${task.progress}"
                        class="progress-slider"
                        data-task-id="${task.id}"
                    >
                    <span>${task.progress}%</span>
                </div>
                <div class="ai-suggestions">
                    <strong>AI Suggestions:</strong>
                    <ul>
                        ${task.suggestions.map(suggestion => 
                            `<li>${suggestion}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="task-meta">
                    <label>Status: 
                        <select class="status-dropdown" data-task-id="${task.id}">
                            <option ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </label>
                    <label>Estimated Time: 
                        <select class="estim-time-dropdown" data-task-id="${task.id}">
                            <option>10 minutes</option>
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>5 hours</option>
                        </select>
                    </label>
                    <label>Time Taken: 
                        <select class="time-taken-dropdown" data-task-id="${task.id}">
                            <option>0 minutes</option>
                            <option>10 minutes</option>
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>5 hours</option>
                        </select>
                    </label>
                    <label>Note: 
                        <textarea class="task-note" data-task-id="${task.id}">${task.note}</textarea>
                    </label>
                </div>
            `;

            // Add event listeners for dropdowns, textarea, and delete button
            this.addEventListenersToTask(taskElement, task);

            taskList.appendChild(taskElement);
        });
    }

    addEventListenersToTask(taskElement, task) {
        const slider = taskElement.querySelector('.progress-slider');
        slider.addEventListener('input', (e) => {
            const progress = e.target.value;
            this.updateTaskProgress(task.id, progress);
        });

        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            this.deleteTask(task.id);
        });

        const statusDropdown = taskElement.querySelector('.status-dropdown');
        statusDropdown.addEventListener('change', (e) => {
            this.updateTaskStatus(task.id, e.target.value);
            if(e.target.value == "Completed"){
                taskElement.style.backgroundColor = "green";
            }
        });

        const estimTimeDropdown = taskElement.querySelector('.estim-time-dropdown');
        estimTimeDropdown.addEventListener('change', (e) => {
            this.updateTaskEstimation(task.id, e.target.value);
        });

        const timeTakenDropdown = taskElement.querySelector('.time-taken-dropdown');
        timeTakenDropdown.addEventListener('change', (e) => {
            this.updateTaskTimeTaken(task.id, e.target.value);
        });

        const noteTextarea = taskElement.querySelector('.task-note');
        noteTextarea.addEventListener('input', (e) => {
            this.updateTaskNote(task.id, e.target.value);
        });
    }

    updateTaskProgress(taskId, progress) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.progress = progress;
            this.renderTasks();
        }
    }

    updateTaskStatus(taskId, status) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
        }
    }

    updateTaskEstimation(taskId, estimTime) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.estimTime = estimTime;
        }
    }

    updateTaskTimeTaken(taskId, timeTaken) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.timeTaken = timeTaken;
        }
    }

    updateTaskNote(taskId, note) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.note = note;
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.renderTasks();
    }
}
// Get the canvas element
const ctx = document.getElementById('lineChart').getContext('2d');

// Create the Line Chart
const lineChart = new Chart(ctx, {
    type: 'line', // Specify the chart type
    data: {
        labels: ['Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday', 'Sudnay'], // X-axis labels
        datasets: [{
            label: 'Daily Progress Chart Placeholder',
            data: [10, 8, 9, 10, 10, 9, 10], // Y-axis data
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill under the line
            borderWidth: 2, // Line width
            tension: 0.4 // Curvature of the line (0 = straight lines)
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Show legend
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'days'
                }
            },
            y: {
                beginAtZero: true, // Y-axis starts from zero
                title: {
                    display: true,
                    text: 'Score'
                }
            }
        }
    }
});

// Initialize the app
const neuroTracker = new NeuroTracker();
