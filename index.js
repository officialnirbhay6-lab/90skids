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



  // Mobile Navigation Hamburger Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open', !isOpen);
      navToggle.classList.toggle('open', !isOpen);
      navToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when clicking a link inside it
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
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
