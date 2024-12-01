function openLoanModal(card) {
    const bookId = card.getAttribute('data-id');
    const bookTitle = card.querySelector('.card-title').textContent;

    // Mostrar el título del libro y la fecha de devolución en el modal
    document.getElementById('bookTitle').textContent = bookTitle;
    const expectedReturnDate = calculateReturnDate(10);
    document.getElementById('expectedReturnDate').textContent = expectedReturnDate;

    // Establecer el ID del libro en el campo oculto del formulario
    document.getElementById('registerBook').value = bookId;

    // Abrir el modal
    const modal = document.getElementById("loanModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

// Función para calcular la fecha de devolución (10 días hábiles)
function calculateReturnDate(days) {
    const date = new Date();
    let businessDays = 0;

    while (businessDays < days) {
        date.setDate(date.getDate() + 1);
        // Excluir fines de semana (sábado y domingo)
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            businessDays++;
        }
    }
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    } else {
        console.error("Modal no encontrado:", modalId);
    }
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};
