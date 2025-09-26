// Our application's state: an array of to-do objects
let todos = [];

// Get references to our HTML elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

// Function to render the list from the 'todos' array
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        
        // --- NEW: Create a clickable div for the status circle ---
        const statusCircle = document.createElement('div');
        statusCircle.classList.add('status-circle');
        
        // Add the 'completed' class if the task is already done
        if (todo.isCompleted) {
            statusCircle.classList.add('completed');
            li.classList.add('completed'); // Keep this for the text line-through
        }

        // --- NEW: Handle the click event on the circle ---
        statusCircle.onclick = () => {
            // Toggle the isCompleted status
            todo.isCompleted = !todo.isCompleted;
            // Save the updated list to local storage
            saveTodos();
            // Re-render the list to update the visual style
            renderTodos();
        };

        // Create the task text span
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = todo.text;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.style.border = 'none';
        deleteButton.style.cursor = 'pointer';
        deleteButton.onclick = () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        };

        // Append the new elements to the list item
        li.appendChild(statusCircle);
        li.appendChild(taskTextSpan);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// Handle form submission (adding a new task)
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTodoText = todoInput.value.trim();
    if (newTodoText !== '') {
        todos.push({ text: newTodoText, isCompleted: false });
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
});

loadTodos();
renderTodos();