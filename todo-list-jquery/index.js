const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    tasks.push({ text: newTask, completed: false });
    const listItem = $('<li class="todo-item"></li>');
    const taskText = $('<span></span>').text(newTask);
    $(listItem).append(taskText);

    $(listItem).on('click', function () {
      const index = $(this).index();
      tasks[index].completed = !tasks[index].completed;
      $(this).toggleClass('completed');
    });

    $('#todo-list').append(listItem);
    $('#new-task').val('');
	addButtonsToTask($(listItem), taskText);
  }
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});

// Функция для добавления кнопок к элементу задаче
function addButtonsToTask($listItem, taskText) {
  // Создаем контейнер для кнопок
  const $buttonsContainer = $('<div class="task-buttons"></div>');
  
  // Кнопка переименования
  const $renameBtn = $('<button class="rename-btn">✏</button>');
  
  // Кнопка удаления
  const $deleteBtn = $('<button class="delete-btn">❌</button>');
  
  // Обработчик переименования
  $renameBtn.on('click', function(e) {
    e.stopPropagation();
    const index = $('#todo-list li').index($listItem);
    const newName = prompt('Введите новое название задачи:', tasks[index].text);
    
    if (newName && newName.trim() !== '') {
      tasks[index].text = newName.trim();
      taskText.text(newName.trim());
    }
  });
  
  // Обработчик удаления
  $deleteBtn.on('click', function(e) {
    e.stopPropagation();
    const index = $('#todo-list li').index($listItem);
    tasks.splice(index, 1);
    $listItem.remove();
  });
  
  $buttonsContainer.append($renameBtn, $deleteBtn);
  $listItem.append($buttonsContainer);
}
