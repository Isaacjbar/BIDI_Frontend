// Datos de ejemplo en formato JSON
const categoryData = {
    "categories": [
      {
        "categoryName": "Ficción",
        "description": "Libros que narran historias imaginarias o inventadas.",
        "status": "activo"
      },
      {
        "categoryName": "Ciencia",
        "description": "Libros sobre temas científicos y educativos.",
        "status": "activo"
      },
      {
        "categoryName": "Clásico",
        "description": "Obras que han resistido la prueba del tiempo en la literatura.",
        "status": "activo"
      }
    ]
  };
  
  // Función para agregar tarjetas desde los datos JSON de categorías
  function addCategoryCardsFromData(data) {
    const cardContainer = document.querySelector('.card-container');
    data.categories.forEach(categoryData => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-status', categoryData.status);
  
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
          <div class="card-title">${categoryData.categoryName}</div>
          <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z"/>
          </svg>
        </div>
        <div class="card-description">
          <span class="card-data"><strong>Descripción:</strong></span><br>
          <span>${categoryData.description}</span>
        </div>
      `;
  
    // Agregar el botón de activación/desactivación a la tarjeta
    addToggleButton(card);
    setupCardListeners(card);
    // Agregar evento al ícono de edición
    addEditIconHandler(card);
    
    // Agregar la tarjeta al contenedor
    cardContainer.appendChild(card);
  });

}
  // Función para abrir el modal de edición
  function openEditModal(card) {
    selectedCard = card;
  
    const categoryName = card.querySelector('.card-title').textContent;
    const description = card.querySelector('.card-description span:last-child').textContent;
  
    document.getElementById('editCategoryName').value = categoryName;
    document.getElementById('editDescription').value = description;
  
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
  }
  
  // Asignar eventos al cargar las tarjetas al inicio
  document.addEventListener("DOMContentLoaded", () => {
    addCategoryCardsFromData(categoryData);
  });
  