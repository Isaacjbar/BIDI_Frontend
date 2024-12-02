document.addEventListener('DOMContentLoaded', () => {
    const loanList = document.getElementById('loan-list'); // Donde se mostrarán los libros

    // Cargar los libros al inicio
    loadBooks();

    // Función para cargar los libros existentes desde el backend
    async function loadBooks() {
        try {
            const response = await fetch('http://localhost:8080/sibi/admin/loan/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar los prestamos');
            }

            const result = await response.json();
            
             // Mostrar la respuesta en la consola para ver qué se recibe
            console.log('Respuesta del backend:', result);
    
            console.log(loanList);  // Verifica que el contenedor se selecciona correctamente
            result.result.forEach(loan => {
                createLoanCard(loan);
            });
        } catch (error) {
            console.error('Error:', error.message);
            showAlert('error', 'Error', 'Hubo un error al cargar los préstamos', '');
        }
    }

    // Función para formatear fechas
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    }

    // Función para crear una tarjeta de libro
    function createLoanCard(loan) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-status', loan.status);
        card.setAttribute('data-id', loan.prestamoId);

        // Formatear las fechas antes de mostrarlas
    const fechaPrestamoFormatted = formatDate(loan.fechaPrestamo);
    const fechaVencimientoFormatted = formatDate(loan.fechaVencimiento);
    const DevolucionFormatted = loan.fechaDevolucion ? formatDate(loan.fechaDevolucion) : "Pendiente";


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
        </div>
        <div class="card-body">
            <div class="card-description" id="loan-user-name">
                <span class="card-data"><strong>Usuario:</strong></span><br>
                ${loan.usuario.nombre} ${loan.usuario.apellidos}
            </div>
            <div class="card-description" id="loan-book-title">
                <span class="card-data"><strong>Libro:</strong></span><br>
                "${loan.libro.title}"
            </div>
            <div class="card-description" id="loan-fechaPrestamo">
                <span class="card-data"><strong>Fecha de Préstamo:</strong></span><br>
                ${fechaPrestamoFormatted}
            </div>
            <div class="card-description" id="loan-fechaVencimiento">
                <span class="card-data"><strong>Fecha de Vencimiento:</strong></span><br>
                ${fechaVencimientoFormatted}
            </div>
            <div class="card-description" id="loan-fechaDevolucion">
                <span class="card-data"><strong>Devolución:</strong></span><br>
                ${DevolucionFormatted}
            </div>
        </div>
        `;

        // Agregar el botón de activación/desactivación a la tarjeta
        addToggleButton(card);

        // Agregar la tarjeta a la lista de libros
        loanList.appendChild(card);
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
            const response = await fetch(`http://localhost:8080/sibi/admin/loan/status/${status}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar los libros');
            }

            const result = await response.json();
            
            loanList.innerHTML=""
            result.result.forEach(loan => {
                createBookCard(loan);
            });
        } catch (error) {
            console.error('Error:', error.message);
            showAlert('error', 'Error', 'Hubo un error al cargar los libros', '');
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
        updateLoanStatus(card, newStatus);
    });

    card.appendChild(button);
    }

    async function updateLoanStatus(card, newStatus) {
        const loanId = card.getAttribute('data-id');
        const loanData = {
            prestamoId: loanId,
            estado: newStatus
        };
    
        console.log(loanData);
    
        try {
            const response = await fetch('http://localhost:8080/sibi/admin/loan/change-status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(loanData)
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar el estado del libro');
            }
    
            const result = await response.json();
    
            // Asegurarse de que result.result existe
            if (!result || !result.result) {
                throw new Error('Respuesta del backend inválida');
            }
    
            const updatedLoan = result.result; // Ahora guardamos todo el objeto del libro
    
    
            // Actualizar el estado en el frontend
            updateFrontendStatus(card, updatedLoan);
    
            console.log('Estado actualizado correctamente en el backend');
        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al actualizar el estado del libro.');
        }
    }
    
    function updateFrontendStatus(card, updatedLoan) {
        if (!updatedLoan) {
            console.error('No se pudo actualizar el prestamo: objeto nulo o indefinido');
            return;
        }
    
        // Actualizar atributo de estado
        card.setAttribute('data-status', updatedLoan.status);
    
        // Cambiar color del indicador de estado
        const statusIndicator = card.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.style.backgroundColor = updatedLoan.status === 'ACTIVE' ? '#4CAF50' : '#F44336'; // Verde/rojo
        } else {
            console.warn('No se encontró el indicador de estado');
        }
    
        // Actualizar texto y estilo del botón
        const button = card.querySelector('.toggle-button');
        if (button) {
            button.textContent = updatedLoan.status === 'ACTIVE' ? 'Desactivar' : 'Activar';
            button.style.backgroundColor = updatedLoan.status === 'ACTIVE' ? 'red' : 'green';
        } else {
            console.warn('No se encontró el botón de estado');
        }

        // Actualizar fecha de devolución
        const fechaDevolucionR = updatedLoan.fechaDevolucion;
        const fechaDevolucion = card.querySelector('#loan-fechaDevolucion'); // Usar querySelector para seleccionar el div correctamente

        // Verificar si el elemento existe
        if (fechaDevolucion) {
            // Si fechaDevolucionR es null, mostrar "Pendiente", de lo contrario mostrar la fecha
            fechaDevolucion.textContent = fechaDevolucionR ? formatDate(fechaDevolucionR) : "Pendiente";
        } else {
            console.warn
        }
    }


   // Asigna el evento al formulario de registro de préstamo
    document.getElementById('registerForm').addEventListener('submit', submitForm);

    async function submitForm(event) {
        event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario

        const form = document.getElementById('registerForm');
        const loanData = {
            usuarioId: form.registerUser.value, // ID del usuario seleccionado
            libroId: form.registerBook.value, // ID del libro seleccionado
        };

        console.log('Datos a enviar:', loanData);

        try {
            const response = await fetch('http://localhost:8080/sibi/admin/loan/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Asegúrate de enviar el JWT
                },
                body: JSON.stringify(loanData)
            });

            if (response.badRequest) {
                throw new Error('Error al registrar el préstamo');
            }

            const result = await response.json();
            console.log('Préstamo registrado:', result);
        
            // Cerrar el modal y limpiar el formulario
            closeModal('registerModal');
            form.reset();
        
            // Crear la tarjeta del préstamo registrado
            const loan = result.result; // Suponiendo que el préstamo registrado viene en result.result
        
            // Si el préstamo tiene datos válidos, crear la tarjeta de préstamo
            if (loan) {
                createLoanCard(loan);  // Usar el objeto loan para crear la tarjeta del préstamo
            } else {
                console.log('Error: El préstamo no tiene datos válidos');
            }
        
            // Notificar al usuario
            alert('Préstamo registrado correctamente');
        } catch (error) {
            console.error('Error:', error.message);
            showAlert('error', 'Error', 'Hubo un error al registrar el préstamo', '');
        }
    }


    
});
