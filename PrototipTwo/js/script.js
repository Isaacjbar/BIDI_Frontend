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
        // Mostrar u ocultar cards según el estado seleccionado
        if (card.getAttribute('data-status') === status) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
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

// Añadir botón de activación/desactivación a cada tarjeta
document.querySelectorAll('.card').forEach((card) => {
    const button = document.createElement('button');
    button.className = 'toggle-button';
    button.textContent = card.dataset.status === 'activo' ? 'Desactivar' : 'Activar';
    button.style.backgroundColor = card.dataset.status === 'activo' ? 'red' : 'green';
    button.title = card.dataset.status === 'activo' ? 'Desactivar esta tarjeta' : 'Activar esta tarjeta';


    // Alternar el estado de activación al hacer clic
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const isActive = card.getAttribute('data-status') === 'activo';


        // Cambiar el estado de la tarjeta y el color del botón
        card.setAttribute('data-status', isActive ? 'inactivo' : 'activo');
        button.style.backgroundColor = isActive ? 'green' : 'red';
        button.textContent = isActive ? 'Activar' : 'Desactivar';
    });

});

// Función para agregar una nueva tarjeta con los datos del formulario
function addCard(event) {
    // Prevenir que el formulario recargue la página
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
    </div>
    `;

    // Agregar la tarjeta al contenedor
    cardContainer.appendChild(card);

    // Cerrar el modal y limpiar el formulario
    closeModal('registerModal');
    document.getElementById('registerModal').querySelector('form').reset();
}

// Agregar el evento de "submit" al formulario de registro para que llame a addCard
document.querySelector('.btn-submit').addEventListener('click', addCard);

