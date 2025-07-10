// function ThemeMode() {
//     const body = document.body;
//     const dark = document.querySelector(".darkMode");
//     body.classList.toggle("dark-mode");
//     dark.textContent = body.classList.contains("dark-mode") ? "🌞" : "🌙";
// }

let tasks = [];
let currentFilter = "all";

window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
});

function addTask() {
    const titleInput = document.getElementById("taskName");
    const descInput = document.getElementById("taskDesc");
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title) {
        alert("Enter the fields");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        desc: desc,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    titleInput.value = "";
    descInput.value = "";
    renderTasks();
    charCounter();
}

function renderTasks() {
    const container = document.querySelector(".task-container");
    container.innerHTML = "";

    const filtered = tasks.filter(task => {
        if (currentFilter === "all") return true;
        if (currentFilter === "pending") return !task.completed;
        if (currentFilter === "completed") return task.completed;
    });

    filtered.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
        <div class="task-title">${task.title}</div>
        <div class="task-desc" title="Click to expand">${task.desc}</div>
        <button class="delete-btn">Delete</button>
    `;

   
    card.querySelector("input").addEventListener("change", function () {
        task.completed = this.checked;
        saveTasks();
        renderTasks();
    });

 
    const descEl = card.querySelector(".task-desc");
    descEl.addEventListener("click", () => {
        descEl.classList.toggle("expanded");
    });

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
         const confirmed = confirm(`Are you sure you want to delete "${task.title}"?`);
        if(confirm){
        tasks = tasks.filter(t => t.id !== task.id); 
        
        saveTasks();                               
        renderTasks();
    }                   
    });

    container.appendChild(card);
});
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

function charCounter() {
    const desc = document.getElementById("taskDesc");
    const count = document.querySelector(".charCount");
    count.textContent = `${desc.value.length} / 50`;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

