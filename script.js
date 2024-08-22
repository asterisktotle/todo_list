//SELECTORS
const userInput = document.getElementById('user-input');
const btnAdd = document.getElementById('btn-add');
const taskListUlElement = document.getElementById('tasks-list');
const filterButtons = document.querySelector('.filter-type');

//EVENT LISTENER
btnAdd.addEventListener('click', handleInput);
taskListUlElement.addEventListener('click', deleteCheck);
filterButtons.addEventListener('click', filterTask);
document.addEventListener('DOMContentLoaded', getTodos);

//FUNCTIONS
//check if the submitted task has value
function handleInput() {
	if (userInput.value.trim() === '') {
		return;
	} else addTodo();
}
//create a div element and display the input
function addTodo() {
	//create a taskDiv inside the ul
	const taskDiv = document.createElement('div');
	taskDiv.classList.add('taskDiv');
	//create a checkbox inside the taskDiv
	const checkBox = document.createElement('input');
	checkBox.classList.add('checkBox');
	checkBox.type = 'checkbox';
	//create an text li inside the taskDiv
	const textTodoLi = document.createElement('li');
	textTodoLi.classList.add('textTodo');
	textTodoLi.innerText = `${userInput.value}`;
	//save todos input value
	saveTodos(userInput.value);
	//create a delete button inside taskDiv
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('btn-delete');
	deleteBtn.innerText = 'Delete';
	//append the all element to taskDiv
	taskDiv.append(checkBox, textTodoLi, deleteBtn);
	//append taskDiv to Ul element
	taskListUlElement.appendChild(taskDiv);

	//clear input form box after the event
	userInput.value = '';
}

//delete and check button
function deleteCheck(event) {
	//get the target
	const targetElement = event.target;
	const targetParent = targetElement.parentElement;
	//getting the child's class inside the parent using querySelector
	const textElement = targetParent.querySelector('.textTodo');

	//DELETE TODO
	if (targetElement.classList[0] === 'btn-delete') {
		deleteLocalTodo(targetParent);
		//delete after fall animation
		targetParent.classList.add('fall');
		targetParent.addEventListener('transitionend', function () {
			targetParent.remove();
		});
	}

	//CHECK TODO
	if (targetElement.classList[0] === 'checkBox') {
		textElement.classList.toggle('completed-check');
		targetParent.classList.toggle('completed');
	}
}

//FILTER BUTTONS
function filterTask(event) {
	// Grab the HTMLCollection (which is like a list of elements)
	// and transform it into an array, so we can easily loop through it.
	const todos = Array.from(taskListUlElement.children);

	// The todos array contains each task's 'div' element as separate items
	// Example: ['div', 'div', ...]
	// You can only apply styles or functions to one element at a time,
	// so we need to loop through the todos array to grab each element.
	// In this loop, 'task' represents each element in the array.
	todos.forEach(function (task) {
		// The switch statement is similar to an if-else statement.
		// 'switch' checks the value in 'event.target.id'.
		// Each 'case' is like an 'if' condition checking for a specific value.
		// We are checking the id of the clicked filter button.
		switch (event.target.id) {
			case 'filter-all':
				// If the filter is 'all', show all tasks by setting display to 'flex'.
				task.style.display = 'flex';
				break;
			case 'filter-uncompleted':
				// If the filter is 'uncompleted' and the task does NOT have the 'completed' class,
				// show it. Otherwise, hide it
				if (!task.classList.contains('completed')) {
					task.style.display = 'flex';
				} else task.style.display = 'none';
				break;
			case 'filter-completed':
				// If the filter is 'completed' and the task HAS the 'completed' class,
				// show it. Otherwise, hide it.
				if (task.classList.contains('completed')) {
					task.style.display = 'flex';
				} else task.style.display = 'none';
				break;
		}
	});
}

//SAVE TODOS TO LOCAL STORAGE
function saveTodos(todo) {
	//check if I already have todos in the local storage
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}
//LOAD AND RENDER THE SAVED TODOS FROM LOCAL STORAGE
function getTodos() {
	//check if I already have todos in the local storage
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function (todo) {
		//create a taskDiv inside the ul
		const taskDiv = document.createElement('div');
		taskDiv.classList.add('taskDiv');
		//create a checkbox inside the taskDiv
		const checkBox = document.createElement('input');
		checkBox.classList.add('checkBox');
		checkBox.type = 'checkbox';
		//create an text li inside the taskDiv
		const textTodoLi = document.createElement('li');
		textTodoLi.classList.add('textTodo');
		textTodoLi.innerText = todo;

		//create a delete button inside taskDiv
		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add('btn-delete');
		deleteBtn.innerText = 'Delete';
		//append the all element to taskDiv
		taskDiv.append(checkBox, textTodoLi, deleteBtn);
		//append taskDiv to Ul element
		taskListUlElement.appendChild(taskDiv);

		//clear input form box after the event
	});
}
//REMOVE TODOS FROM LOCAL STORAGE WHEN DELETED
function deleteLocalTodo(todo) {
	//check if I already have todos in the local storage
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	//GET THE TEXT INSIDE THE HTML
	// const arrayValue =  todo.childNodes[1].innerText;  //other method
	const arrayValue = todo.children[1].innerText;
	//USING THE TEXT, GET THE INDEX FROM ARRAY '
	const indexTask = todos.indexOf(arrayValue);
	//REMOVE THE ARRAY ELEMENT USING SPLICE ; YOU NEED THE INDEX FROM ARRAY
	const updateRemoveTodos = todos.splice(indexTask, 1);
	//update the local storage
	localStorage.setItem('todos', JSON.stringify(todos));
	// localStorage.setItem('todos', )
}
