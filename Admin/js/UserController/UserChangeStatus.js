// UserChangeStatus.js
import { BASE_API_URL, HEADERS } from '../Config/config.js';
import { addCards } from './UserFind.js';

export async function changeUserStatus(userId) {
    try {
        const response = await fetch(`${BASE_API_URL}/admin/user/change-status`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify({ usuarioId: userId }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error:", errorResponse);
            return;
        }

        const successResponse = await response.json();
        console.log("Éxito:", successResponse);
        await addCards(); // Actualizar la lista
    } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
    }
}
