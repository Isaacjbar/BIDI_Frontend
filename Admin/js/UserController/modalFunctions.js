// user modalFunctions.js

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

// Función para abrir el modal de edición y cargar los datos del usuario seleccionado
function openEditModal(card) {
    const userId = card.getAttribute('data-id'); // Obtiene el id del usuario
    const userName = card.querySelector('.card-title').textContent; // Obtiene el nombre del usuario
    const surname = card.querySelector('.card-description');
    const email = card.querySelector('.card-description');
    const phoneNumber = card.querySelector('.card-description');

    // Coloca los valores en los campos del modal de edición
    document.getElementById('editNombres').value = userName;
    document.getElementById('editApellidos').value = surname;
    document.getElementById('editEmail').value = email;
    document.getElementById('editTelefono').value = phoneNumber;

    // Guarda el ID del usuario en un campo oculto o en un atributo del formulario para usarlo más adelante
    const editForm = document.getElementById('editForm');
    editForm.setAttribute('data-id', userId); // Guarda el ID en el formulario

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
