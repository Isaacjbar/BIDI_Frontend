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

    const url = "http://localhost:8080/sibi/";

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const email = emailLogin.value;
        const password = passwordLogin.value;

        try {
            const response = await fetch(url + "auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'
            });

            const authResponse = await response.json();
            console.log(authResponse);

            if (!authResponse.jwt) {
                showAlert('error', 'Error', authResponse.email, '');
            } else {
                localStorage.setItem('jwt', authResponse.jwt);
                if (authResponse.role.includes("ADMINISTRADOR")) {
                    showAlert('success', 'Éxito', 'Inicio de sesión exitoso', 'dashboard.html');
                } else if (authResponse.role.includes("CLIENTE")) {
                    showAlert('success', 'Éxito', 'Inicio de sesión exitoso', 'menu.html');
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
            const response = await fetch(url + "global/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
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
            showAlert('success', 'Éxito', successResponse.text + '. Por favor, inicia sesión', 'login.html');
        } catch (error) {
            showAlert('error', 'Error', 'Hubo un error, vuelve a intentarlo', '');
        }
    });
});