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

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};

function addEditIconHandler(card) {
    const editIcon = card.querySelector('.card-edit-icon');
    editIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que otros eventos de clic se activen
        openEditModal(card);
    });
}