/* FUNCION DE LOS MODALES */

// Función para abrir el modal de registro
function openModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
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

let selectedCard = null;

// Función para abrir el modal de edición
function openEditModal(card) {
    selectedCard = card
    const editModal = document.getElementById("editModal");

    const nombres = card.querySelector(".card-title").textContent;
    const apellidos = card.querySelectorAll(".card-description span")[1].textContent;
    const telefono = card.querySelectorAll(".card-description span")[3].textContent;
    const email = card.querySelectorAll(".card-description span")[5].textContent;
    const password = card.getAttribute("data-password");

    document.getElementById("editNombres").value = nombres;
    document.getElementById("editApellidos").value = apellidos;
    document.getElementById("editTelefono").value = telefono;
    document.getElementById("editEmail").value = email;
    document.getElementById("editPassword").value = password;
    document.getElementById("editConfirmPassword").value = password;

    // Mostrar el modal de edición
    editModal.style.display = "block"; // Corregir aquí el uso de editModal
    setTimeout(() => {
        editModal.classList.add("show"); // Añadir clase para animación
    }, 10);
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

/* FUNCIONES DE LAS CARDS */

// Función para agregar una nueva tarjeta con los datos del formulario
document.getElementById("registerForm").addEventListener("submit", addCard);

function addCard(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombres = document.getElementById('Nombres').value.trim();
    const apellidos = document.getElementById('Apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validaciones
    if (!nombres || !apellidos || !email || !telefono || !password || !confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }
    if (!email.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Correo electrónico inválido',
            text: 'Por favor, ingresa un correo electrónico válido.',
        });
        return;
    }
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        Swal.fire({
            icon: 'error',
            title: 'Teléfono inválido',
            text: 'El número de teléfono debe contener exactamente 10 dígitos numéricos.',
        });
        return;
    }
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas no coinciden',
            text: 'Asegúrate de que las contraseñas coincidan.',
        });
        return;
    }
    if (password.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña insegura',
            text: 'La contraseña debe tener al menos 8 caracteres.',
        });
        return;
    }

    // Mostrar alerta de éxito si todas las validaciones pasan
    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'La tarjeta ha sido registrada exitosamente.',
        didClose: () => {
            // Crear la estructura de la tarjeta
            const cardContainer = document.querySelector('.card-container');
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-status', 'activo');
            card.setAttribute('data-password', password);
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <span class="status-indicator"></span>
                    </div>
                    <div class="card-title">${nombres}</div>
                    <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z"/>
                    </svg>
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

            // Agregar evento al ícono de edición en la tarjeta
            card.querySelector(".card-edit-icon").addEventListener("click", (event) => {
                event.stopPropagation();
                openEditModal(card);
            });

            // Agregar la tarjeta al contenedor
            cardContainer.appendChild(card);

            // Cerrar el modal y limpiar el formulario
            closeModal('registerModal');
            document.getElementById('registerForm').reset();
        }
    });
}



// Funcion para el modo de edición de las cards
document.addEventListener("click", function (event) {
    if (isEditMode && !event.target.closest(".card-edit-icon") && !event.target.closest("#editButton")) {
        isEditMode = false;

        // Ocultar el ícono de edición en las tarjetas
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('edit-mode'); // Oculta el ícono de editar
        });
    }
});

document.querySelectorAll(".card-edit-icon").forEach(icon => {
    icon.addEventListener("click", function (event) {
        event.stopPropagation();
        openEditModal(this.closest('.card'));
    });
});

// Función para guardar los cambios en la tarjeta después de editar
document.getElementById("editForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores editados del formulario
    const nombres = document.getElementById("editNombres").value.trim();
    const apellidos = document.getElementById("editApellidos").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const telefono = document.getElementById("editTelefono").value.trim();
    const password = document.getElementById("editPassword").value.trim();
    const confirmPassword = document.getElementById("editConfirmPassword").value.trim();

    // Validaciones
    if (!nombres || !apellidos || !email || !telefono || !password || !confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }
    if (!email.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Correo electrónico inválido',
            text: 'Por favor, ingresa un correo electrónico válido.',
        });
        return;
    }
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        Swal.fire({
            icon: 'error',
            title: 'Teléfono inválido',
            text: 'El número de teléfono debe contener exactamente 10 dígitos numéricos.',
        });
        return;
    }
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas no coinciden',
            text: 'Asegúrate de que las contraseñas coincidan.',
        });
        return;
    }

    if (password.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña insegura',
            text: 'La contraseña debe tener al menos 8 caracteres.',
        });
        return;
    }

    // Mostrar alerta de éxito si todo está correcto
    Swal.fire({
        icon: 'success',
        title: 'Edición exitosa',
        text: 'Los datos han sido actualizados exitosamente.',
    }).then(() => {
        // Actualizar los datos en la tarjeta seleccionada en el DOM
        selectedCard.querySelector(".card-title").textContent = nombres;
        selectedCard.querySelectorAll(".card-description span")[1].textContent = apellidos;
        selectedCard.querySelectorAll(".card-description span")[3].textContent = telefono;
        selectedCard.querySelectorAll(".card-description span")[5].textContent = email;
        selectedCard.setAttribute("data-password", password);

        // Cerrar el modal y reiniciar el formulario
        event.target.reset();
        closeModal('editModal');
    });
});


document.querySelector('.btn-submit').addEventListener('click', addCard);
let isEditMode = false;

// Función para alternar el estado de edición
document.getElementById("editButton").addEventListener("click", function (event) {
    isEditMode = !isEditMode; // Alterna el estado de edición

    // Cambiar el estado de las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isEditMode) {
            card.classList.add('edit-mode'); // Muestra el ícono de editar
        } else {
            card.classList.remove('edit-mode'); // Oculta el ícono de editar
        }
    });
    event.stopPropagation();
});

/* Otras funciones de las cards */

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

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');

    function toggleMenu() {
        sideMenu.classList.toggle('active');
    }

    menuToggle.addEventListener('click', toggleMenu);

    
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }
});







