// Agregar nueva tarjeta desde el formulario de registro
document.getElementById("registerForm").addEventListener("submit", addCard);

function addCard(event) {
    event.preventDefault();

    const currentDate = document.getElementById('currentDate').value.trim();
    const expirationDate = document.getElementById('expirstionDate').value.trim();
    const bookName = document.getElementById('bookName').value.trim();
    const userName = document.getElementById('userName').value.trim();
    

 
    // Validaciones
    if (!currentDate || !expirationDate || !bookName || !userName) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }

    if (userName.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Usuario inválido',
            text: 'El nombre del usuario debe tener al menos 3 caracteres.',
        });
        return;
    }

    if (bookName === '') {
        Swal.fire({
            icon: 'error',
            title: 'Libro no seleccionado',
            text: 'Por favor, selecciona un libro.',
        });
        return;
    }

    // Si todas las validaciones son correctas
    Swal.fire({
        icon: 'success',
        title: 'Préstamo registrado',
        text: 'El préstamo ha sido registrado exitosamente.',
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
                    <span class="card-data"><strong>Fecha de solicitud:</strong></span><br>
                    <span>${currentDate}</span>
                </div>
                <div class="card-description">
                    <span class="card-data"><strong>Fecha de entrega:</strong></span><br>
                    <span>${expirationDate}</span>
                </div>
                <div class="card-description">
                    <span class="card-data"><strong>Libro:</strong></span><br>
                    <span>${bookName}</span>
                </div>
                <div class="card-description">
                    <span class="card-data"><strong>Usuario:</strong></span><br>
                    <span>${userName}</span>
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
    const bookName = document.getElementById("editBook").value.trim();
    const userName = document.getElementById("editUserName").value.trim();
    const currentDate = document.getElementById("editCurrentDate").textContent.trim();
    const expirationDate = document.getElementById("editExpirationDate").textContent.trim();

// Validaciones
if (!bookName || !userName || !currentDate || !expirationDate) {
    Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos obligatorios.',
    });
    return;
}

if (userName.length < 3) {
    Swal.fire({
        icon: 'error',
        title: 'Usuario inválido',
        text: 'El nombre del usuario debe tener al menos 3 caracteres.',
    });
    return;
}

// Actualizar tarjeta
Swal.fire({
    icon: 'success',
    title: 'Préstamo editado',
    text: 'Los datos del préstamo han sido actualizados exitosamente.',
}).then(() => {
    selectedCard.querySelector(".card-title").textContent = bookName;
        selectedCard.querySelectorAll(".card-description span")[1].textContent = currentDate;
        selectedCard.querySelectorAll(".card-description span")[3].textContent = expirationDate;
        selectedCard.querySelectorAll(".card-description span")[5].textContent = userName;


        event.target.reset();
        closeModal('editModal');
    });
});


// Función para abrir el modal de edición
let selectedCard = null;

function openEditModal(card) {
    selectedCard = card;

    const bookName = card.querySelector(".card-title").textContent;
    const currentDate = card.querySelectorAll(".card-description span")[1].textContent;
    const expirationDate = card.querySelectorAll(".card-description span")[3].textContent;
    const userName = card.querySelectorAll(".card-description span")[5].textContent;

    document.getElementById("editUserName").value = userName;
    document.getElementById("editCurrentDate").textContent = currentDate;
    document.getElementById("editExpirationDate").textContent = expirationDate;
    const bookSelect = document.getElementById("editBookName");
    let categoryFound = false;

    Array.from(bookSelect.options).forEach(option => {
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

