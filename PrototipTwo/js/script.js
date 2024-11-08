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

