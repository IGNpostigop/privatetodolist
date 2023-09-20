// Arreglo para almacenar las tareas
let tasks = [];

// Función para cargar las tareas desde el almacenamiento local al cargar la página
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
}

// Función para guardar las tareas en el almacenamiento local
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        // Agregar la tarea al arreglo
        tasks.push(taskText);

        // Guardar las tareas en el almacenamiento local
        saveTasks();

        // Actualizar la lista de tareas
        updateTaskList();

        // Limpiar el campo de entrada
        taskInput.value = "";
    }
}

function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Limpiar la lista antes de actualizar

    // Recorrer el arreglo de tareas y mostrarlas en la lista
    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i];

        // Crear elementos HTML para mostrar la tarea
        const li = document.createElement("li");
        li.textContent = taskText;

        // Crear botones para eliminar y editar la tarea
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => deleteTask(i));

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => editTask(i));

        // Agregar elementos a la lista
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        taskList.appendChild(li);
    }
}

function deleteTask(index) {
    // Eliminar la tarea del arreglo
    tasks.splice(index, 1);

    // Guardar las tareas actualizadas en el almacenamiento local
    saveTasks();

    // Actualizar la lista de tareas
    updateTaskList();
}

function editTask(index) {
    const newTaskText = prompt("Editar tarea:", tasks[index]);
    
    if (newTaskText !== null) {
        tasks[index] = newTaskText;

        // Guardar las tareas actualizadas en el almacenamiento local
        saveTasks();

        // Actualizar la lista de tareas
        updateTaskList();
    }
}

// Llamar a loadTasks al cargar la página para cargar las tareas existentes desde el almacenamiento local
loadTasks();
