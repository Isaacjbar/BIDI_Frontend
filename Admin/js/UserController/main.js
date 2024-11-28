// Función para alternar el estado de edición de las tarjetas
document.getElementById("editButton")?.addEventListener("click", function (event) {
    isEditMode = !isEditMode;

    // Cambiar el estado de las tarjetas al modo de edición
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isEditMode) {
            card.classList.add('edit-mode');  // Añadir clase edit-mode para aplicar estilos de edición
        } else {
            card.classList.remove('edit-mode');
        }
    });
    event.stopPropagation();
});

// Agrega un botón de activación/desactivación a una tarjeta y define su comportamiento
function addToggleButton(card, status) {
    const button = document.createElement('button');
    button.className = 'toggle-button';
    button.textContent = status === 'ACTIVO' ? 'Desactivar' : 'Activar';
    button.style.backgroundColor = status === 'ACTIVO' ? 'green' : 'red'; // Verde si está activo, rojo si inactivo

    // Alterna el estado de activación de la tarjeta al hacer clic
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        // Alterna el estado entre 'ACTIVO' y 'INACTIVO'
        const newStatus = status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        card.setAttribute('data-status', newStatus);  // Actualiza el estado en el atributo de datos

        // Actualiza el botón y su color
        button.style.backgroundColor = newStatus === 'ACTIVO' ? 'green' : 'red';
        button.textContent = newStatus === 'ACTIVO' ? 'Desactivar' : 'Activar';

        // Actualiza el color del indicador de estado
        const statusIndicator = card.querySelector('.status-indicator');
        statusIndicator.style.backgroundColor = newStatus === 'ACTIVO' ? '#4CAF50' : '#F44336';
    });

    card.appendChild(button);
}