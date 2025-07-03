// Get the todo list and form elements
const todoList = document.getElementById('todo-items');
const todoForm = document.getElementById('add-todo-form');
const todoInput = document.getElementById('todo-input');

// Initialize an empty array to store todo items
let todoItems = [];

// Function to render a single todo item
function renderTodoItem(item) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
        <span>${item.text}</span>
        <button class="complete-btn">Complete</button>
        <button class="remove-btn">Remove</button>
    `;

    // Add event listeners to the complete and remove buttons
    todoItem.querySelector('.complete-btn').addEventListener('click', () => {
        item.completed = true;
        todoItem.classList.add('completed');
    });

    todoItem.querySelector('.remove-btn').addEventListener('click', () => {
        const index = todoItems.indexOf(item);
        if (index !== -1) {
            todoItems.splice(index, 1);
            todoList.removeChild(todoItem);
        }
    });

    // Add the todo item to the list
    todoList.appendChild(todoItem);

    // Add a fade-in animation to the todo item
    todoItem.classList.add('fade-in');
}

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();

    // Get the text from the input field
    const text = todoInput.value.trim();

    // Check if the text is not empty
    if (text) {
        // Create a new todo item object
        const item = {
            text,
            completed: false
        };

        // Add the todo item to the array
        todoItems.push(item);

        // Render the todo item
        renderTodoItem(item);

        // Clear the input field
        todoInput.value = '';
    } else {
        // Display an error message if the text is empty
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please enter a todo item';
        todoForm.appendChild(errorMessage);

        // Remove the error message after 2 seconds
        setTimeout(() => {
            todoForm.removeChild(errorMessage);
        }, 2000);
    }
}

// Add an event listener to the form
todoForm.addEventListener('submit', handleFormSubmission);