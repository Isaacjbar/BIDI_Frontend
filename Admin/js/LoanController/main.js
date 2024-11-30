// main.js

let isEditMode = false;

// Agrega un botón de activación/desactivación a una tarjeta y define su comportamiento
function addToggleButton(card) {
    const button = document.createElement('button');
    button.className = 'toggle-button';
    button.textContent = card.dataset.status    === 'ACTIVE' ? 'Desactivar' : 'Activar';
    button.style.backgroundColor = card.dataset.status === 'ACTIVE' ? 'red' : 'green';

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
