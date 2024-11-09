// Cambia el texto y filtra las cards según el estado (activo o inactivo)
document.getElementById("statusSwitch").addEventListener("change", function () {
    const statusText = document.getElementById("statusText");
    const showActive = this.checked;
    statusText.textContent = showActive ? "Activos" : "Inactivos";

    // Filtra las cards según el estado del switch
    filterCards(showActive ? "activo" : "inactivo");
});

// Función para filtrar las cards
function filterCards(status) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = card.getAttribute('data-status') === status ? "block" : "none";
    });
}

// Función para abrir el modal de registro
function openModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "block"; 
    setTimeout(() => {
        modal.classList.add("show");
    }, 10); 
}

// Función para abrir el modal de edición
function openEditModal() {
    const editModal = document.getElementById("editModal");
    editModal.style.display = "block";
    setTimeout(() => {
        editModal.classList.add("show"); 
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
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

// Añadir botón de activación/desactivación a cada tarjeta existente
document.querySelectorAll('.card').forEach((card) => {
    addToggleButton(card);
    addCardDoubleClickEvent(card); // Añadimos el evento dblclick
});

// Función para agregar un botón de activación/desactivación a una tarjeta
function addToggleButton(card) {
    const button = document.createElement('button');
    button.className = 'toggle-button';
    button.textContent = card.dataset.status === 'activo' ? 'Desactivar' : 'Activar';
    button.style.backgroundColor = card.dataset.status === 'activo' ? 'red' : 'green';

    // Alternar el estado de activación al hacer clic
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const isActive = card.getAttribute('data-status') === 'activo';

        // Cambiar el estado de la tarjeta y el color del botón
        card.setAttribute('data-status', isActive ? 'inactivo' : 'activo');
        button.style.backgroundColor = isActive ? 'green' : 'red';
        button.textContent = isActive ? 'Activar' : 'Desactivar';

        // Cambiar el color del .status-indicator basado en el estado
        const statusIndicator = card.querySelector('.status-indicator');
        if (card.getAttribute('data-status') === 'activo') {
            statusIndicator.style.backgroundColor = '#4CAF50';  // Verde para activo
        } else {
            statusIndicator.style.backgroundColor = '#F44336';  // Rojo para inactivo
        }
    });

    // Agregar el botón a la tarjeta
    card.appendChild(button);
}

// Función para agregar el evento de doble clic a cada tarjeta
function addCardDoubleClickEvent(card) {
    card.addEventListener('dblclick', function() {
        openEditModal();  // Llama a la función que abre el modal de registro
    });
}

// Función para agregar una nueva tarjeta con los datos del formulario
function addCard(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombres = document.getElementById('Nombres').value;
    const apellidos = document.getElementById('Apellidos').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Crear la estructura de la tarjeta
    const cardContainer = document.querySelector('.card-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-status', 'activo');
    card.innerHTML = `
        <div class="card-header">
            <div class="card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span class="status-indicator"></span>
            </div>
            <div class="card-title">${nombres}</div>
        </div>
        <div class="card-description">
            <span class="card-data"><strong>Apellidos:</strong></span><br>
            <span>${apellidos}</span>
        </div>
        <div class="card-description">
            <span class="card-data"><strong>Teléfono:</strong></span><br>
            <span>${telefono}</span>
        </div>
        <div class="card-description">
            <span class="card-data"><strong>Correo:</strong></span><br>
            <span>${email}</span>
        </div>
    `;

    // Agregar el botón de activación/desactivación a la tarjeta
    addToggleButton(card);
    addCardDoubleClickEvent(card); // Añadimos el evento de doble clic para las nuevas tarjetas

    // Agregar la tarjeta al contenedor
    cardContainer.appendChild(card);

    // Cerrar el modal y limpiar el formulario
    closeModal('registerModal');
    document.getElementById('registerModal').querySelector('form').reset();
}

// Agregar el evento de "submit" al formulario de registro para que llame a addCard
document.querySelector('.btn-submit').addEventListener('click', addCard);
