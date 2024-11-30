// modalFunctions.js

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

// Función para abrir el modal de registro de préstamo y cargar los libros y usuarios activos
async function openModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    // Cargar libros activos
    try {
        const books = await loadBooks();
        const bookSelect = document.getElementById('registerBook');  // Selector de libros
        bookSelect.innerHTML = '';  // Limpia las opciones previas

        // Crear una opción por defecto
        const defaultBookOption = document.createElement('option');
        defaultBookOption.value = '';
        defaultBookOption.disabled = true;
        defaultBookOption.selected = true;
        defaultBookOption.textContent = 'Seleccione un libro';
        bookSelect.appendChild(defaultBookOption);

        // Añadir los libros al select
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.bookId;  // El ID del libro
            option.textContent = book.title;  // El título del libro
            bookSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los libros:', error);
        alert('Hubo un error al cargar los libros.');
    }

    // Cargar usuarios activos
    try {
        const users = await loadUsers();
        const userSelect = document.getElementById('registerUser');  // Selector de usuarios
        userSelect.innerHTML = '';  // Limpia las opciones previas

        // Crear una opción por defecto
        const defaultUserOption = document.createElement('option');
        defaultUserOption.value = '';
        defaultUserOption.disabled = true;
        defaultUserOption.selected = true;
        defaultUserOption.textContent = 'Seleccione un usuario';
        userSelect.appendChild(defaultUserOption);

        // Añadir los usuarios al select
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.usuarioId;  // El ID del usuario
            option.textContent = `${user.nombre} ${user.apellidos}`;  // El nombre completo del usuario
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        alert('Hubo un error al cargar los usuarios.');
    }
}

// Función para cargar los libros activos
async function loadBooks() {
    try {
        const response = await fetch('http://localhost:8080/sibi/admin/book/status/ACTIVE', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al cargar los libros');
        }

        const result = await response.json();
        return result.result;  // Devuelve los libros activos

    } catch (error) {
        console.error('Error al cargar los libros:', error);
        throw error;
    }
}

// Función para cargar los usuarios activos
async function loadUsers() {
    try {
        const response = await fetch('http://localhost:8080/sibi/admin/user/status/activo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al cargar los usuarios');
        }

        const result = await response.json();
        return result.result;  // Devuelve los usuarios activos

    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        throw error;
    }
}


// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};

// Función para agregar el evento de clic al ícono de edición
function addEditIconHandler(card) {
    const editIcon = card.querySelector('.card-edit-icon');
    editIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que otros eventos de clic se activen
        openEditModal(card); // Pasa la tarjeta como parámetro al abrir el modal
    });
}
