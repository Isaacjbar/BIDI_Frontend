import { addCards } from './UserFind.js';
import { changeUserStatus } from './UserChangeStatus.js';
import { updateUser } from './UserUpdate.js';
import { ADMIN_HTML_PATH } from '../Config/config.js';

document.addEventListener("DOMContentLoaded", async function () {
    await addCards();

    document.querySelector('.card-container').addEventListener('click', function (event) {
        if (event.target.classList.contains('toggle-button')) {
            const userId = event.target.closest('.card').getAttribute('data-user-id');
            changeUserStatus(userId);
        }
    });

    document.getElementById("buttonUserDataEdit").addEventListener("click", function () {
        const userId = document.getElementById("userId").value;
        const editData = {
            nombre: document.getElementById("editNombres").value,
            apellidos: document.getElementById("editApellidos").value,
            correo: document.getElementById("editEmail").value,
            numeroTelefono: document.getElementById("editTelefono").value,
            contrasena: document.getElementById("editPassword").value
        };

        updateUser(userId, editData);
    });

    // Ejemplo de redirección a la vista de administración
    document.getElementById("redirectToAdmin").addEventListener("click", function () {
        window.location.href = `${ADMIN_HTML_PATH}dashboard.html`;
    });
});
