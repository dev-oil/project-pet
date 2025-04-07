document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("is_show");
    nav.classList.toggle("is_show");
  });
});
