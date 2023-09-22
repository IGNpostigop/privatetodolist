document.addEventListener("DOMContentLoaded", function () {
    const colorNotesContainer = document.getElementById("colorNotes");

    // Función para crear una nueva nota de color
    function createColorNote() {
        const colorNote = document.createElement("div");
        colorNote.className = "color-note";
        colorNote.style.backgroundColor = getRandomColor();
        colorNote.textContent = "Nueva Nota";

        colorNote.addEventListener("click", function () {
            // Aquí puedes agregar la lógica para editar o eliminar la nota
        });

        colorNotesContainer.appendChild(colorNote);
    }

    // Función para obtener un color aleatorio
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Agregar una nota de color al cargar la página (puedes eliminar esto si no deseas una nota inicial)
    createColorNote();

    // Agregar evento al botón para crear una nueva nota de color
    const createColorButton = document.getElementById("createColorButton");
    createColorButton.addEventListener("click", createColorNote);
});
