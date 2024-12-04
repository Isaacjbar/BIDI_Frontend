window.onload = function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');

    if (menuToggle && sideMenu) {
        function toggleMenu() {
            sideMenu.classList.toggle('active');
        }

        menuToggle.addEventListener('click', toggleMenu);

        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', toggleMenu);
        }
    } else {
        console.error("Menú o elementos no encontrados");
    }
};
