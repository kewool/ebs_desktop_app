let button = document.querySelector("#menu_button");
let sidebar = document.querySelector("#sidebar");

button.onclick = function() {
    sidebar.classList.toggle("open");
}