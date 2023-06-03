const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("change", () => {
  menu.classList.toggle("open");
});
