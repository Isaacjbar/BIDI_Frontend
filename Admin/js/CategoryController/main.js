// main.js (o el archivo donde manejas los eventos)

import { fetchAllCategories, saveCategory, updateCategory } from './categoryService.js';

// Obtener todas las categorías
async function loadCategories() {
    try {
        const categories = await fetchAllCategories();
        addCategoryCardsFromData(categories);
    } catch (error) {
        console.error('No se pudieron cargar las categorías');
    }
}

// Evento para agregar una nueva categoría
document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const categoryName = document.getElementById('categoryName').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!categoryName || categoryName.length < 3) {
        showAlert('error', 'Error', 'El nombre debe tener al menos 3 caracteres', '');
        return;
    }

    if (!description || description.length < 10) {
        showAlert('error', 'Error', 'La descripción debe tener al menos 10 caracteres', '');
        return;
    }

    const categoryData = { categoryName, description, status: 'activo' };
    await saveCategory(categoryData);
    document.getElementById('registerForm').reset();
});

// Evento para actualizar una categoría
document.getElementById("editForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const categoryName = document.getElementById('editCategoryName').value.trim();
    const description = document.getElementById('editDescription').value.trim();

    if (!categoryName || categoryName.length < 3) {
        showAlert('error', 'Error', 'El nombre debe tener al menos 3 caracteres', '');
        return;
    }

    if (!description || description.length < 10) {
        showAlert('error', 'Error', 'La descripción debe tener al menos 10 caracteres', '');
        return;
    }

    const categoryData = { categoryName, description, status: 'activo' };
    await updateCategory(categoryData);
});

// Obtener las categorías al cargar la página
document.addEventListener("DOMContentLoaded", loadCategories);
