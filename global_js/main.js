// main.js
let isEditMode = false;

document.getElementById("editButton").addEventListener("click", function (event) {
    isEditMode = !isEditMode;

    // Cambiar el estado de las tarjetas al modo de edición
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isEditMode) {
            card.classList.add('edit-mode');
        } else {
            card.classList.remove('edit-mode');
        }
    });
    event.stopPropagation();
});
// Delegación de eventos para los iconos de edición dentro de las tarjetas
document.querySelector('.card-container').addEventListener('click', function (event) {
    const editIcon = event.target.closest('.card-edit-icon'); // Verifica si el clic fue en un icono de edición
    if (editIcon) {
        const card = editIcon.closest('.card');
        openEditModal(card);  // Llama a la función para abrir el modal de edición
    }
});

// Agrega un botón de activación/desactivación a una tarjeta y define su comportamiento
function addToggleButton(card) {
    const button = document.createElement('button');
    button.className = 'toggle-button';
    button.textContent = card.dataset.status === 'activo' ? 'Desactivar' : 'Activar';
    button.style.backgroundColor = card.dataset.status === 'activo' ? 'red' : 'green';

    // Alterna el estado de activación de la tarjeta al hacer clic
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const isActive = card.getAttribute('data-status') === 'activo';

        card.setAttribute('data-status', isActive ? 'inactivo' : 'activo');
        button.style.backgroundColor = isActive ? 'green' : 'red';
        button.textContent = isActive ? 'Activar' : 'Desactivar';

        const statusIndicator = card.querySelector('.status-indicator');
        if (card.getAttribute('data-status') === 'activo') {
            statusIndicator.style.backgroundColor = '#4CAF50';
        } else {
            statusIndicator.style.backgroundColor = '#F44336';
        }
    });

    card.appendChild(button);
}