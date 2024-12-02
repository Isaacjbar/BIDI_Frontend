document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const formularioLibro = document.getElementById('registerForm');
    const librosList = document.getElementById('libros-list'); // Donde se mostrarán los libros
    const statusSwitch = document.getElementById('statusSwitch'); // Control de estado (activo/inactivo)
    const filterInput = document.getElementById('filterInput'); // Filtro de búsqueda por título

    // Cargar los libros al inicio
    loadBooks();

    // Función para cargar los libros existentes desde el backend
    async function loadBooks() {
        try {
            const response = await fetch('http://localhost:8080/sibi/admin/book/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar los libros');
            }

            const result = await response.json();
            
             // Mostrar la respuesta en la consola para ver qué se recibe
            console.log('Respuesta del backend:', result);
    
            console.log(librosList);  // Verifica que el contenedor se selecciona correctamente
            result.result.forEach(book => {
                createBookCard(book);
            });
        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al cargar los libros.');
        }
    }

    // Función para crear una tarjeta de libro
    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-status', book.status);
        card.setAttribute('data-id', book.bookId);

        // Crear el HTML de la tarjeta, ahora iterando sobre las categorías
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#c2bfbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span class="status-indicator"></span>
                </div>
                <div class="card-title">${book.title}</div>
                            <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z" />
                            </svg>
                </div>
                <div class="card-body">
            <div class="card-author">
            <span class="card-data"><strong>Autor:</strong></span><br>
            <span>${book.author || "No disponible"} </span>
            </div>
            <div class="card-description">
            <span class="card-data"><strong>Descripción:</strong></span><br>
            <span class="description">${book.description || "No disponible"} </span>
            </div>
            <div class="card-categories">
            <span class="card-data"><strong>Categoría(s):</strong></span><br>
            ${book.categorias.map(catObj => {
                // Aquí agregamos el data-id con el categoryId de cada categoría
                return `<span class="category" data-id="${catObj.categoria.categoryId}">${catObj.categoria.categoryName}</span>`;
            }).join(', ')}
        </div>
        <div class="card-copias">
            <span class="card-data"><strong>Copias:</strong></span><br>
            <span class="copias">${book.copias || "No disponible"} </span>
            </div>
        </div>
        `;

    // Agregar el botón de activación/desactivación a la tarjeta
    addToggleButton(card);
    
    // Agregar evento al ícono de edición
    card.querySelector(".card-edit-icon").addEventListener("click", (event) => {
        event.stopPropagation();
        openEditModal(card);
    });

    // Agregar la tarjeta a la lista de libros
    librosList.appendChild(card);
    }

    // Cambia el texto y filtra las cards según el estado (activo o inactivo)
    document.getElementById("statusSwitch").addEventListener("change", function () {
        const statusText = document.getElementById("statusText");
        const showActive = this.checked;
        statusText.textContent = showActive ? "Activos" : "Inactivos";

        // Filtra las cards según el estado del switch
        loadBooksStatus(showActive ? 'ACTIVE' : 'INACTIVE');
    });

    async function loadBooksStatus(status) {
        try {
            const response = await fetch(`http://localhost:8080/sibi/admin/book/status/${status}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar los libros');
            }

            const result = await response.json();
            
            librosList.innerHTML=""
            result.result.forEach(book => {
                createBookCard(book);
            });
        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al cargar los libros.');
        }
    }

    function addToggleButton(card) {
    const button = document.createElement('button');
    button.className = 'toggle-button';
    button.textContent = card.dataset.status === 'ACTIVE' ? 'Desactivar' : 'Activar';
    button.style.backgroundColor = card.dataset.status === 'ACTIVE' ? 'red' : 'green';

    // Alterna el estado de activación de la tarjeta al hacer clic
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const isActive = card.getAttribute('data-status') === 'ACTIVE';

        // Cambia el estado en el frontend
        const newStatus = isActive ? 'INACTIVE' : 'ACTIVE';
        card.setAttribute('data-status', newStatus);
        button.style.backgroundColor = isActive ? 'green' : 'red';
        button.textContent = isActive ? 'Activar' : 'Desactivar';

        const statusIndicator = card.querySelector('.status-indicator');
        if (newStatus === 'ACTIVE') {
            statusIndicator.style.backgroundColor = '#4CAF50';
        } else {
            statusIndicator.style.backgroundColor = '#F44336';
        }

        // Enviar la solicitud al backend para actualizar el estado
        updateBookStatus(card, newStatus);
    });

    card.appendChild(button);
    }

    async function updateBookStatus(card, newStatus) {
        const bookId = card.getAttribute('data-id');
        const bookData = {
            bookId,
            status: newStatus
        };
    
        console.log(bookData);
    
        try {
            const response = await fetch('http://localhost:8080/sibi/admin/book/change-status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(bookData)
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar el estado del libro');
            }
    
            const result = await response.json();
    
            // Asegurarse de que result.result existe
            if (!result || !result.result) {
                throw new Error('Respuesta del backend inválida');
            }
    
            const updatedBook = result.result; // Ahora guardamos todo el objeto del libro
    
            console.log(updatedBook);
    
            // Actualizar el estado en el frontend
            updateFrontendStatus(card, updatedBook);
    
            console.log('Estado actualizado correctamente en el backend');
        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al actualizar el estado del libro.');
        }
    }
    
    function updateFrontendStatus(card, updatedBook) {
        if (!updatedBook) {
            console.error('No se pudo actualizar el libro: objeto nulo o indefinido');
            return;
        }
    
        // Actualizar atributo de estado
        card.setAttribute('data-status', updatedBook.status);
    
        // Cambiar color del indicador de estado
        const statusIndicator = card.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.style.backgroundColor = updatedBook.status === 'ACTIVE' ? '#4CAF50' : '#F44336'; // Verde/rojo
        } else {
            console.warn('No se encontró el indicador de estado');
        }
    
        // Actualizar texto y estilo del botón
        const button = card.querySelector('.toggle-button');
        if (button) {
            button.textContent = updatedBook.status === 'ACTIVE' ? 'Desactivar' : 'Activar';
            button.style.backgroundColor = updatedBook.status === 'ACTIVE' ? 'red' : 'green';
        } else {
            console.warn('No se encontró el botón de estado');
        }
    }

   // Asigna el evento al formulario de registro
    document.getElementById('registerForm').addEventListener('submit', submitRegisterForm);

    async function submitRegisterForm(event) {
        event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario

        const form = document.getElementById('registerForm');
        const bookData = {
            title: form.bookTitle.value,
            author: form.bookAuthor.value,
            description: form.bookDescription.value,
            copias: parseInt(form.bookCopias.value, 10),
            categorias: Array.from(form.registerBookCategories.selectedOptions)
                .map(option => ({ categoryId: option.value })) // Asegúrate de enviar los IDs correctos
        };

        console.log('Datos a enviar:', bookData);

        try {
            const response = await fetch('http://localhost:8080/sibi/admin/book/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Asegúrate de enviar el JWT
                },
                body: JSON.stringify(bookData)
            });

            if (response.badRequest) {
                throw new Error('Error al registrar el libro');
            }
            const result = await response.json();
            console.log('Libro registrado:', result);
    
            // Cerrar el modal y limpiar el formulario
            closeModal('registerModal');
            form.reset();
    
            // Verificar si las categorías son null o undefined antes de intentar crear la tarjeta
            const book = result.result;
    
            if (book.categorias && Array.isArray(book.categorias)) {
                // Si las categorías no son null y son un array, se pueden procesar
                createBookCard(book);  // Usa el objeto book que contiene los datos del libro registrado
            } else {
                // Si no hay categorías, asignar un valor por defecto o mostrar un mensaje
                console.log('No se encontraron categorías para el libro registrado');
                book.categorias = []; // Asignar un array vacío en caso de que no haya categorías
                createBookCard(book);  // Crear la tarjeta igualmente
            }
    
            // Notificar al usuario
            alert('Libro registrado correctamente');
        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al registrar el libro.');
        }
    }

    // Asigna el evento al formulario de edición
    document.getElementById('editForm').addEventListener('submit', submitEditForm);

    async function submitEditForm(event) {
        event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario

        const form = document.getElementById('editForm');
        const bookId = form.getAttribute('data-id'); // Obtén el ID del libro desde el formulario
        const bookData = {
            bookId: bookId,
            title: form.editBookTitle.value,
            author: form.editBookAuthor.value,
            description: form.editBookDescription.value,
            copias: parseInt(form.editBookCopias.value, 10),
            categorias: Array.from(form.editBookCategories.selectedOptions)
                .map(option => ({ categoryId: option.value })) // Asegúrate de enviar los IDs correctos
        };

        console.log('Datos a enviar:', bookData);

        try {
            const response = await fetch(`http://localhost:8080/sibi/admin/book/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Asegúrate de enviar el JWT
                },
                body: JSON.stringify(bookData)
            });

            if (!response.ok) {
                throw new Error('Error al editar el libro');
            }

            const result = await response.json();
            console.log('Libro editado:', result);

            // Cerrar el modal y limpiar el formulario
            closeModal('editModal');

            // Actualizar la tarjeta en el frontend
            updateBookCard(result.result);

            // Notificar al usuario
            alert('Libro editado correctamente');

        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al editar el libro.');
        }
    }

    // Función para actualizar la tarjeta del libro en el frontend
    function updateBookCard(updatedBook) {
        // Encuentra la tarjeta que corresponde al libro editado
        const card = document.querySelector(`.card[data-id="${updatedBook.bookId}"]`);
        
        if (card) {
            // Actualizar los campos de la tarjeta con los nuevos datos
            card.querySelector('.card-title').textContent = updatedBook.title;
            card.querySelector('.card-author').textContent = updatedBook.author;
            card.querySelector('.card-description').textContent = updatedBook.description;
            card.querySelector('.card-copias').textContent = `Copias: ${updatedBook.copias}`;

            // Actualizar las categorías (si es necesario)
            const categoriesElement = card.querySelector('.card-categories');
            categoriesElement.innerHTML = ''; // Limpiar categorías anteriores

            updatedBook.categorias.forEach(category => {
                const categoryElement = document.createElement('span');
                categoryElement.textContent = category.categoryName; // Asume que cada categoría tiene un 'categoryName'
                categoriesElement.appendChild(categoryElement);
            });
        }
    }

    
});
