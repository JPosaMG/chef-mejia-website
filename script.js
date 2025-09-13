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
  window.heroCarouselInterval = setInterval(changeBackground, 5000);
});

// Smart Video Background Loading (Desktop Only)
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('hero-video');
  const hero = document.getElementById('hero');
  
  // Only load video on desktop and if connection is decent
  function shouldLoadVideo() {
    // Check if desktop
    if (window.innerWidth <= 768) return false;
    
    // Check connection quality (if available)
    if ('connection' in navigator) {
      const connection = navigator.connection;
      // Don't load on slow connections
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        return false;
      }
    }
    
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    
    return true;
  }
  
  // Load video after page is fully loaded
  window.addEventListener('load', function() {
    if (shouldLoadVideo() && video) {
      // Wait a bit more to ensure everything is ready
      setTimeout(() => {
        // Start loading the video
        video.load();
        
        // When video can play, fade it in and pause image carousel
        video.addEventListener('canplaythrough', function() {
          video.play().then(() => {
            video.classList.add('loaded');
            // Stop the image carousel when video starts
            clearInterval(window.heroCarouselInterval);
          }).catch(e => {
            console.log('Video autoplay failed, keeping image carousel');
          });
        });
        
        // If video fails to load, keep using images
        video.addEventListener('error', function() {
          console.log('Video failed to load, using image carousel');
          video.style.display = 'none';
        });
        
      }, 2000); // Wait 2 seconds after page load
    }
  });
});

// Floating WhatsApp Button Behavior (Mobile Only)
document.addEventListener('DOMContentLoaded', function () {
  const floatingButton = document.querySelector('.floating-whatsapp');
  
  if (floatingButton && window.innerWidth <= 768) {
    let isScrolling = false;
    
    // Add smooth scroll behavior
    window.addEventListener('scroll', function() {
      if (!isScrolling) {
        window.requestAnimationFrame(function() {
          // Add a subtle bounce effect when scrolling
          floatingButton.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            floatingButton.style.transform = 'scale(1)';
          }, 150);
          
          isScrolling = false;
        });
        isScrolling = true;
      }
    });
    
    // Add pulse animation periodically to draw attention
    setInterval(() => {
      floatingButton.style.animation = 'pulse 1s ease-in-out';
      setTimeout(() => {
        floatingButton.style.animation = '';
      }, 1000);
    }, 10000); // Pulse every 10 seconds
  }
});