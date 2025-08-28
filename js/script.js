import { loadSectionByHash as loadCardSection } from "./card.js";
import { loadSectionByHash as loadFeatureSection } from "./feature.js";

loadCardSection();
loadFeatureSection();

let currentPage = 0;
const gallery = document.getElementById("gallery");
const totalPages = document.querySelectorAll(".page").length;

let startX = 0;
let isDragging = false;

// Function to load 3 HTML cards per page
function loadPageContent(pageId, cardFiles) {
  const page = document.getElementById(pageId);
  page.innerHTML = ""; // Clear previous content
  cardFiles.forEach((file) => {
    fetch(file)
      .then((res) => res.text())
      .then((data) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = data;
        page.appendChild(div);
      });
  });
}

// Swipe Events (touch + mouse)
gallery.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});
gallery.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  handleSwipe(startX, e.changedTouches[0].clientX);
  isDragging = false;
});

gallery.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  isDragging = true;
});
gallery.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  handleSwipe(startX, e.clientX);
  isDragging = false;
});

function handleSwipe(start, end) {
  const diff = start - end;
  if (diff > 50) {
    nextPage();
  } else if (diff < -50) {
    prevPage();
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateGallery();
    loadPageCards(currentPage);
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updateGallery();
    loadPageCards(currentPage);
  }
}

function updateGallery() {
  gallery.style.transform = `translateX(-${currentPage * 100}%)`;
}

// Define card HTML files for each page
const pages = [
  ["card.html"], // Page 0
  ["feature.html"], // Page 1
  ["rive.html"], // Page 2
];

function loadPageCards(pageIndex) {
  loadPageContent(`page-${pageIndex}`, pages[pageIndex]);
}

// Initial load
loadPageCards(0);
