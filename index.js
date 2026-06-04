document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#projectForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Gather form inputs
      const data = new FormData(form);
      const name = data.get("name") ? data.get("name").trim() : "";
      const business = data.get("business") ? data.get("business").trim() : "";
      const service = data.get("service") || "";
      const budget = data.get("budget") || "Need advice";
      const message = data.get("message") ? data.get("message").trim() : "";

      // Format WhatsApp message text block
      const textBlock = [
        "Hi 90skidsdigital, I would like to inquire about a project.",
        "--------------------------------------------------",
        `👤 Name: ${name}`,
        `🏢 Brand: ${business}`,
        `🛠️ Service: ${service}`,
        `💰 Budget Range: ${budget}`,
        `📝 Details: ${message}`
      ].join("\n");

      // Encode and open WhatsApp link in a new tab
      const whatsappUrl = `https://wa.me/917717766958?text=${encodeURIComponent(textBlock)}`;
      window.open(whatsappUrl, "_blank", "noopener");
    });
  }

  // Portfolio Website Movie Slider Logic (Manual Only)
  const movieSliderContainer = document.querySelector('.movie-slider-container');
  const glowBackdrop = document.querySelector('.movie-glow-backdrop');
  const movieCards = document.querySelectorAll('.movie-card');
  const prevBtnMovie = document.querySelector('.prev-btn-movie');
  const nextBtnMovie = document.querySelector('.next-btn-movie');
  
  if (movieSliderContainer && movieCards.length > 0) {
    let currentSlideIndex = 0;
 
    const updateSlider = (index) => {
      currentSlideIndex = index;
 
      // Update active card class
      movieCards.forEach((card, idx) => {
        card.classList.toggle('active', idx === index);
      });
 
      // Dynamically reposition the ambient glow backdrop behind the active card
      const activeCard = movieCards[index];
      if (activeCard && glowBackdrop) {
        // Calculate offset relative to parent track
        const track = activeCard.parentElement;
        const activeRect = activeCard.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        
        // Find center of card relative to track
        const cardCenterInTrack = (activeRect.left - trackRect.left) + (activeRect.width / 2);
        const offsetLeft = cardCenterInTrack - (glowBackdrop.offsetWidth / 2);
        
        glowBackdrop.style.transform = `translate(${offsetLeft}px, -30px)`;
      }
 
      // Scroll card into view on small screens/mobile horizontally
      if (activeCard) {
        activeCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    };
 
    const goToNextSlide = () => {
      let nextIndex = currentSlideIndex + 1;
      if (nextIndex >= movieCards.length) nextIndex = 0;
      updateSlider(nextIndex);
    };
 
    const goToPrevSlide = () => {
      let prevIndex = currentSlideIndex - 1;
      if (prevIndex < 0) prevIndex = movieCards.length - 1;
      updateSlider(prevIndex);
    };
 
    // Click handlers on movie cards
    movieCards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // Prevent click if we target the visit website link
        if (e.target.closest('.card-visit-btn')) return;
        updateSlider(idx);
      });
    });
 
    // Arrow controls
    if (prevBtnMovie) {
      prevBtnMovie.addEventListener('click', () => {
        goToPrevSlide();
      });
    }
 
    if (nextBtnMovie) {
      nextBtnMovie.addEventListener('click', () => {
        goToNextSlide();
      });
    }
 
    // Stop propagation on visit links inside top slider cards
    const visitButtons = document.querySelectorAll('.card-visit-btn');
    visitButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
 
    // Resize listener to re-center glow backdrop
    window.addEventListener('resize', () => {
      updateSlider(currentSlideIndex);
    });
 
    // Initial run
    setTimeout(() => {
      updateSlider(0);
    }, 100);
  }

  // Smooth scroll performance optimization
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });
});
