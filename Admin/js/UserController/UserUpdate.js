// user/userUpdate.js
import { showAlert, BASE_API_URL, HEADERS } from '../../../config/config.js';

export async function updateUserData() {
    const editName = document.getElementById("editNombres").value;
    const userId = document.getElementById("userId").value;
    const editSurname = document.getElementById("editApellidos").value;
    const editEmail = document.getElementById("editEmail").value;
    const editPhoneNumber = document.getElementById("editTelefono").value;
    const editPassword = document.getElementById("editPassword").value;
    const editConfirmPassword = document.getElementById("editConfirmPassword").value;

    if (editPassword !== editConfirmPassword) {
        showAlert('error', 'Error', 'Las contraseñas no coinciden.', '');
        return;
    }

    try {
        const response = await fetch(BASE_API_URL + "admin/user/modify", {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify({
                usuarioId: userId,
                nombre: editName,
                apellidos: editSurname,
                correo: editEmail,
                numeroTelefono: editPhoneNumber,
                contrasena: editPassword
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            showAlert('error', 'Error', errorResponse.text || 'Error desconocido', '');
            return;
        }

        const successResponse = await response.json();
        showAlert('success', 'Éxito', successResponse.text, '');
    } catch (error) {
        showAlert('error', 'Error', 'Hubo un error, vuelve a intentarlo', '');
    }
}
