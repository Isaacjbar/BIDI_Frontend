document.getElementById("statusSwitch").addEventListener("change", function () {
    const statusText = document.getElementById("statusText");
    statusText.textContent = this.checked ? "Estado activo" : "Estado inactivo";
});

// JS para la iluminación de las cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Remueve la clase 'highlight' de todas las tarjetas
        cards.forEach(c => c.classList.remove('highlight'));
        
        card.classList.add('highlight');
    });
});

// JS para abrir y cerrar el modal
function openModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "block"; // Cambiamos el display para que sea visible
    setTimeout(() => {
        modal.classList.add("show"); // Agregamos la clase 'show' después de un pequeño retraso
    }, 10); // Pequeño retraso para permitir que la transición se vea
}

function closeModal() {
    const modal = document.getElementById("registerModal");
    modal.classList.remove("show"); // Quitamos la clase 'show' para iniciar la animación de salida
    setTimeout(() => {
        modal.style.display = "none"; // Ocultamos el modal completamente después de la transición
    }, 300); // Tiempo suficiente para que termine la transición de opacidad
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("registerModal");
    if (event.target == modal) {
        closeModal();
    }
}
