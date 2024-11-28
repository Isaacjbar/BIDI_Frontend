import { showAlert, jwtVerify, BASE_API_URL, HEADERS } from '../../../Config/config.js'; 

document.addEventListener("DOMContentLoaded", function () {
    jwtVerify();
    // Selección de elementos
    const userForm = document.getElementById('registerForm');
    const userList = document.getElementById('user-list'); // Donde se mostrarán las categorías
    const statusSwitch = document.getElementById('statusSwitch'); // Control de estado (activo/inactivo)  

    console.log("DOMContentLoaded: Formulario y lista de usuarios cargados.");

    // Enviar datos al endpoint "user/modify" (modificar usuario)
    userForm.querySelector('.btn-submit').addEventListener('click', async (event) => {
        event.preventDefault(); // Prevenir recarga de la página
        console.log("Formulario enviado.");

        const name = document.getElementById('Nombres').value.trim();
        const surname = document.getElementById('Apellidos').value.trim();
        const email = document.getElementById('email').value.trim();
        const phoneNumber = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        console.log("Datos del formulario:", { name, surname, email, phoneNumber, password, confirmPassword });

        // Validación básica
        if (password !== confirmPassword) {
            showAlert('error', 'Error', 'Las contraseñas no coinciden', '');
            console.log("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await fetch(BASE_API_URL + 'admin/user/modify', {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(
                    {
                        nombre: name,
                        apellidos: surname,
                        correo: email,
                        numeroTelefono: phoneNumber,
                        contrasena: password
                    }
                ),
                credentials: 'include'
            });

            console.log("Respuesta de la API de modificación de usuario:", response.status);

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log("Error en la respuesta de la API:", errorResponse);
                if (typeof errorResponse === 'object' && !errorResponse.text) {
                    const errorMessages = Object.values(errorResponse).join(". ");
                    showAlert('error', 'Error', errorMessages, '');
                } else if (errorResponse.text) {
                    showAlert('error', 'Error', errorResponse.text, '');
                }
                return;
            }

            // await addUserCards();

            // Ocultar el formulario
            userForm.classList.add('hidden');
            console.log("Formulario ocultado después de modificar el usuario.");

        } catch (error) {
            showAlert('error', 'Error', 'No se pudo realizar el registro, intentalo nuevamente.', '');
            console.log("Error al enviar los datos del formulario:", error);
        }

    });

    async function addUserCards() {
        console.log("Intentando agregar tarjetas de usuarios...");
        try {
            const response = await fetch(BASE_API_URL + "admin/user/find-all", {
                method: "GET",
                headers: HEADERS,
                credentials: 'include'
            });

            console.log("Respuesta de la API para obtener todos los usuarios:", response.status);

            const data = await response.json();
            console.log("Datos recibidos de la API de usuarios:", data);

            if (data.result && Array.isArray(data.result)) {
                console.log("Usuarios obtenidos:", data.result);

                data.result.forEach(user => {
                    console.log("Procesando usuario:", user);

                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.setAttribute('data-id', user.usuarioId);
                    card.setAttribute('data-status', user.estado);
                    card.setAttribute('data-rol', user.rol);

                    card.innerHTML = `
                        <div class="card-header">
                            <div class="card-icon">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                                <span class="status-indicator"></span>
                            </div>
                            <div class="card-title">${user.nombre || "No disponible"}</div>
                            <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                            </svg>
                        </div>
                        <div class="card-description">
                            <span class="card-data"><strong>Apellidos:</strong></span><br>
                            <span>${user.apellidos || "No disponible"}</span>
                
                            <span class="card-data"><strong>Teléfono:</strong></span><br>
                            <span>${user.numeroTelefono || "No disponible"}</span>
                        
                            <span class="card-data"><strong>Correo:</strong></span><br>
                            <span>${user.correo}</span>
                        </div>
                    `;

                    addToggleButton(card);  // Añadir el botón de activación/desactivación
                    console.log("Botón de activación/desactivación agregado.");

                    card.querySelector(".card-edit-icon").addEventListener("click", (event) => {
                        event.stopPropagation();
                        openEditModal(card);
                        console.log("Edit modal abierto para la tarjeta de usuario.");
                    });

                    userList.appendChild(card);
                    console.log("Tarjeta agregada a la lista de usuarios.");
                });

            } else {
                console.log("No se recibió una lista válida de usuarios.");
            }
        } catch (error) {
            showAlert('error', 'Error', 'Hubo un error al obtener los datos, intenta nuevamente.', '');
            console.log("Error al obtener los usuarios:", error);
        }
    }

    addUserCards();  // Inicialización para agregar las tarjetas

    // Cambiar estado de usuario
    userList.addEventListener('click', async (event) => {
        const card = event.target.closest('.card');
        if (card && card.classList.contains('card')) {
            const userId = card.getAttribute('data-id');
            console.log("Usuario seleccionado para cambiar estado:", userId);

            try {
                // Realizar la petición PUT para cambiar el estado
                const response = await fetch(BASE_API_URL + 'user/change-status', {
                    method: 'PUT',
                    headers: HEADERS,
                    body: JSON.stringify(
                        {
                            usuarioId: userId
                        }
                    ),
                    credentials: 'include'
                });

                console.log("Respuesta de la API al cambiar el estado del usuario:", response.status);

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error("Error al cambiar el estado del usuario:", errorResponse);
                    showAlert('error', 'Error', 'No se pudo cambiar el estado del usuario, intenta nuevamente.', '');
                    return;
                }

                // Si la respuesta es exitosa, realizar acciones
                const data = await response.json();
                console.log('Estado del usuario cambiado con éxito:', data);

                // Opcional: actualizar la tarjeta o mostrar algún mensaje de éxito
                showAlert('success', 'Estado cambiado', 'El estado del usuario se ha cambiado correctamente.', '');

                // Aquí puedes agregar lógica adicional si necesitas actualizar la vista, 
                // como cambiar el color de la tarjeta o el texto del estado.
                const statusIndicator = card.querySelector('.status-indicator');
                if (statusIndicator) {
                    statusIndicator.style.backgroundColor = statusIndicator.style.backgroundColor === 'green' ? 'red' : 'green';
                }

            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
                showAlert('error', 'Error', 'Hubo un error en la solicitud, intenta nuevamente.', '');
            }
        }
    });
});
