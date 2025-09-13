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
  
  console.log('Video element found:', !!video);
  console.log('Screen width:', window.innerWidth);
  
  // Only load video on desktop and if connection is decent
  function shouldLoadVideo() {
    // Check if desktop
    if (window.innerWidth <= 768) {
      console.log('Skipping video: mobile device');
      return false;
    }
    
    console.log('Video should load: desktop detected');
    return true;
  }
  
  // Simpler approach - try to load video immediately if on desktop
  if (shouldLoadVideo() && video) {
    console.log('Starting video setup...');
    
    // Set up event listeners first
    video.addEventListener('loadeddata', function() {
      console.log('Video data loaded');
    });
    
    video.addEventListener('canplay', function() {
      console.log('Video can start playing');
      video.play().then(() => {
        console.log('Video playing successfully!');
        video.classList.add('loaded');
        // Stop the image carousel when video starts
        if (window.heroCarouselInterval) {
          clearInterval(window.heroCarouselInterval);
          console.log('Image carousel stopped');
        }
      }).catch(e => {
        console.log('Video autoplay failed:', e);
      });
    });
    
    video.addEventListener('error', function(e) {
      console.log('Video error:', e);
      video.style.display = 'none';
    });
    
    // Start loading the video
    setTimeout(() => {
      console.log('Loading video...');
      video.load();
    }, 1000); // Reduced wait time
    
  } else {
    console.log('Video conditions not met or video element not found');
  }
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