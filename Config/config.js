// config.js
export const BASE_API_URL = "http://localhost:8080/sibi";

// Rutas para vistas HTML
export const ADMIN_HTML_PATH = "/Admin/vistas/";
export const USER_HTML_PATH = "/Usuario/vistas/";
export const GLOBAL_HTML_PATH = "/Global/vistas/";

// Encabezados comunes para todas las peticiones
export const HEADERS = {
    "Authorization": "Bearer " + localStorage.getItem('jwt'),
    "Content-Type": "application/json",
    "Accept": "*/*"
};

export const UNLOGIN = {
    "Content-Type": "application/json",
    "Accept": "*/*" 
};