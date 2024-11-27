// index.js o login.js

import { userFind } from './UserFind.js';
import { changeUserStatus } from './UserChangeStatus.js';
import { updateUserData } from './UserUpdate.js';
import { jwtVerify } from '../../../config/config.js';  // Importamos la función de verificación de JWT

document.addEventListener("DOMContentLoaded", async function () {
    jwtVerify();  // Verificar JWT antes de cualquier otra cosa

    // Cargar la lista de usuarios
    await userFind();  

    const cardContainer = document.querySelector('.card-container');
    cardContainer.addEventListener('click', changeUserStatus);  // Cambiar el estado de usuario
    const buttonUserDataEdit = document.getElementById("buttonUserDataEdit");
    buttonUserDataEdit.addEventListener("click", updateUserData);  // Editar datos de usuario
});
