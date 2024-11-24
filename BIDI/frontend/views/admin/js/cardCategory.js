// Agregar nueva tarjeta desde el formulario de registro
document.getElementById("registerForm").addEventListener("submit", addCard);

function addCard(event) {
    event.preventDefault();

    const categoryName = document.getElementById('categoryName').value.trim();
    const description = document.getElementById('description').value.trim();

    // Validaciones
    if (!categoryName || !description) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }

    if (categoryName.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre inválido',
            text: 'El nombre de la categoría debe tener al menos 3 caracteres.',
        });
        return;
    }

    if (description.length < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Descripción inválida',
            text: 'La descripción debe tener al menos 10 caracteres.',
        });
        return;
    }

    // Si todas las validaciones son correctas
    Swal.fire({
        icon: 'success',
        title: 'Categoría registrada',
        text: 'La categoría ha sido registrada exitosamente.',
    });

    Swal.fire({
        icon: 'success', 
        title: 'Registro exitoso', 
        text: 'La tarjeta de categoría ha sido registrada exitosamente.', 
        didClose: () => {
            const cardContainer = document.querySelector('.card-container');
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#c2bfbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16v16H4z"></path>
                        <path d="M8 8h8"></path>
                        <path d="M8 12h6"></path>
                        <path d="M8 16h4"></path>
                        </svg>
                    </div>
                    <div class="card-title">${categoryName}</div>
                    <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z"/>
                    </svg>
                </div>
                <div class="card-description">
                    <span class="card-data"><strong>Descripción:</strong></span><br>
                    <span>${description}</span>
                </div>
            `;

            setupCardListeners(card);
            addToggleButton(card);
            addEditIconHandler(card);

            cardContainer.appendChild(card);

            closeModal('registerModal');
            document.getElementById('registerForm').reset();
        }
    });
}
// Asignar eventos a las tarjetas existentes en la página
document.addEventListener("DOMContentLoaded", () => {


    // Configurar eventos para las tarjetas existentes
    document.querySelectorAll('.card').forEach(card => {
        setupCardListeners(card);
    });
});

// Función para guardar los cambios en la tarjeta después de editar
document.getElementById("editForm").addEventListener("submit", function (event) {
    event.preventDefault();

       // Obtener los valores de los campos del formulario
       const categoryName = document.getElementById("editCategoryName").value.trim();
       const description = document.getElementById("editDescription").value.trim();

         // Validaciones
    if (!categoryName || !description) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }

    if (categoryName.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre inválido',
            text: 'El nombre de la categoría debe tener al menos 3 caracteres.',
        });
        return;
    }

    if (description.length < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Descripción inválida',
            text: 'La descripción debe tener al menos 10 caracteres.',
        });
        return;
    }

    // Actualizar tarjeta
    Swal.fire({
        icon: 'success',
        title: 'Categoría editada',
        text: 'La categoría ha sido actualizada exitosamente.',
    }).then(() => {
        selectedCard.querySelector(".card-title").textContent = categoryName;
        selectedCard.querySelector('.card-description span:last-child').textContent = description;

        event.target.reset();
        closeModal('editModal');
    });
});

// Función para abrir el modal de edición
let selectedCard = null;

function openEditModal(card) {
    selectedCard = card;
    const editModal = document.getElementById("editModal");

    const categoryName = card.querySelector('.card-title').textContent;
    const description = card.querySelector('.card-description span:last-child').textContent;

    document.getElementById('editCategoryName').value = categoryName;
    document.getElementById('editDescription').value = description;

    editModal.style.display = "block";
    setTimeout(() => {
        editModal.classList.add("show");
    }, 10);

      // Agregar evento para eliminar highlight al cerrar el modal
      const closeModalButton = document.querySelector(".close-button");
      closeModalButton.addEventListener("click", () => {
          removeHighlightOnModalClose();
      });
}