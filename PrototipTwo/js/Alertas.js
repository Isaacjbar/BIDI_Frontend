document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener los valores de los campos
    const nombres = document.getElementById('Nombres').value.trim();
    const apellidos = document.getElementById('Apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Validar campos vacíos
    if (!nombres || !apellidos || !email || !telefono || !password || !confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }

    // Validar email
    if (!email.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Correo electrónico inválido',
            text: 'Por favor, ingresa un correo electrónico válido.',
        });
        return;
    }

    // Validar teléfono
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        Swal.fire({
            icon: 'error',
            title: 'Teléfono inválido',
            text: 'El número de teléfono debe contener exactamente 10 dígitos numéricos.',
        });
        return;
    }

    // Validar contraseñas coincidan
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas no coinciden',
            text: 'Asegúrate de que las contraseñas coincidan.',
        });
        return;
    }

    // Mostrar alerta de éxito si todo está correcto
    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tus datos han sido registrados exitosamente.',
    }).then(() => {
        e.target.reset();
        closeModal('registerModal'); // Cierra el modal si deseas
    });
});

document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener los valores de los campos
    const nombres = document.getElementById('editNombres').value.trim();
    const apellidos = document.getElementById('editApellidos').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const telefono = document.getElementById('editTelefono').value.trim();
    const password = document.getElementById('editPassword').value.trim();
    const confirmPassword = document.getElementById('editConfirmPassword').value.trim();

    // Validar campos vacíos
    if (!nombres || !apellidos || !email || !telefono || !password || !confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
        });
        return;
    }

    // Validar email
    if (!email.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Correo electrónico inválido',
            text: 'Por favor, ingresa un correo electrónico válido.',
        });
        return;
    }

    // Validar teléfono
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        Swal.fire({
            icon: 'error',
            title: 'Teléfono inválido',
            text: 'El número de teléfono debe contener exactamente 10 dígitos numéricos.',
        });
        return;
    }

    // Validar contraseñas coincidan
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas no coinciden',
            text: 'Asegúrate de que las contraseñas coincidan.',
        });
        return;
    }

    // Mostrar alerta de éxito si todo está correcto
    Swal.fire({
        icon: 'success',
        title: 'Edición exitosa',
        text: 'Los datos han sido actualizados exitosamente.',
    }).then(() => {
        // e.target.submit(); // Esto envía el formulario
        e.target.reset();
        closeModal('editModal'); 
    });
});
