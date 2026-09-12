const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

// Close the mobile menu when a link is tapped.
links.addEventListener("click", (event) => {
  if (event.target.closest("a") && links.classList.contains("is-open")) {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});
