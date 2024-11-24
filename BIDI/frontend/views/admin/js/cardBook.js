// Agregar nueva tarjeta desde el formulario de registro
document.getElementById("registerForm").addEventListener("submit", addCard);

function addCard(event) {
    event.preventDefault();

    const bookName = document.getElementById('bookName').value.trim();
    const author = document.getElementById('author').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value.trim();
    

      // Validaciones
      if (!bookName || !author || !description || !category) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }

    if (bookName.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre inválido',
            text: 'El nombre del libro debe tener al menos 3 caracteres.',
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

    if (!/^[a-zA-Z\s]+$/.test(author)) {
        Swal.fire({
            icon: 'error',
            title: 'Autor inválido',
            text: 'El nombre del autor solo puede contener letras y espacios.',
        });
        return;
    }

    if (category === '') {
        Swal.fire({
            icon: 'error',
            title: 'Categoría no seleccionada',
            text: 'Por favor, selecciona una categoría válida.',
        });
        return;
    }

    // Si todas las validaciones son correctas
    Swal.fire({
        icon: 'success',
        title: 'Libro registrado',
        text: 'El libro ha sido registrado exitosamente.',
    });
    
    Swal.fire({
        icon: 'success', 
        title: 'Registro exitoso', 
        text: 'La tarjeta ha sido registrada exitosamente.', 
        didClose: () => {
            const cardContainer = document.querySelector('.card-container');
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-status', 'activo');
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#c2bfbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <span class="status-indicator"></span>
                    </div>
                    <div class="card-title">${bookName}</div>
                     <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z"/>
                     </svg>
                </div>
                <div class="card-description">
                    <span class="card-data"><strong>Autor:</strong></span><br>
                    <span>${author}</span>
                </div>
                <div class="card-description">
                    <span class="card-data"><strong>Descripción:</strong></span><br>
                    <span>${description}</span>
                </div>
                <div class="card-description">
                    <span class="card-data"><strong>Categoría:</strong></span><br>
                    <span>${category}</span>
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
    const bookName = document.getElementById("editBookName").value.trim();
    const author = document.getElementById("editAuthor").value.trim();
    const description = document.getElementById("editDescription").value.trim();
    const category = document.getElementById("editCategory").value.trim();

    // Validaciones
    if (!bookName || !author || !description || !category) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }

    if (bookName.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre del libro inválido',
            text: 'El nombre del libro debe tener al menos 3 caracteres.',
        });
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(author)) {
        Swal.fire({
            icon: 'error',
            title: 'Autor inválido',
            text: 'El nombre del autor solo puede contener letras y espacios.',
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

    // Mostrar mensaje de éxito y actualizar la tarjeta
    Swal.fire({
        icon: 'success',
        title: 'Edición exitosa',
        text: 'Los datos del libro han sido actualizados exitosamente.',
    }).then(() => {
    selectedCard.querySelector(".card-title").textContent = bookName;
    selectedCard.querySelectorAll(".card-description span")[1].textContent = author;
    selectedCard.querySelectorAll(".card-description span")[3].textContent = description;
    selectedCard.querySelectorAll(".card-description span")[5].textContent = category;


        event.target.reset();
        closeModal('editModal');
    });
});


// Función para abrir el modal de edición
let selectedCard = null;

function openEditModal(card) {
    selectedCard = card;
    const editModal = document.getElementById("editModal");

    const bookName = card.querySelector(".card-title").textContent;
    const author = card.querySelectorAll(".card-description span")[1]?.textContent;
    const description = card.querySelectorAll(".card-description span")[3]?.textContent;
    const category = card.querySelectorAll(".card-description span")[5]?.textContent;

    document.getElementById("editBookName").value = bookName;
    document.getElementById("editAuthor").value = author;
    document.getElementById("editDescription").value = description;
    const categorySelect = document.getElementById("editCategory");
    let categoryFound = false;

    Array.from(categorySelect.options).forEach(option => {
        if (option.textContent.trim() === category) {
        option.selected = true;
        categoryFound = true;
        }
    });

  
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

