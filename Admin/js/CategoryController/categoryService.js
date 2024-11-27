document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const formularioCategoria = document.getElementById('registerForm');
    const crearCategoriaBtn = document.getElementById('crear-categoria-btn'); // Botón que abre el formulario
    const cancelarBtn = document.getElementById('cancelar-btn'); // Botón para cancelar
    const categoriasList = document.getElementById('categorias-list'); // Donde se mostrarán las categorías
    const statusSwitch = document.getElementById('statusSwitch'); // Control de estado (activo/inactivo)
    const statusText = document.getElementById('statusText'); // Mostrar el texto del estado actual (Activo/Inactivo)
  
    // Mostrar formulario al hacer clic en "Crear categoría"
    crearCategoriaBtn.addEventListener('click', () => {
      formularioCategoria.classList.remove('hidden');
    });
  
    // Ocultar formulario al hacer clic en "Cancelar"
    cancelarBtn.addEventListener('click', () => {
      formularioCategoria.classList.add('hidden');
    });
  
    // Función para manejar el estado del switch
    statusSwitch.addEventListener('change', () => {
      if (statusSwitch.checked) {
        statusText.textContent = "Activo";
      } else {
        statusText.textContent = "Inactivo";
      }
    });
  
    // Enviar datos al endpoint "category/save" (crear categoría)
    formularioCategoria.querySelector('.btn-submit').addEventListener('click', async (event) => {
      event.preventDefault(); // Prevenir recarga de la página
  
      const categoryName = document.getElementById('categoryName').value.trim();
      const description = document.getElementById('description').value.trim();
  
      // Validación básica
      if (!categoryName || categoryName.length < 3) {
        alert('El nombre debe tener al menos 3 caracteres.');
        return;
      }
  
      if (!description || description.length < 10) {
        alert('La descripción debe tener al menos 10 caracteres.');
        return;
      }
  
      // Crear el objeto JSON para enviar
      const categoryData = {
        categoryName,
        description,
        status: statusSwitch.checked ? 'activo' : 'inactivo'
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
  
        // Crear la tarjeta de la categoría con la información
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
          <h3>Categoría: ${result.categoryName}</h3>
          <p><strong>Descripción:</strong> ${result.description}</p>
          <p><strong>Estado:</strong> ${result.status === 'activo' ? 'Activo' : 'Inactivo'}</p>
        `;
  
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
    
        // Agregar contenido a la card
        card.innerHTML = `
            <div class="card-header">
            <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#c2bfbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16v16H4z"></path>
                <path d="M8 8h8"></path>
                <path d="M8 12h6"></path>
                <path d="M8 16h4"></path>
                </svg>
            </div>
            <div class="card-title">${category.categoryName}</div>
            <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z"/>
            </svg>
        `;

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
  