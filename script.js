// Simple hero background slider
document.addEventListener('DOMContentLoaded', function () {
  // Grab hero element for background slider
  const hero = document.getElementById('hero');
  // List of images to cycle through.  These files live in the repository root,
  // so there is no images/ prefix.
  const images = [
    'hero.jpg',         // primary greeting image of the poolside lobster scene
    'FullSizeR.jpg',    // cucumber‑scaled fish platter
    'IMG_2820.jpg',     // steak with red wine reduction
    'IMG_2167.jpg'      // fresh salad plate
  ];
  let current = 0;
  
  // Add cache busting parameter to force image reload
  const cacheBuster = Date.now();
  
  function changeBackground() {
    hero.style.backgroundImage = `url('${images[current]}?v=${cacheBuster}')`;
    current = (current + 1) % images.length;
  }
  // Initialize and set interval
  changeBackground();
  setInterval(changeBackground, 5000);
});