import { showAlert, jwtVerify, BASE_API_URL, HEADERS, UNLOGIN } from '../../../Config/config.js';
/*
COSAS POR HACER-> 
CORREGIR EL COMPORTAMIENTO DEL FORMULARIO ESCONDIDO, 
CORREGIR EL SOBREPOSICIONAMIENTO DEL FOOTER Y HEADER AL ABRIR MODALES,
IMPLEMENTAR FOOTER Y HEADER EN EL RESTO DE LAS PAGINAS
*/
document.addEventListener('DOMContentLoaded', async function () {
    jwtVerify();

    // Selección de elementos
    const userForm = document.getElementById('registerForm');
    const userList = document.getElementById('user-list'); // Donde se mostrarán las categorías
    const statusSwitch = document.getElementById('statusSwitch'); // Control de estado (activo/inactivo)  

    userForm.querySelector('.btn-submit').addEventListener('click', async (event) => {
        event.preventDefault();
        const name = document.getElementById('Nombres').value.trim();
        const surname = document.getElementById('Apellidos').value.trim();
        const email = document.getElementById('email').value.trim();
        const phoneNumber = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (password !== confirmPassword) {
            showAlert('error', 'Error', 'Las contraseñas no coinciden', '');
            return;
        }

        try {
            const response = await fetch(BASE_API_URL + 'global/register', {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(
                    {
                        nombre: name,
                        apellidos: surname,
                        correo: email,
                        contrasena: password,
                        numeroTelefono: phoneNumber
                    }
                ),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorResponse = await response.json();

                if (typeof errorResponse === 'object' && !errorResponse.text) {
                    const errorMessages = Object.values(errorResponse).join(", ");
                    showAlert('error', 'Error', errorMessages, '');
                } else if (errorResponse.text) {
                    showAlert('error', 'Error', errorResponse.text, '');
                }
                return;
            }

            const result = await response.json();
            const u = result.result;

            showAlert('success', 'Éxito', result.text, '');

            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-status', u.estado);
            card.setAttribute('data-id', u.usuarioId);

            card.innerHTML = `
                    <div class="card-header">
                        <div class="card-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span class="status-indicator"></span>
                        </div>
                        <div class="card-title">${u.nombre || "No disponible"}</div>
                        <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z" />
                        </svg>
                    </div>

                    <div class="card-body">
                        <div class="card-surname">
                            <span class="card-data"><strong>Apellidos:</strong></span><br>
                                <span>${u.apellidos || "No disponible"}</span>
                        </div>
                        <div class="card-phoneNumber">
                            <span class="card-data"><strong>Teléfono:</strong></span><br>
                                <span>${u.numeroTelefono || "No disponible"}</span>
                        </div>
                        <div class="card-email">
                            <span class="card-data"><strong>Correo:</strong></span><br>
                                <span>${u.correo || "No disponible"}</span>
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

            // Añadir la tarjeta a la lista
            userList.appendChild(card);

            // Ocultar el formulario
            closeModal('registerModal');
            // userForm.classList.add('hidden');
        } catch (error) {
            console.error('Error:', error.message);
            showAlert('error', 'Error', 'Hubo un error al registrar el usuario', '');
        }
    });

    // Función para manejar el envío de los datos de edición
    document.getElementById('editForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const editName = document.getElementById('editNombres').value.trim();
        const editSurname = document.getElementById('editApellidos').value.trim();
        const editEmail = document.getElementById('editEmail').value.trim();
        const editPhoneNumber = document.getElementById('editTelefono').value.trim();
        const editPassword = document.getElementById('editPassword').value.trim();
        const editConfirmPassword = document.getElementById('editConfirmPassword').value.trim();

        const userId = event.target.getAttribute('data-id'); // Obtener el ID del usuario desde el formulario

        if (editPassword !== editConfirmPassword) {
            showAlert('error', 'Error', 'Las contraseñas no coinciden', '');
            return;
        }

        try {
            const response = await fetch(BASE_API_URL + 'admin/user/modify', {
                method: 'PUT',
                headers: HEADERS,
                body: JSON.stringify(
                    {
                        usuarioId: userId,
                        nombre: editName,
                        apellidos: editSurname,
                        correo: editEmail,
                        numeroTelefono: editPhoneNumber,
                        contrasena: editPassword
                    }
                ),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorResponse = await response.json();

                if (typeof errorResponse === 'object' && !errorResponse.text) {
                    const errorMessages = Object.values(errorResponse).join(", ");
                    showAlert('error', 'Error', errorMessages, '');
                } else if (errorResponse.text) {
                    showAlert('error', 'Error', errorResponse.text, '');
                }
                return;
            }

            const result = await response.json();
            // const updatedUser = result.result; 
            userList.innerHTML = ``;
            /*
                        // Actualiza la tarjeta correspondiente con la nueva información
                        const cardToUpdate = document.querySelector(`.card[data-id='${userId}']`);
                        cardToUpdate.querySelector('.card-title').textContent = updatedUser.nombre;
            
                        cardToUpdate.querySelector('.card-surname span').textContent = updatedUser.apellidos;
                        cardToUpdate.querySelector('.card-phoneNumber span').textContent = updatedUser.numeroTelefono;
                        cardToUpdate.querySelector('.card-email span').textContent = updatedUser.correo;
            
                        cardToUpdate.setAttribute('data-status', updatedUser.estado); // Actualiza el status si es necesario
            */
            loadUsers();
            // Cierra el modal
            closeModal('editModal');
            showAlert('success', 'Éxito', result.text, '');
        } catch (error) {
            console.error('Error:', error.message);
            showAlert('error', 'Error', 'Hubo un error al editar la información del usuario', '');
        }
    });

    async function updateUserStatus(card, newStatus) {
        const userId = card.getAttribute('data-id');

        try {
            const response = await fetch(BASE_API_URL + 'admin/user/change-status', {
                method: 'PUT',
                headers: HEADERS,
                body: JSON.stringify({ usuarioId: userId }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Usamos await correctamente aquí
                if (typeof errorResponse === 'object' && !errorResponse.text) {
                    const errorMessages = Object.values(errorResponse).join(", ");
                    showAlert('error', 'Error', errorMessages, '');
                } else if (errorResponse.text) {
                    showAlert('error', 'Error', errorResponse.text, '');
                }
                return;
            }

            const result = await response.json();
            showAlert('success', 'Éxito', 'Estado actualizado con éxito', '');

            const updatedUser = result.result;
            card.setAttribute('data-status', updatedUser.estado);
            const statusIndicator = card.querySelector('.status-indicator');
            
            if (updatedUser.estado === 'ACTIVO') {
                statusIndicator.style.backgroundColor = '#4CAF50'; // Verde para activo
            } else {
                statusIndicator.style.backgroundColor = '#F44336'; // Rojo para inactivo
            }

            // Actualiza el texto y color del botón
            const button = card.querySelector('.toggle-button');
            button.textContent = updatedUser.estado === 'ACTIVO' ? 'Desactivar' : 'Activar';
            button.style.backgroundColor = updatedUser.estado === 'ACTIVO' ? 'red' : 'green';

        } catch (error) {
            console.error('Error:', error.message);
            showAlert('error', 'Error', 'Hubo un error al actualizar el estado del usuario', '');
        }
    }

    /*
    function updateUserStatus(card, newStatus) {
        const userId = card.getAttribute('data-id');

        fetch(BASE_API_URL + 'admin/user/change-status', {
            method: 'PUT',
            headers: HEADERS,
            body: JSON.stringify(
                {
                    usuarioId: userId
                }
            ),
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    const errorResponse = await response.json();
                    if (typeof errorResponse === 'object' && !errorResponse.text) {
                        const errorMessages = Object.values(errorResponse).join(", ");
                        showAlert('error', 'Error', errorMessages, '');
                    } else if (errorResponse.text) {
                        showAlert('error', 'Error', errorResponse.text, '');
                    }
                    return;
                }
                showAlert('success', 'Éxito', response.text, '');
                return response.json();
            })
            .then(result => {
                const updatedUser = result.result;

                card.setAttribute('data-status', updatedUser.estado);
                const statusIndicator = card.querySelector('.status-indicator');
                if (updatedUser.estado === 'ACTIVO') {
                    statusIndicator.style.backgroundColor = '#4CAF50'; // Activado
                } else {
                    statusIndicator.style.backgroundColor = '#F44336'; // Desactivado
                }

                // Actualizar el texto del botón de estado
                const button = card.querySelector('.toggle-button');
                button.textContent = updatedUser.estado === 'ACTIVO' ? 'Desactivar' : 'Activar';
                button.style.backgroundColor = updatedUser.estado === 'ACTIVO' ? 'red' : 'green';

            })
            .catch(error => {
                console.error('Error:', error.message);
                showAlert('error', 'Error', 'Hubo un error al actualizar el estado del usuario', '');
            });
    }*/

    // Modificación en la función 'addToggleButton' para integrar la actualización del estado en el backend
    function addToggleButton(card) {
        console.log(card.estado);
        const button = document.createElement('button');
        button.className = 'toggle-button';

        const status = card.getAttribute('data-status');
        button.textContent = status === 'ACTIVO' ? 'Desactivar' : 'Activar';
        button.style.backgroundColor = status === 'ACTIVO' ? 'red' : 'green';

        // Configurar el color del indicador de estado
        const statusIndicator = card.querySelector('.status-indicator');
        if (status === 'ACTIVO') {
            statusIndicator.style.backgroundColor = '#4CAF50'; // Verde
        } else {
            statusIndicator.style.backgroundColor = '#F44336'; // Rojo
        }

        // Alterna el estado de activación de la tarjeta al hacer clic
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const isActive = card.getAttribute('data-status') === 'ACTIVO';

            // Cambia el estado en el frontend
            const newStatus = isActive ? 'INACTIVO' : 'ACTIVO';
            card.setAttribute('data-status', newStatus);
            button.style.backgroundColor = isActive ? 'green' : 'red';
            button.textContent = isActive ? 'Activar' : 'Desactivar';

            const statusIndicator = card.querySelector('.status-indicator');
            if (newStatus === 'ACTIVO') {
                statusIndicator.style.backgroundColor = '#4CAF50';
            } else {
                statusIndicator.style.backgroundColor = '#F44336';
            }

            // Enviar la solicitud al backend para actualizar el estado
            updateUserStatus(card, newStatus);
        });

        card.appendChild(button);
    }

    // Cambia el texto y filtra las cards según el estado (activo o inactivo)
    document.getElementById("statusSwitch").addEventListener("change", function () {
        const statusText = document.getElementById("statusText");
        const showActive = this.checked;
        statusText.textContent = showActive ? "Activos" : "Inactivos";

        // Filtra las cards según el estado del switch
        fetchUserByStatus(showActive ? 'ACTIVO' : 'INACTIVO');
    });

    // Función para hacer la solicitud al backend y obtener las categorías según el estado
    async function fetchUserByStatus(status) {
        try {
            // Realizar la solicitud GET al backend para obtener las categorías filtradas por estado
            const response = await fetch(`${BASE_API_URL}admin/user/status/${status}`, {
                method: 'GET',
                headers: HEADERS,
                credentials: 'include'
            });

            if (!response.ok) {
                const errorResponse = await response.json();

                if (typeof errorResponse === 'object' && !errorResponse.text) {
                    const errorMessages = Object.values(errorResponse).join(", ");
                    showAlert('error', 'Error', errorMessages, '');
                } else if (errorResponse.text) {
                    showAlert('error', 'Error', errorResponse.text, '');
                }
                return;
            }

            const result = await response.json();

            // Limpiar las tarjetas actuales antes de agregar las nuevas
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';

            // Crear y agregar las tarjetas obtenidas del backend
            result.result.forEach(user => {
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-status', user.estado);
                card.setAttribute('data-id', user.usuarioId);
                // Agregar contenido a la card
                card.innerHTML = `
                        <div class="card-header">
                            <div class="card-icon">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                <span class="status-indicator"></span>
                            </div>
                            <div class="card-title">${user.nombre || "No disponible"}</div>
                            <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z" />
                            </svg>
                        </div>

                        <div class="card-body">
                            <div class="card-surname">
                                <span class="card-data"><strong>Apellidos:</strong></span><br>
                                    <span>${user.apellidos || "No disponible"}</span>
                            </div>
                            <div class="card-phoneNumber">
                                <span class="card-data"><strong>Teléfono:</strong></span><br>
                                    <span>${user.numeroTelefono || "No disponible"}</span>
                            </div>
                            <div class="card-email">
                                <span class="card-data"><strong>Correo:</strong></span><br>
                                    <span>${user.correo || "No disponible"}</span>
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

                // Añadir la tarjeta al contenedor
                userList.appendChild(card);
            });

        } catch (error) {
            console.error('Error:', error.message);
            showAlert('error', 'Error', 'Hubo un error al cargar los usuarios', '');
        }
    }

    async function loadUsers() {
        try {
            const response = await fetch(BASE_API_URL + 'admin/user/find-all', {
                method: 'GET',
                headers: HEADERS,
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error en la respuesta del servidor:", errorText);
                showAlert('error', 'Error', error.Text, '');
                return;
            }

            const result = await response.json();

            result.result.forEach(user => {
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-status', user.estado);
                card.setAttribute('data-id', user.usuarioId);
                // Agregar contenido a la card
                card.innerHTML = `
                        <div class="card-header">
                            <div class="card-icon">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                <span class="status-indicator"></span>
                            </div>
                            <div class="card-title">${user.nombre || "No disponible"}</div>
                            <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z" />
                            </svg>
                        </div>

                        <div class="card-body">
                            <div class="card-surname">
                                <span class="card-data"><strong>Apellidos:</strong></span><br>
                                    <span>${user.apellidos || "No disponible"}</span>
                            </div>
                            <div class="card-phoneNumber">
                                <span class="card-data"><strong>Teléfono:</strong></span><br>
                                    <span>${user.numeroTelefono || "No disponible"}</span>
                            </div>
                            <div class="card-email">
                                <span class="card-data"><strong>Correo:</strong></span><br>
                                    <span>${user.correo || "No disponible"}</span>
                            </div>
                        </div> 
                    `;

                // Agregar el botón de activación/desactivación a la tarjeta
                addToggleButton(card);
                console.log(card.estado);
                // Agregar evento al ícono de edición
                card.querySelector(".card-edit-icon").addEventListener("click", (event) => {
                    event.stopPropagation();
                    openEditModal(card);
                });
                // Asegúrate de que el contenedor está visible antes de agregar las cards
                userList.appendChild(card);
            });
        } catch (error) {
            console.error('Error al obtener los usuarios:', error.message);
            showAlert('error', 'Error', 'Hubo un error al cargar los usuarios.', '');
        }
    }
    loadUsers();
});