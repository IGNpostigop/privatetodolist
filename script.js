// Arreglo para almacenar las tareas
let tasks = [];

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIzlvLRjBi-HIwc_UsgOu36PV3DJ0bB3M",
    authDomain: "privatetodolist-a9e6d.firebaseapp.com",
    databaseURL: "https://privatetodolist-a9e6d-default-rtdb.firebaseio.com/",
    projectId: "privatetodolist-a9e6d",
    storageBucket: "privatetodolist-a9e6d.appspot.com",
    messagingSenderId: "558228158361",
    appId: "1:558228158361:web:4d2962c69584b25ba68508",
    measurementId: "G-VDRSBEZJNS"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const tasksRef = database.ref("tasks");

document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const colorSelect = document.getElementById("colorSelect");
    const addTaskButton = document.getElementById("addTaskButton");

    // Agregar tarea al presionar Enter
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Agregar tarea al hacer clic en el botón
    addTaskButton.addEventListener("click", addTask);

    // Resto del código como antes...

    // Llamar a Sortable para hacer la lista ordenable
    const taskList = document.getElementById("taskList");
    const sortable = new Sortable(taskList, {
        animation: 150,
        onEnd: (evt) => {
            // Obtener el elemento que se movió
            const movedTask = tasks.splice(evt.oldIndex, 1)[0];
            // Insertar el elemento en su nueva posición
            tasks.splice(evt.newIndex, 0, movedTask);

            // Actualizar el arreglo de tareas con el nuevo orden
            saveTasks();

            // No es necesario llamar a updateTaskList aquí,
            // ya que la lista se actualizará automáticamente
        },
    });
});

// Función para cargar las tareas desde Firebase al cargar la página
function loadTasks() {
    tasksRef.on("value", (snapshot) => {
        tasks = [];
        snapshot.forEach((childSnapshot) => {
            tasks.push(childSnapshot.val());
        });
        updateTaskList();
    });
}

// Función para guardar las tareas en Firebase
function saveTasks() {
    tasksRef.set(tasks);
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const colorSelect = document.getElementById("colorSelect");
    const taskText = taskInput.value.trim();
    const selectedColor = colorSelect.value;

    if (taskText !== "") {
        // Agregar la tarea al arreglo
        tasks.push({ text: taskText, color: selectedColor });

        // Guardar las tareas en Firebase (si se utiliza Firebase)
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
        const task = tasks[i];

        // Crear elementos HTML para mostrar la tarea
        const li = document.createElement("li");
        li.textContent = task.text;

        // Asignar el color de fondo seleccionado
        li.style.backgroundColor = task.color;

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
    // Eliminar la tarea del arreglo local
    tasks.splice(index, 1);

    // Eliminar la tarea de Firebase
    tasksRef.set(tasks); // Esto actualizará la lista de tareas en Firebase sin la tarea eliminada

    // Actualizar la lista de tareas
    updateTaskList();
}

function editTask(index) {
    const newTaskText = prompt("Editar tarea:", tasks[index].text);

    if (newTaskText !== null) {
        tasks[index].text = newTaskText;

        // Actualizar la lista de tareas
        updateTaskList();
    }
}

// Llamar a loadTasks al cargar la página para cargar las tareas existentes desde Firebase
loadTasks();
