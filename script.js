// Simple hero background slider
document.addEventListener('DOMContentLoaded', function () {
  // Grab hero element for background slider
  const hero = document.getElementById('hero');
  // List of images with their optimal positioning to showcase the food
  const images = [
    { src: 'hero.jpg', position: 'center center' },         // primary greeting image
    { src: 'fullsizer.jpg', position: 'center 45%' },       // slightly up to focus on the dish
    { src: 'img_2820.jpg', position: 'center 50%' },        // slight adjustment for the steak
    { src: 'img_2167.jpg', position: 'center 40%' }         // slight up for salad focus
  ];
  let current = 0;
  
  // Add cache busting parameter to force image reload
  const cacheBuster = Date.now();
  
  function changeBackground() {
    // Use both timestamp and random number for stronger cache busting
    const uniqueBuster = cacheBuster + Math.random().toString(36).substr(2, 9);
    const currentImage = images[current];
    hero.style.backgroundImage = `url('${currentImage.src}?v=${uniqueBuster}')`;
    hero.style.backgroundPosition = currentImage.position;
    current = (current + 1) % images.length;
  }
  // Initialize and set interval
  changeBackground();
  setInterval(changeBackground, 5000);
});