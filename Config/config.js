// config.js
export const BASE_API_URL = "http://localhost:8080/sibi/";

// Rutas para vistas HTML
export const ADMIN_HTML_PATH = "/Admin/vistas/";
export const USER_HTML_PATH = "/Usuario/vistas/";
export const GLOBAL_HTML_PATH = "/Global/vistas/";

// Encabezados comunes para todas las peticiones con autenticación
export const HEADERS = {
    "Authorization": "Bearer " + localStorage.getItem('jwt'),
    "Content-Type": "application/json",
    "Accept": "*/*"
};

// Encabezados comunes para todas las peticiones sin autenticación
export const UNLOGIN = {
    "Content-Type": "application/json",
    "Accept": "*/*"
};

// Verificación de la sesión
export async function jwtVerify() {
    const jwt  = localStorage.getItem('jwt');
    if (!jwt || jwt === null || jwt === '' || jwt.split('.').length !== 3) {
        showAlert('error', 'Error', 'No puedes estar aquí', GLOBAL_HTML_PATH + 'login.html');
    }
}
// Verificación en la petición de solicitud de contraseña
export async function emailVerify() {
    const email = localStorage.getItem('email');
    if (email === null || !email.includes('@')) {
        showAlert('error', 'Érror', 'No puedes estar aquí', GLOBAL_HTML_PATH + 'login.html');
    }
}

// Alertas
export function showAlert(icon, title, text, redirectUrl) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        stopKeydownPropagation: true,
        focusConfirm: false,
        scrollbarPadding: false,
        timer: 4500,
        customClass: {
            popup: 'my-alert-popup',
        }
    }).then(() => {
        if (redirectUrl !== "") {
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 4500);
        }
    });
}