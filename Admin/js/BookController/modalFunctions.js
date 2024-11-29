// modalFunctions.js

// Función para abrir el modal de registro y cargar las categorías disponibles
async function openModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    const categorySelect = document.getElementById('registerBookCategories');
    categorySelect.innerHTML = ''; // Limpiar las opciones previas

    // Añadir la opción "Seleccione una categoría"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Seleccione una categoría';
    categorySelect.appendChild(defaultOption);

    try {
        // Llamar a la función para cargar las categorías desde el backend
        const categories = await loadCategories();

        // Agregar cada categoría como una opción en el select
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.categoryId; // Usamos el 'categoryId' como valor
            option.textContent = category.categoryName; // Usamos el 'categoryName' de la categoría como texto visible
            categorySelect.appendChild(option); // Añadimos la opción al select
        });
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
        alert('Hubo un error al cargar las categorías.');
    }
}


// Función para cerrar los modales
async function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);

}

// Función para abrir el modal de edición y cargar los datos del libro
async function openEditModal(card) {
    const bookId = card.getAttribute('data-id'); // Obtiene el id del libro
    const bookTitle = card.querySelector('.card-title').textContent; // Obtiene el título del libro
    const bookAuthor = card.querySelector('.card-author').textContent; // Obtiene el autor del libro
    const bookDescription = card.querySelector('.card-description').textContent; // Obtiene la descripción del libro
    const bookCopias = card.querySelector('.card-copias').textContent.replace('Copias: ', ''); // Obtiene las copias
    
    // Obtener las categorías como un array de IDs (categoryId)
    const bookCategories = Array.from(card.querySelector('.card-categories').children)
        .map(cat => cat.getAttribute('data-id')); // Usamos el data-id de cada categoría
    console.log(bookCategories); // Verifica en consola si las categorías llegan correctamente

    // Coloca los valores en los campos del modal de edición
    document.getElementById('editBookTitle').value = bookTitle; // Rellena el campo de título
    document.getElementById('editBookAuthor').value = bookAuthor; // Rellena el campo de autor
    document.getElementById('editBookDescription').value = bookDescription; // Rellena el campo de descripción
    document.getElementById('editBookCopias').value = bookCopias; // Rellena el campo de copias

    // Actualizar el campo de categorías dinámicamente
    const categorySelect = document.getElementById('editBookCategories');
    categorySelect.innerHTML = ''; // Limpia las opciones previas

    // Añadir la opción "Seleccione una categoría"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Seleccione una categoría';
    categorySelect.appendChild(defaultOption);

    try {
        // Llamar a la función para cargar las categorías desde el backend
        const categories = await loadCategories();

        // Agregar cada categoría como una opción en el select
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.categoryId; // Usamos el 'categoryId' como valor
            option.textContent = category.categoryName; // Usamos el 'categoryName' de la categoría como texto visible
            categorySelect.appendChild(option); // Añadimos la opción al select
        });

        // Marcar las categorías seleccionadas por su categoryId
        const options = categorySelect.querySelectorAll('option');
        options.forEach(option => {
            if (bookCategories.includes(option.value)) {
                option.selected = true; // Marca la opción si el categoryId está asociado al libro
            }
        });
        
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
        alert('Hubo un error al cargar las categorías.');
    }

    // Guarda el ID del libro en el formulario
    const editForm = document.getElementById('editForm');
    editForm.setAttribute('data-id', bookId); // Guarda el ID en el formulario

    // Abre el modal
    const modal = document.getElementById("editModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

// Función para cargar las categorías activas desde el backend
async function loadCategories() {
    try {
        const response = await fetch('http://localhost:8080/sibi/admin/category/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Asegúrate de enviar el JWT si es necesario
            }
        });

        if (!response.ok) {
            throw new Error('Error al cargar las categorías');
        }

        const result = await response.json();
        
        // Mostrar la respuesta en la consola para ver qué se recibe
        console.log('Respuesta del backend:', result);

        // Verifica que el contenedor se selecciona correctamente
        const categoriasList = result.result;

        // Devolver el listado de categorías
        return categoriasList;
    } catch (error) {
        console.error('Error:', error.message);
        alert('Hubo un error al cargar las categorías.');
        return [];
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
