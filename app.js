// Selectors


const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');







// Event listners
window.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('input', filterTodo);






// Function
function addTodo(event) {
    if (todoInput.value !== '') {

        // prevent form from submitting

        event.preventDefault();
        // create todo div

        const todoDiv = document.createElement('div');
        // the above creates a new div
        todoDiv.classList.add('todo');
        // the above code creates  a class name todo so <div class = "todo">
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // add todo to localstorage
        saveLocalTodos(todoInput.value);


        console.log(newTodo);


        // checked mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // delete or trash 
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);


        // append to list 
        todoList.appendChild(todoDiv);

        // clearing the input field value
        todoInput.value = '';
        // bringing the focus to prvious element
        todoInput.focus();



    } else {
        alert('Please Fill the description');
        event.preventDefault();
        todoInput.focus();


    }

}


function deleteCheck(e) {
    // console.log(e.target);

    // delete the todo


    if (e.target.matches('.trash-btn')) {
        const todo = e.target.parentElement;
        // this below 1 line of classlist is to add animnation
        todo.classList.add('fall');
        // remove from locale storage
        removeLocalTodos(todo);

        // add special evetn listner which will help to delete the element after the animation
        todo.addEventListener('transitionend', () => todo.remove());


    }

    if (e.target.matches('.complete-btn')) {
        // changing the classlist and adding completed classlist in our css file
        e.target.parentElement.classList.toggle('completed');
    }
}


function filterTodo(e) {
    //console.log(e);
    const todos = todoList.childNodes;
    // check what we are clicking 
    console.log(todos);
    // to trigger the function only if we click the actual select case like all, completed and uncompleted
    todos.forEach(function (todo) {
        switch (e.target.value) {
            // here if it gets value all 
            case 'all':
                todo.style.display = "flex";

                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';

                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';


                }
                break;
        }


    });

}


// for locale storage saving todo

function saveLocalTodos(todo) {
    // check if there is already todo list in the storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {
    // check if there is already todo list in the storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {


        const todoDiv = document.createElement('div');
        // the above creates a new div
        todoDiv.classList.add('todo');
        // the above code creates  a class name todo so <div class = "todo">
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);



        //console.log(newTodo);


        // checked mark button

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // delete or trash 
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);


        // append to list 
        todoList.appendChild(todoDiv);

    })
}


function removeLocalTodos(todo) {
    // check if there is already todo list in the storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo);
    // here we want to get the index from the array and we get it by 
    const todoIndex = (todo.children[0].innerText);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}