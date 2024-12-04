import { showAlert } from '../../../Config/config.js';

document.addEventListener('DOMContentLoaded', () => {
    async function loadUser() {
        const userId = parseInt(localStorage.getItem('userId'));
        const jwt = localStorage.getItem('jwt');

        if (!userId || !jwt) {
            console.error('No se encontraron credenciales válidas en el almacenamiento local.');
            alert('Inicia sesión nuevamente para acceder a esta función.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/sibi/customer/user/find/for-customer/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error al cargar los datos del usuario: ${response.status}`);
            }

            const { result, type } = await response.json();

            if (type !== 'SUCCESS') {
                throw new Error('La respuesta del servidor indica un error.');
            }
            console.log(result);
            // Asignar los valores al formulario
            populateForm(result);

        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al cargar los datos del usuario.');
        }
    }

    function populateForm(user) {
        // Obtener los campos del formulario
        const nombreInput = document.getElementById('nombre');
        const apellidosInput = document.getElementById('apellidos');
        const correoInput = document.getElementById('correo');
        const numeroTelefonoInput = document.getElementById('numeroTelefono');

        // Asignar valores desde el objeto user
        if (user) {
            nombreInput.value = user.nombre || '';
            apellidosInput.value = user.apellidos || '';
            correoInput.value = user.correo || '';
            numeroTelefonoInput.value = user.numeroTelefono || '';
        } else {
            console.warn('El objeto de usuario está vacío.');
        }
    }

    // Agregar el event listener para el envío del formulario
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const userId = parseInt(localStorage.getItem('userId'));
        const jwt = localStorage.getItem('jwt');

        if (!userId || !jwt) {
            console.error('No se encontraron credenciales válidas en el almacenamiento local.');
            alert('Inicia sesión nuevamente para acceder a esta función.');
            return;
        }

        // Obtener los valores de los campos
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const numeroTelefono = document.getElementById('numeroTelefono').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validar que las contraseñas coincidan si se proporcionan
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }
        }

        // Construir el objeto de datos para enviar
        const data = {
            usuarioId: userId,
            nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            numeroTelefono: numeroTelefono
            // No incluimos 'contrasena' aún
        };

        // Si se proporcionó una nueva contraseña, agregarla al objeto de datos
        if (newPassword) {
            data.contrasena = newPassword;
        }

        try {
            const response = await fetch(`http://localhost:8080/sibi/customer/user/update/for-customer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error del servidor:', errorData);
                alert(`Error al actualizar los datos: ${errorData.message || response.status}`);
                return;
            }

            const responseData = await response.json();

            if (responseData.type !== 'SUCCESS') {
                console.error('Error al actualizar los datos:', responseData);
                alert(`Error al actualizar los datos: ${responseData.message || 'Error desconocido'}`);
                return;
            }

            // Mostrar mensaje de éxito
            showAlert('success', 'Éxito', 'Datos actualizados exitosamente.', '');

            // Opcional: Limpiar los campos de contraseña
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';

        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un error al actualizar los datos del usuario.');
        }
    });

    // Cargar los datos del usuario al cargar la página
    loadUser();
});
