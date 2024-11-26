// components.js
async function loadComponents(components) {
    for (const { url, target } of components) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error al cargar ${url}: ${response.status}`);
            const content = await response.text();
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.innerHTML = content;
            } else {
                console.error(`El elemento con el ID '${target}' no existe en el DOM.`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// Esperar a que el DOM esté listo antes de llamar a la función
document.addEventListener("DOMContentLoaded", () => {
    loadComponents([
        { url: '../components/html/header.html', target: 'header' },
        { url: '../components/html/footer.html', target: 'footer' }
    ]);
});
