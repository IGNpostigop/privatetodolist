document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");

    // Función para agregar una nueva tarea con color de fondo
    function addTask(task) {
        const newTaskElement = document.createElement("li");
        newTaskElement.textContent = task.title;

        // Verifica si la tarea tiene un color de fondo definido
        if (task.backgroundColor) {
            newTaskElement.style.backgroundColor = task.backgroundColor;
        }

        // Agrega botones para eliminar y editar la tarea
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete-button";

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.className = "edit-button";

        newTaskElement.appendChild(deleteButton);
        newTaskElement.appendChild(editButton);

        taskList.appendChild(newTaskElement);
    }

    // Ejemplo de tareas con colores de fondo
    const tasks = [
        { title: "Tarea 1", backgroundColor: "#ff5733" }, // Ejemplo de tarea con fondo rojo
        { title: "Tarea 2", backgroundColor: "#33ff57" }, // Ejemplo de tarea con fondo verde
        // ... Agrega más tareas aquí
    ];

    // Agrega las tareas a la lista
    tasks.forEach(addTask);

    // Evento para eliminar una tarea al hacer clic en el botón "Eliminar"
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            event.target.parentElement.remove();
        }
    });

    // Evento para editar una tarea al hacer clic en el botón "Editar"
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
            const taskText = event.target.parentElement.textContent;
            const newTaskText = prompt("Editar tarea:", taskText);

            if (newTaskText !== null) {
                event.target.parentElement.textContent = newTaskText;
            }
        }
    });
});
