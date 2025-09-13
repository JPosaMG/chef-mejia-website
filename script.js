// Simple hero background slider
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.getElementById('hero');
  const images = [
    'images/fullsizer.jpg',
    'images/img_2820.jpg',
    'images/img_2167.jpg'
  ];
  let current = 0;
  function changeBackground() {
    hero.style.backgroundImage = `url('${images[current]}')`;
    current = (current + 1) % images.length;
  }
  // Initialize and set interval
  changeBackground();
  setInterval(changeBackground, 5000);
});