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
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
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
  
        // Ocultar el formulario
        formularioCategoria.classList.add('hidden');
      } catch (error) {
        console.error('Error:', error.message);
        alert('Hubo un error al registrar la categoría.');
      }
    });
  
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
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
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
  