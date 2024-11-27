import { showAlert, emailVerify, BASE_API_URL, GLOBAL_HTML_PATH, UNLOGIN } from '../../Config/config.js';

document.addEventListener("DOMContentLoaded", function () {

    emailVerify();

    const email = localStorage.getItem("email");
    const resetButton = document.getElementById("resetButton");

    resetButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const code = document.getElementById("code").value.trim();
        const password = document.getElementById("password").value;
        const passwordConfirmed = document.getElementById("passwordConfirmed").value;

        if (password !== passwordConfirmed) {
            showAlert('error', 'Error', 'Las contraseñas no coinciden.', '');
            return;
        }

        try {
            const response = await fetch(BASE_API_URL + "global/reset-password", {
                method: "PUT",
                headers: UNLOGIN,
                body: JSON.stringify(
                    {
                        correo: email,
                        codigo: code,
                        contrasena: password
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

            const data = await response.json();

            if (data.type === 'SUCCESS') {
                showAlert('success', 'Éxito', data.text, GLOBAL_HTML_PATH + 'login.html');
            }
        } catch (error) {
            showAlert('error', 'Error', 'Hubo un error, vuelve a intentarlo', '');
        }
        localStorage.removeItem('email');
    });
});