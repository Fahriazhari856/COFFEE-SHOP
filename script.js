const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");

mobileToggle.addEventListener("click", () => {
  if (navMenu.classList.contains("show")) {
    navMenu.classList.remove("show");
    navMenu.classList.add("hide");
    setTimeout(() => {
      navMenu.style.display = "none"; // sembunyikan setelah animasi selesai
    }, 300); // 300ms sama dengan durasi transition
  } else {
    navMenu.style.display = "block";
    setTimeout(() => {
      navMenu.classList.remove("hide");
      navMenu.classList.add("show");
    }, 10);
  }

  // Ganti icon toggle
  const icon = mobileToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});
