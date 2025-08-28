document.addEventListener("DOMContentLoaded", () => {
  const pages = [
    "pages/card.html",
    "pages/feature.html",
    "pages/rive.html"
  ];
  
  let currentIndex = 0;

  // Initial load
  loadHTML(pages[currentIndex], "#content");

  // Swipe functionality
  let startX = 0;

  document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) { // Swipe left
      currentIndex = (currentIndex + 1) % pages.length;
      loadHTML(pages[currentIndex], "#content");
    } else if (diff < -50) { // Swipe right
      currentIndex = (currentIndex - 1 + pages.length) % pages.length;
      loadHTML(pages[currentIndex], "#content");
    }
  });
});

// Dynamic loader with script execution support
function loadHTML(file, targetSelector) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const target = document.querySelector(targetSelector);
      target.innerHTML = html;

      // Execute inline scripts
      target.querySelectorAll("script").forEach(script => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}
