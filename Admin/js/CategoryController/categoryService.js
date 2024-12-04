import { showAlert } from '../../../Config/config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Selección de elementos
  const formularioCategoria = document.getElementById('registerForm');
  const categoriasList = document.getElementById('categorias-list'); // Donde se mostrarán las categorías
  const statusSwitch = document.getElementById('statusSwitch'); // Control de estado (activo/inactivo)  

  // // Función para manejar el estado del switch
  // statusSwitch.addEventListener('change', () => {
  //   if (statusSwitch.checked) {
  //     statusText.textContent = "ACTIVE";
  //   } else {
  //     statusText.textContent = "INACTIVE";
  //   }
  // });

  // Enviar datos al endpoint "category/save" (crear categoría)
  formularioCategoria.querySelector('.btn-submit').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevenir recarga de la página

    const categoryName = document.getElementById('categoryName').value.trim();

    // Validación básica
    if (!categoryName || categoryName.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    // Crear el objeto JSON para enviar
    const categoryData = {
      categoryName,
      status: statusSwitch.checked ? 'ACTIVE' : 'INACTIVE'
    };

    try {
      // Realizar la petición al endpoint /category/save
      const response = await fetch('http://localhost:8080/sibi/admin/category/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Asegúrate de enviar el JWT si es necesario
        },
        body: JSON.stringify(categoryData)
      });

      if (!response.ok) {
        throw new Error('Error al registrar la categoría');
      }

      const result = await response.json();
      const cat = result.result;
      // Crear la tarjeta de la categoría con la información
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-status', cat.status);
      card.setAttribute('data-id', cat.categoryId);
      // Agregar contenido a la card
      card.innerHTML = `
            <div class="card-header">
            <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <!-- Primer libro -->
                  <rect x="3" y="4" width="18" height="4" fill="#4caf50"/>
                  <rect x="3" y="5" width="18" height="1" fill="#fff"/>
                  
                  <!-- Segundo libro -->
                  <rect x="3" y="9" width="18" height="4" fill="#2196f3"/>
                  <rect x="3" y="10" width="18" height="1" fill="#fff"/>
                  
                  <!-- Tercer libro -->
                  <rect x="3" y="14" width="18" height="4" fill="#f44336"/>
                  <rect x="3" y="15" width="18" height="1" fill="#fff"/>
                </svg>

                <span class="status-indicator"></span>
            </div>
            <div class="card-title">${cat.categoryName}</div>
             <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z" />
                            </svg>
        `;

      // Agregar el botón de activación/desactivación a la tarjeta
      addToggleButton(card);
      // Agregar evento al ícono de edición
      card.querySelector(".card-edit-icon").addEventListener("click", (event) => {
        event.stopPropagation();
        openEditModal(card);
      });

      // Añadir la tarjeta a la lista
      categoriasList.appendChild(card);
      showAlert('success', 'Éxito', result.text, '');
      // Ocultar el formulario
      formularioCategoria.classList.add('hidden');
    } catch (error) {
      //console.error('Error:', error.message);
      showAlert('error', 'Error', 'Hubo un error al registrar la categoria', '');
    }
  });

  // Función para manejar el envío de los datos de edición
  document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const categoryName = document.getElementById('editCategoryName').value.trim();
    const categoryId = event.target.getAttribute('data-id'); // Obtener el ID de la categoría desde el formulario

    // Extraemos el status directamente desde la tarjeta
    const card = document.querySelector(`.card[data-id='${categoryId}']`);
    const categoryStatus = card.getAttribute('data-status'); // Leemos el 'data-status' de la card

    if (!categoryName || categoryName.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    const categoryData = {
      categoryId, // Enviar el ID en el cuerpo de la solicitud
      categoryName,
      status: categoryStatus // Usamos el 'status' de la card, no del switch
    };

    try {
      // Realizar la petición PUT para actualizar la categoría
      const response = await fetch('http://localhost:8080/sibi/admin/category/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Asegúrate de enviar el JWT si es necesario
        },
        body: JSON.stringify(categoryData) // Enviar el cuerpo con el ID y el nombre de la categoría
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      const result = await response.json();
      const updatedCategory = result.result;

      // Actualiza la tarjeta correspondiente con la nueva información
      const cardToUpdate = document.querySelector(`.card[data-id='${categoryId}']`);
      cardToUpdate.querySelector('.card-title').textContent = updatedCategory.categoryName;
      cardToUpdate.setAttribute('data-status', updatedCategory.status); // Actualiza el status si es necesario

      // Cierra el modal
      closeModal('editModal');
      showAlert('success', 'Éxito', result.text, '');
    } catch (error) {
      console.error('Error:', error.message);
      showAlert('error', 'Error', 'Hubo un error al editar la información de la categoría', '');
    }
  });

  // Función para manejar el cambio de estado de la categoría (activar/desactivar) y actualizar el backend
  function updateCategoryStatus(card, newStatus) {
    const categoryId = card.getAttribute('data-id'); // Obtener el ID de la categoría
    const categoryData = {
      categoryId,
      status: newStatus
    };

    // Realizar la solicitud PUT al backend para actualizar el estado
    fetch('http://localhost:8080/sibi/admin/category/change-status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Si es necesario enviar el JWT
      },
      body: JSON.stringify(categoryData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el estado de la categoría');
        }
        return response.json();
      })
      .then(result => {
        const updatedCategory = result.result;

        // Actualizar el estado en el frontend (en la tarjeta)
        card.setAttribute('data-status', updatedCategory.status);
        const statusIndicator = card.querySelector('.status-indicator');
        if (updatedCategory.status === 'ACTIVE') {
          statusIndicator.style.backgroundColor = '#4CAF50'; // Activado
        } else {
          statusIndicator.style.backgroundColor = '#F44336'; // Desactivado
        }

        // Actualizar el texto del botón de estado
        const button = card.querySelector('.toggle-button');
        button.textContent = updatedCategory.status === 'ACTIVE' ? 'Desactivar' : 'Activar';
        button.style.backgroundColor = updatedCategory.status === 'ACTIVE' ? 'red' : 'green';

        showAlert('success', 'Éxito', result.text, '');
      })
      .catch(error => {
        console.error('Error:', error.message);
        showAlert('error', 'Error', 'Hubo un error', '');
      });
  }

  // Modificación en la función 'addToggleButton' para integrar la actualización del estado en el backend
  function addToggleButton(card) {
    const button = document.createElement('button');
    button.className = 'toggle-button';
    button.textContent = card.dataset.status === 'ACTIVE' ? 'Desactivar' : 'Activar';
    button.style.backgroundColor = card.dataset.status === 'ACTIVE' ? 'red' : 'green';

    // Alterna el estado de activación de la tarjeta al hacer clic
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isActive = card.getAttribute('data-status') === 'ACTIVE';

      // Cambia el estado en el frontend
      const newStatus = isActive ? 'INACTIVE' : 'ACTIVE';
      card.setAttribute('data-status', newStatus);
      button.style.backgroundColor = isActive ? 'green' : 'red';
      button.textContent = isActive ? 'Activar' : 'Desactivar';

      const statusIndicator = card.querySelector('.status-indicator');
      if (newStatus === 'ACTIVE') {
        statusIndicator.style.backgroundColor = '#4CAF50';
      } else {
        statusIndicator.style.backgroundColor = '#F44336';
      }

      // Enviar la solicitud al backend para actualizar el estado
      updateCategoryStatus(card, newStatus);
    });

    card.appendChild(button);
  }

  // Cambia el texto y filtra las cards según el estado (activo o inactivo)
  document.getElementById("statusSwitch").addEventListener("change", function () {
    const statusText = document.getElementById("statusText");
    const showActive = this.checked;
    statusText.textContent = showActive ? "Activos" : "Inactivos";

    // Filtra las cards según el estado del switch
    fetchCategoriesByStatus(showActive ? 'ACTIVE' : 'INACTIVE');
  });

  // Función para hacer la solicitud al backend y obtener las categorías según el estado
  async function fetchCategoriesByStatus(status) {
    try {
      // Realizar la solicitud GET al backend para obtener las categorías filtradas por estado
      const response = await fetch(`http://localhost:8080/sibi/admin/category/status/${status}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Si es necesario enviar el JWT
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }

      const result = await response.json();

      // Limpiar las tarjetas actuales antes de agregar las nuevas
      const categoriasList = document.getElementById('categorias-list');
      categoriasList.innerHTML = '';

      // Crear y agregar las tarjetas obtenidas del backend
      result.result.forEach(category => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-status', category.status);
        card.setAttribute('data-id', category.categoryId);
        // Agregar contenido a la card
        card.innerHTML = `
                  <div class="card-header">
                      <div class="card-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                              <!-- Primer libro -->
                              <rect x="3" y="4" width="18" height="4" fill="#4caf50"/>
                              <rect x="3" y="5" width="18" height="1" fill="#fff"/>
                              
                              <!-- Segundo libro -->
                              <rect x="3" y="9" width="18" height="4" fill="#2196f3"/>
                              <rect x="3" y="10" width="18" height="1" fill="#fff"/>
                              
                              <!-- Tercer libro -->
                              <rect x="3" y="14" width="18" height="4" fill="#f44336"/>
                              <rect x="3" y="15" width="18" height="1" fill="#fff"/>
                          </svg>

                          <span class="status-indicator"></span>
                      </div>
                      <div class="card-title">${category.categoryName}</div>
                      <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z" />
                      </svg>
                  </div>
              `;

        // Agregar el botón de activación/desactivación a la tarjeta
        addToggleButton(card);
        // Agregar evento al ícono de edición
        card.querySelector(".card-edit-icon").addEventListener("click", (event) => {
          event.stopPropagation();
          openEditModal(card);
        });

        // Añadir la tarjeta al contenedor
        categoriasList.appendChild(card);
      });

    } catch (error) {
      console.error('Error:', error.message);
      alert('Hubo un error al cargar las categorías.');
    }
  }

  // Función para cargar categorías existentes desde el backend
  async function loadCategories() {
    try {
      const response = await fetch('http://localhost:8080/sibi/admin/category/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Asegúrate de enviar el JWT si es necesario
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar las categorías');
      }

      const result = await response.json();

      // Mostrar la respuesta en la consola para ver qué se recibe
      console.log('Respuesta del backend:', result);

      // Verifica si la respuesta es un arreglo
      //if (Array.isArray(result)) {
      console.log(categoriasList);  // Verifica que el contenedor se selecciona correctamente

      result.result.forEach(category => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-status', category.status);
        card.setAttribute('data-id', category.categoryId);
        // Agregar contenido a la card
        card.innerHTML = `
            <div class="card-header">
            <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <!-- Primer libro -->
                  <rect x="3" y="4" width="18" height="4" fill="#4caf50"/>
                  <rect x="3" y="5" width="18" height="1" fill="#fff"/>
                  
                  <!-- Segundo libro -->
                  <rect x="3" y="9" width="18" height="4" fill="#2196f3"/>
                  <rect x="3" y="10" width="18" height="1" fill="#fff"/>
                  
                  <!-- Tercer libro -->
                  <rect x="3" y="14" width="18" height="4" fill="#f44336"/>
                  <rect x="3" y="15" width="18" height="1" fill="#fff"/>
                </svg>

                <span class="status-indicator"></span>
            </div>
            <div class="card-title">${category.categoryName}</div>
          <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z" />
          </svg>
        `;

        // Agregar el botón de activación/desactivación a la tarjeta
        addToggleButton(card);
        // Agregar evento al ícono de edición
        card.querySelector(".card-edit-icon").addEventListener("click", (event) => {
          event.stopPropagation();
          openEditModal(card);
        });
        // Asegúrate de que el contenedor está visible antes de agregar las cards
        categoriasList.appendChild(card);
      });

      //} else {
      //     console.error('La respuesta no es un arreglo:', result);
      //     alert('Hubo un error al cargar las categorías.');
      //   }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Hubo un error al cargar las categorías.');
    }
  }
  // Cargar las categorías cuando se carga la página
  loadCategories();
});
