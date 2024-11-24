const data = {
    "loans": [
      {
        "bookName": "Cien Años de Soledad",
        "userName": "Juan Pérez",
        "currentDate": "2024-11-21",
        "expirationDate": "2024-12-05",
        "status": "activo"
      },
      {
        "bookName": "Breve Historia del Tiempo",
        "userName": "María López",
        "currentDate": "2024-11-18",
        "expirationDate": "2024-12-02",
        "status": "activo"
      },
      {
        "bookName": "El Quijote de la Mancha",
        "userName": "Carlos Sánchez",
        "currentDate": "2024-11-15",
        "expirationDate": "2024-11-29",
        "status": "inactivo"
      },
      {
        "bookName": "Sapiens: De Animales a Dioses",
        "userName": "Laura González",
        "currentDate": "2024-11-10",
        "expirationDate": "2024-11-24",
        "status": "activo"
      },
      {
        "bookName": "El Principito",
        "userName": "Ana Fernández",
        "currentDate": "2024-11-20",
        "expirationDate": "2024-12-04",
        "status": "activo"
      },
      {
        "bookName": "Los Juegos del Hambre",
        "userName": "Luis Martínez",
        "currentDate": "2024-11-22",
        "expirationDate": "2024-12-06",
        "status": "activo"
      }
    ]
  };

  function addCardsFromData(data) {
    const cardContainer = document.querySelector('.card-container');
    data.loans.forEach(loanData => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-status', loanData.status);
  
      card.innerHTML = `
        <div class="card-header">
          <div class="card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#c2bfbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 3h16v18H3z"></path>
        <path d="M9 6h6"></path>
        <path d="M12 10a4 4 0 1 1-4 4"></path>
        <path d="M20 20l-4-4"></path>
    </svg>
          </div>
          <div class="card-title">${loanData.bookName}</div>
          <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z"/>
          </svg>
        </div>
        <div class="card-description">
          <span class="card-data"><strong>Usuario:</strong></span><br>
          <span>${loanData.userName}</span>
        </div>
        <div class="card-description">
          <span class="card-data"><strong>Fecha de solicitud:</strong></span><br>
          <span>${loanData.currentDate}</span>
        </div>
        <div class="card-description">
          <span class="card-data"><strong>Fecha de entrega:</strong></span><br>
          <span>${loanData.expirationDate}</span>
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
  
  // Asignar eventos a las tarjetas existentes en la página
document.addEventListener("DOMContentLoaded", () => {
    // Cargar las tarjetas de préstamos al iniciar la página
    addCardsFromData(data);
  
    // Configurar eventos para las tarjetas existentes
    document.querySelectorAll('.card').forEach(card => {
      setupCardListeners(card);
    });
  });
  