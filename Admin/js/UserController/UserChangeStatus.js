// user/userChangeStatus.js
import { showAlert, BASE_API_URL, HEADERS } from '../../../config/config.js';

export async function changeUserStatus(event) {
    if (event.target && event.target.classList.contains('toggle-button')) {
        const card = event.target.closest('.card');
        const userId = card.getAttribute('data-user-id');
        
        try {
            const response = await fetch(BASE_API_URL + "admin/user/change-status", {
                method: "PUT",
                headers: HEADERS,
                body: JSON.stringify({ usuarioId: userId }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                showAlert('error', 'Error', errorResponse.text || 'Error desconocido', '');
                return;
            }

            const successResponse = await response.json();
            showAlert('success', 'Éxito', successResponse.text, '');
            // Recargar la lista de usuarios o actualizar el estado
        } catch (error) {
            showAlert('error', 'Error', 'Hubo un error, vuelve a intentarlo', '');
        }
    }
}
