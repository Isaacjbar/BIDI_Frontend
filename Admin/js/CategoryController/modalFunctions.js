// modalFunctions.js

// Función para abrir el modal de registro
function openModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

// Función para cerrar los modales
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);

}
// Función para abrir el modal de edición y cargar los datos de la tarjeta seleccionada
function openEditModal(card) {
    const categoryId = card.getAttribute('data-id'); // Obtiene el id de la categoría
    const categoryName = card.querySelector('.card-title').textContent; // Obtiene el nombre de la categoría

    // Coloca los valores en los campos del modal de edición
    document.getElementById('editCategoryName').value = categoryName; // Rellena el campo de nombre con el nombre actual de la categoría

    // Guarda el ID de la categoría en un campo oculto o en un atributo del formulario para usarlo más adelante
    const editForm = document.getElementById('editForm');
    editForm.setAttribute('data-id', categoryId); // Guarda el ID en el formulario

    // Abre el modal
    const modal = document.getElementById("editModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};

// Función para agregar el evento de clic al ícono de edición
function addEditIconHandler(card) {
    const editIcon = card.querySelector('.card-edit-icon');
    editIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que otros eventos de clic se activen
        openEditModal(card); // Pasa la tarjeta como parámetro al abrir el modal
    });
}
