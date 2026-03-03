let meter, completedCount, totalCount, taskList, input;

meter = document.getElementById('meter-bar');
completedCount = document.getElementById('completed-count');
totalCount = document.getElementById('total-count');
taskList = document.getElementById('task-list');
input = document.getElementById('task-input');

function updateMeter() {
    // selektovanje svih checkboxa
    const checkboxes = taskList.querySelectorAll('.task-checkbox');
    // biramo samo checkboxe koji su oznaceni, filter (unutrasnja inline funkcija)
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;

    // za ispisivanje broja zavrsenih i ukupnih taskova
    completedCount.textContent = completed;
    totalCount.textContent = taskList.children.length;

    // azuriranje vrednosti metra
    // ako nema taskova, meter se postavlja na 0
    // ako ima taskova, meter se postavlja na procenat zavrsenih taskova
    if (taskList.children.length === 0) {
        meter.value = 0;
    } else {
        meter.value = (completed / taskList.children.length) * 100;
    }
}

function newTask() {

    // 1. kreiranje taska; 2. dodavanje classova; 3. dodavanje vrednosti 4; dodavanje eventa; 
    const task = document.createElement('li');
    task.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');

    const taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.innerText = input.value;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'Delete';

    // Event za checkbox
    checkbox.addEventListener('change', updateMeter);

    // Event za delete dugme
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(task);
        updateMeter();
    });

    // Dodavanje elemenata u task, pa task u taskList
    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(deleteButton);
    taskList.appendChild(task);

    input.value = '';
    updateMeter(); // Poziva se ovde da bi se odmah ažurirali brojači
}