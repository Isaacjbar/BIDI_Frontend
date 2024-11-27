// user/userFind.js
import { showAlert, BASE_API_URL, HEADERS } from '../../../config/config.js';

export async function userFind() {
    try {
        const response = await fetch(BASE_API_URL + "admin/user/find-all", {
            method: "GET",
            headers: HEADERS,  // Usar encabezados con autenticación
            credentials: 'include'
        });

        const data = await response.json();
        if (data.result && Array.isArray(data.result)) {
            const cardContainer = document.querySelector('.card-container');

            data.result.forEach(user => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('data-status', user.estado.trim());
                card.setAttribute('data-rol', user.rol);

                card.innerHTML = `
                    <div class="card-header">
                        <div class="card-icon">
                            <!-- Icono del estado -->
                        </div>
                        <div class="card-title">${user.nombre}</div>
                    </div>
                    <div class="card-description">
                        <span class="card-data"><strong>Apellidos:</strong></span><br>
                        <span>${user.apellidos || "No disponible"}</span>
                    </div>
                    <div class="card-description">
                        <span class="card-data"><strong>Teléfono:</strong></span><br>
                        <span>${user.numeroTelefono || "No disponible"}</span>
                    </div>
                    <div class="card-description">
                        <span class="card-data"><strong>Correo:</strong></span><br>
                        <span>${user.correo}</span>
                    </div>
                `;

                cardContainer.appendChild(card);
            });
        }
    } catch (error) {
        showAlert('error', 'Error', 'Hubo un error al mostrar los datos, vuelve a intentarlo', '');
    }
}
