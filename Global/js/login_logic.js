import { showAlert, BASE_API_URL, USER_HTML_PATH, ADMIN_HTML_PATH, GLOBAL_HTML_PATH, UNLOGIN } from '../../Config/config.js';

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    const emailLogin = document.getElementById("email");
    const passwordLogin = document.getElementById("password");

    const nameRegister = document.getElementById("nameRegister");
    const surnameRegister = document.getElementById("surnameRegister");
    const emailRegister = document.getElementById("emailRegister");
    const passwordRegister = document.getElementById("passwordRegister");
    const passwordRegisterConfirmed = document.getElementById("passwordRegisterConfirmed");

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const email = emailLogin.value;
        const password = passwordLogin.value;

        try {
            const response = await fetch(BASE_API_URL + "auth/login", {
                method: "POST",
                headers: UNLOGIN,
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'
            });

            const authResponse = await response.json();

            if (!authResponse.jwt) {
                showAlert('error', 'Error', authResponse.email, '');
            } else {
                localStorage.setItem('jwt', authResponse.jwt);
                if (authResponse.role.includes("ADMINISTRADOR")) {
                    showAlert('success', 'Éxito', 'Inicio de sesión exitoso', ADMIN_HTML_PATH + 'dashboard.html');
                } else if (authResponse.role.includes("CLIENTE")) {
                    showAlert('success', 'Éxito', 'Inicio de sesión exitoso', USER_HTML_PATH + 'menu.html');
                }
            }
        } catch (error) {
            showAlert('error', 'Error', 'Hubo un error, vuelve a intentarlo', '');
        }
    });

    registerButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const name = nameRegister.value;
        const surname = surnameRegister.value;
        const email = emailRegister.value;
        const password = passwordRegister.value;
        const passwordConfirmed = passwordRegisterConfirmed.value;

        if (password !== passwordConfirmed) {
            showAlert('error', 'Error', 'Las contraseñas no coinciden.', '');
            return;
        }

        try {
            const response = await fetch(BASE_API_URL + "global/register", {
                method: "POST",
                headers: UNLOGIN,
                body: JSON.stringify(
                    {
                        nombre: name,
                        apellidos: surname,
                        correo: email,
                        contrasena: password
                    }
                )
            });

            if (!response.ok) {
                const errorResponse = await response.json();

                if (typeof errorResponse === 'object' && !errorResponse.text) {
                    const errorMessages = Object.values(errorResponse).join(". ");
                    showAlert('error', 'Error', errorMessages, '');
                } else if (errorResponse.text) {
                    showAlert('error', 'Error', errorResponse.text, '');
                }
                return;
            }

            const successResponse = await response.json();
            showAlert('success', 'Éxito', successResponse.text + '. Por favor, inicia sesión', GLOBAL_HTML_PATH + 'login.html');
        } catch (error) {
            showAlert('error', 'Error', 'Hubo un error, vuelve a intentarlo', '');
        }
    });
});