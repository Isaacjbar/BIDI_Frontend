// menuFunctions.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');

    console.log("Menu toggle element:", menuToggle);
    console.log("Side menu element:", sideMenu);

    window.toggleMenu = function () {
        console.log("toggleMenu called");
        if (sideMenu) {
            sideMenu.classList.toggle('active');
            console.log("Side menu class list:", sideMenu.classList);
        } else {
            console.error("Side menu element not found!");
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    } else {
        console.error("Menu toggle element not found!");
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    } else {
        console.log("Close button not found");
    }
});

