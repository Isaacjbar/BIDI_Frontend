// cardFunctions.js

function handleCardClick(event) {
    const card = event.currentTarget;
    // Remover el highlight de la tarjeta previamente seleccionada
    if (selectedCard) {
        selectedCard.classList.remove('highlight');
    }
 
    // Abrir el modal de edición al segundo clic
    if (selectedCard === card) {
        openEditModal(card); // Abre el modal
        return;
    }

    // Asignar la tarjeta actual como seleccionada y agregar el highlight
    selectedCard = card;
    selectedCard.classList.add('highlight');
}

// Función para remover el highlight al hacer clic fuera de las tarjetas
function handleClickOutside(event) {
    if (!event.target.closest('.card')) {
        if (selectedCard) {
            selectedCard.classList.remove('highlight');
            selectedCard = null;
        }
    }
}

// Agregar evento de clic a todas las tarjetas y al documento
document.addEventListener('click', handleClickOutside);

function addCardEventListeners(card) {
    card.addEventListener('click', handleCardClick);
}

// Llamar a esta función después de crear una tarjeta
function setupCardListeners(card) {
    card.addEventListener('click', handleCardClick);
}


