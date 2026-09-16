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

/* ---- Application Letter viewer (guarded: only on application-letter.html) ---- */
const viewer = document.getElementById("letter-viewer");

if (viewer) {
  const thumb = document.querySelector(".letter__thumb");
  const closeBtn = viewer.querySelector(".letter__viewer-close");
  const stage = viewer.querySelector(".letter__viewer-stage");
  const bigImg = viewer.querySelector(".letter__viewer-img");

  thumb.addEventListener("click", () => {
    viewer.showModal();
    document.body.classList.add("viewer-open");
  });

  // Fires for every close path (Esc, button, scrim) — the one place to clean up.
  viewer.addEventListener("close", () => {
    document.body.classList.remove("viewer-open");
    stage.classList.remove("is-zoomed"); // always reopen fitted
  });

  closeBtn.addEventListener("click", () => viewer.close());

  // Scrim clicks land on the dialog/stage, never the image; on the image the
  // click toggles fit <-> 1:1 zoom (the stage scrolls to pan when zoomed).
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer || event.target === stage) {
      viewer.close();
    }
  });

  bigImg.addEventListener("click", () => stage.classList.toggle("is-zoomed"));
}
