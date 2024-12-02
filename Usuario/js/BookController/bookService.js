document.addEventListener('DOMContentLoaded', () => {
        // Selección de elementos
        const librosList = document.getElementById('libros-list'); // Donde se mostrarán los libros

        // Cargar los libros al inicio
        loadBooks();

        // Función para cargar los libros existentes desde el backend
        async function loadBooks() {
            try {
                const response = await fetch('http://localhost:8080/sibi/customer/book/for-customer', {
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
            // Dentro de createBookCard
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-status', book.status);
            card.setAttribute('data-id', book.bookId);

            // Crear el HTML de la tarjeta
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#c2bfbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                    </div>
                    <div class="card-title">${book.title}</div>
                    <div id="crear-prestamo-btn" class="icon" title="Registrar" onclick="openLoanModal(this.closest('.card'))">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                    </div>
                </div>
                <div class="card-description" id="card-author">${book.author}</div>
                <div class="card-description" id="card-description">${book.description}</div>
                <div class="card-description" id="card-copias">Copias: ${book.copias}</div>
                <div class="card-description" id="card-categories">
                    ${book.categorias.map(catObj => {
                        return `<span class="category" data-id="${catObj.categoria.categoryId}">${catObj.categoria.categoryName}</span>`;
                    }).join(', ')}
                </div>
            `;

        // Agregar la tarjeta a la lista de libros
        librosList.appendChild(card);
        }

        document.getElementById('registerForm').addEventListener('submit', submitForm);
        async function submitForm(event) {
            event.preventDefault(); // Evita el comportamiento por defecto del formulario
            
            const form = document.getElementById('registerForm');
            const loanData = {
                usuarioId: parseInt(localStorage.getItem('userId')), // ID del usuario
                libroId: parseInt(form.registerBook.value), // ID del libro seleccionado
            };
        
            console.log('Datos a enviar:', loanData);
        
            try {
                const response = await fetch('http://localhost:8080/sibi/customer/loan/save/for-customer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Enviar el JWT
                    },
                    body: JSON.stringify(loanData)
                });
        
                if (response.badRequest) {
                    throw new Error('Error al registrar el préstamo');
                }
        
                const result = await response.json();
                console.log('Préstamo registrado:', result);
        
                // Cerrar el modal y limpiar el formulario
                closeModal('loanModal');
                form.reset();
        
                // Notificar al usuario
                alert('Préstamo registrado correctamente');
            } catch (error) {
                console.error('Error:', error.message);
                alert('Hubo un error al registrar el préstamo.');
            }
        }

});
