// components.js
async function loadComponents(components) {
    for (const { url, target } of components) {
        try {
            const response = await fetch(url);
            const content = await response.text();
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.innerHTML = content;
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
