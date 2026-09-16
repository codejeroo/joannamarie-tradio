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

/* ---- Shared image viewer (guarded: only on pages with a #viewer dialog) ----
   Any element with [data-viewer-src] opens the dialog with that image;
   data-viewer-alt / data-viewer-label customize the accessible names. */
const viewer = document.getElementById("viewer");

if (viewer) {
  const closeBtn = viewer.querySelector(".viewer__close");
  const stage = viewer.querySelector(".viewer__stage");
  const bigImg = viewer.querySelector(".viewer__img");

  document.querySelectorAll("[data-viewer-src]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      stage.classList.remove("is-zoomed"); // every open starts fitted
      bigImg.src = trigger.dataset.viewerSrc;
      bigImg.alt = trigger.dataset.viewerAlt || "";
      viewer.setAttribute("aria-label", trigger.dataset.viewerLabel || "Image viewer");
      viewer.showModal();
      document.body.classList.add("viewer-open");
    });
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
