const data = {
  "cards": [
      {
          "bookName": "Cien Años de Soledad",
          "author": "Gabriel García Márquez",
          "description": "Una obra maestra de la literatura latinoamericana que narra la historia de la familia Buendía.",
          "category": "Ficción",
          "status": "activo"
      },
      {
          "bookName": "Breve Historia del Tiempo",
          "author": "Stephen Hawking",
          "description": "Una introducción al universo, explicando el tiempo, los agujeros negros y la teoría del Big Bang.",
          "category": "Ciencia",
          "status": "activo"
      },
      {
          "bookName": "El Quijote de la Mancha",
          "author": "Miguel de Cervantes",
          "description": "Una de las novelas más importantes de la literatura mundial que narra las aventuras de un caballero andante.",
          "category": "Clásico",
          "status": "activo"
      },
      {
          "bookName": "Sapiens: De Animales a Dioses",
          "author": "Yuval Noah Harari",
          "description": "Un recorrido por la historia de la humanidad, explorando cómo hemos evolucionado a lo largo de los siglos.",
          "category": "Historia",
          "status": "activo"
      },
      {
          "bookName": "La Sombra del Viento",
          "author": "Carlos Ruiz Zafón",
          "description": "Un misterio literario ambientado en la Barcelona de la posguerra.",
          "category": "Ficción",
          "status": "inactivo"
      },
      {
        "bookName": "1984",
        "author": "George Orwell",
        "description": "Una distopía que explora los peligros del totalitarismo y el control absoluto del estado.",
        "category": "Ficción",
        "status": "activo"
    },
    {
        "bookName": "Orgullo y Prejuicio",
        "author": "Jane Austen",
        "description": "Una de las novelas románticas más queridas, que sigue a Elizabeth Bennet mientras navega las normas sociales.",
        "category": "Clásico",
        "status": "activo"
    },
    {
        "bookName": "El Hobbit",
        "author": "J.R.R. Tolkien",
        "description": "Una aventura épica en la Tierra Media, donde Bilbo Bolsón busca un tesoro protegido por un dragón.",
        "category": "Fantasía",
        "status": "activo"
    },
    {
        "bookName": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "description": "Una exploración de la justicia y la moralidad en el sur de Estados Unidos, narrada desde los ojos de una niña.",
        "category": "Clásico",
        "status": "activo"
    },
    {
        "bookName": "El Principito",
        "author": "Antoine de Saint-Exupéry",
        "description": "Un relato filosófico disfrazado de cuento infantil, que explora el significado de la vida, el amor y la amistad.",
        "category": "Infantil",
        "status": "activo"
    },
    {
        "bookName": "Crónica de una Muerte Anunciada",
        "author": "Gabriel García Márquez",
        "description": "Una historia que entrelaza el destino y el honor en una pequeña comunidad.",
        "category": "Ficción",
        "status": "activo"
    },
    {
        "bookName": "Los Juegos del Hambre",
        "author": "Suzanne Collins",
        "description": "Una emocionante historia distópica de supervivencia en un mundo dividido por el poder.",
        "category": "Ciencia Ficción",
        "status": "activo"
    },
    {
        "bookName": "La Divina Comedia",
        "author": "Dante Alighieri",
        "description": "Un poema épico que describe el viaje de Dante a través del Infierno, el Purgatorio y el Paraíso.",
        "category": "Clásico",
        "status": "inactivo"
    },
    {
        "bookName": "Harry Potter y la Piedra Filosofal",
        "author": "J.K. Rowling",
        "description": "El inicio de la mágica aventura de Harry Potter y sus amigos en Hogwarts.",
        "category": "Fantasía",
        "status": "activo"
    },
    {
        "bookName": "Matar a un Ruiseñor",
        "author": "Harper Lee",
        "description": "Un relato sobre la injusticia racial y los valores familiares en el sur de los Estados Unidos.",
        "category": "Clásico",
        "status": "activo"
    }
  ]
};
  
  // Función para agregar tarjetas desde los datos JSON
  function addCardsFromData(data) {
    const cardContainer = document.querySelector('.card-container');
    data.cards.forEach(cardData => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-status', cardData.status);
      card.setAttribute('data-password', cardData.password);
      card.innerHTML = `
        <div class="card-header">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#c2bfbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
            <span class="status-indicator"></span>
          </div>
          <div class="card-title">${cardData.bookName}</div>
          <svg class="card-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-2.92L5 17.34V19h1.66l.92-.92-1.66-1.67zm2.83-2.83l1.66 1.66 7.5-7.5-1.66-1.66-7.5 7.5zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.16 1.16 3.75 3.75 1.16-1.16c-.39-.39-.39-1.02 0-1.41z"/>
          </svg>
        </div>
        <div class="card-description">
          <span class="card-data"><strong>Autor:</strong></span><br>
          <span>${cardData.author}</span>
        </div>
        <div class="card-description">
          <span class="card-data"><strong>Descripción:</strong></span><br>
          <span>${cardData.description}</span>
        </div>
        <div class="card-description">
          <span class="card-data"><strong>Categoría:</strong></span><br>
          <span>${cardData.category}</span>
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
// Inicializar ScrollReveal al cargar la página
document.addEventListener("DOMContentLoaded", () => {

  // Configurar eventos para las tarjetas existentes
  document.querySelectorAll('.card').forEach(card => {
      setupCardListeners(card);
  });
});
  
  // Llamar a la función para cargar las tarjetas al inicio
  document.addEventListener("DOMContentLoaded", () => {
    addCardsFromData(data);
  });
  