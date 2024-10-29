document.getElementById("statusSwitch").addEventListener("change", function () {
    const statusText = document.getElementById("statusText");
    statusText.textContent = this.checked ? "Estado activo" : "Estado inactivo";
});
