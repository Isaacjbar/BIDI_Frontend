import { showAlert } from '../../../Config/config.js';

document.addEventListener('DOMContentLoaded', () => {
    const loanList = document.getElementById('loan-list'); // Donde se mostrarán los libros

    // Cargar los libros al inicio
    loadLoans();

    // Función para cargar los libros existentes desde el backend
    async function loadLoans() {
        try {
        const response = await fetch(`http://localhost:8080/sibi/customer/loan/${localStorage.getItem('userId')}`, {
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

        // Agregar la tarjeta a la lista de libros
        loanList.appendChild(card);
    }
    
});
