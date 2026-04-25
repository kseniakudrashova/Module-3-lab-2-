const tasks = [];

function addTask() {
  const newTask = document.getElementById('new-task').value;
  if (newTask.trim() !== '') {
    tasks.push({ task: newTask, completed: false });
    const taskIndex = tasks.length - 1;

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = newTask;
    listItem.appendChild(taskNameElement);

    listItem.addEventListener('click', function () {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      listItem.classList.toggle('completed');
    });

    document.getElementById('todo-list').appendChild(listItem);
    document.getElementById('new-task').value = '';
	
	addButtonsToTask(listItem);
  }
}

document.getElementById('add-button').onclick = addTask;

// Функция для добавления кнопок к задаче
function addButtonsToTask(listItem) {
  // Находим текст задачи
  const taskText = listItem.querySelector('span');
  
  // Создаем контейнер для кнопок
  const buttonsContainer = document.createElement('div');
  
  // Кнопка переименования
  const renameBtn = document.createElement('button');
  renameBtn.textContent = '✏';
  renameBtn.style.marginLeft = '10px';
  renameBtn.style.cursor = 'pointer';
  renameBtn.onclick = function(e) {
    e.stopPropagation();
    const newName = prompt('Введите новое название задачи:', taskText.textContent);
    if (newName && newName.trim()) {
      // Находим индекс задачи
      const index = Array.from(document.getElementById('todo-list').children).indexOf(listItem);
      tasks[index].task = newName.trim();
      taskText.textContent = newName.trim();
    }
  };
  
  // Кнопка удаления
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.style.marginLeft = '5px';
  deleteBtn.style.cursor = 'pointer';
  
  deleteBtn.onclick = function(e) {
    e.stopPropagation();
    const index = Array.from(document.getElementById('todo-list').children).indexOf(listItem);
    tasks.splice(index, 1);
    listItem.remove();
  };
  
  buttonsContainer.appendChild(renameBtn);
  buttonsContainer.appendChild(deleteBtn);
  listItem.appendChild(buttonsContainer);
}
