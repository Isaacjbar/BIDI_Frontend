document.getElementById("statusSwitch").addEventListener("change", function () {
    const statusText = document.getElementById("statusText");
    statusText.textContent = this.checked ? "Estado activo" : "Estado inactivo";
});

// JS para la iluminación de las cards
const cards = document.querySelectorAll('.card');

let selectedCard = null;
let clickCount = 0;

cards.forEach(card => {
    card.addEventListener('click', (event) => {
        event.stopPropagation();

        // Verificar si se hizo clic en la misma tarjeta
        if (selectedCard === card) {
            clickCount++;
        } else {
            // Si se hace clic en una tarjeta diferente, reiniciar el contador
            clickCount = 1;
            selectedCard = card;

            // Remover la clase 'highlight' de todas las tarjetas
            removeHighlightFromAllCards();

            // Agregar la clase 'highlight' a la tarjeta actual
            card.classList.add('highlight');
        }

        // Abrir el modal de edición en el segundo clic
        if (clickCount === 2) {
            openEditModal();
            clickCount = 0; 
        }
    });
});

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

// Remover el brillo de todas las tarjetas
function removeHighlightFromAllCards() {
    cards.forEach(c => c.classList.remove('highlight'));
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
    removeHighlightFromAllCards(); // Quitar el brillo de las cards al hacer clic fuera de las cards
}



