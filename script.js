/* ============================================
   ZION AI - Interactive JavaScript
   ============================================ */

// ===== PARTICLE SYSTEM (North Star) =====
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.particleCount = Math.min(300, Math.floor(window.innerWidth / 5));
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const rand = Math.random();
      let size, color;

      if (rand < 0.08) {
        // Bright star particles
        size = Math.random() * 2.5 + 1.5;
        color = `rgba(167, 139, 250, ${Math.random() * 0.7 + 0.3})`;
      } else if (rand < 0.3) {
        // Medium purple particles
        size = Math.random() * 1.8 + 0.6;
        color = `rgba(124, 58, 237, ${Math.random() * 0.6 + 0.2})`;
      } else if (rand < 0.5) {
        // Blue tint particles
        size = Math.random() * 1.2 + 0.4;
        color = `rgba(99, 130, 246, ${Math.random() * 0.5 + 0.15})`;
      } else {
        // White star particles
        size = Math.random() * 1.4 + 0.2;
        color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.15})`;
      }

      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        baseX: Math.random() * this.canvas.width,
        baseY: Math.random() * this.canvas.height,
        size: size,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.005,
        color: color
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particleCount = Math.min(300, Math.floor(window.innerWidth / 5));
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          const opacity = (1 - dist / 160) * 0.18;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      // Parallax with mouse
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 280;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        p.x -= (dx / dist) * force * 1;
        p.y -= (dy / dist) * force * 1;
      }

      // Float movement
      p.x += p.speedX;
      p.y += p.speedY;

      // Pulse
      p.pulse += p.pulseSpeed;
      const pulseFactor = Math.sin(p.pulse) * 0.35 + 0.65;

      // Boundaries wrap
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();

      // Glow for larger particles
      if (p.size > 0.8) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(124, 58, 237, ${0.04 * pulseFactor})`;
        this.ctx.fill();
      }

      // Extra bright glow for biggest particles
      if (p.size > 2) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 7, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(167, 139, 250, ${0.02 * pulseFactor})`;
        this.ctx.fill();
      }
    });

    this.drawConnections();
    requestAnimationFrame(() => this.animate());
  }
}


// ===== NAVBAR SCROLL =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });
}


// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }
}


// ===== HERO TYPEWRITER EFFECT =====
function initTypewriter() {
  const line1 = document.getElementById('heroLine1');
  const phrases = [
    'Automate Your Business',
    'Meet Your Digital DNA',
    '24/7 Efficiency with ZION',
    'Scale Without Limits'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      line1.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      line1.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  // Start after a small delay
  setTimeout(type, 1000);
}


// ===== SEARCH PLACEHOLDER CYCLING =====
function initSearchCycling() {
  const searchInput = document.getElementById('searchInput');
  const placeholders = [
    'Ask Zion Assistant to build a bot...',
    'How can I increase sales?',
    'Setup a WhatsApp Bot',
    'Automate customer support',
    'Generate more leads with AI'
  ];
  let placeholderIndex = 0;

  setInterval(() => {
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    searchInput.style.transition = 'opacity 0.3s';
    searchInput.style.opacity = '0';

    setTimeout(() => {
      searchInput.placeholder = placeholders[placeholderIndex];
      searchInput.style.opacity = '1';
    }, 300);
  }, 4000);
}


// ===== CURSOR GLOW =====
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  } else {
    glow.style.display = 'none';
  }
}


// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));
}


// ===== INTERACTIVE CHAT =====
function initInteractiveChat() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const chatBody = document.getElementById('chatBody');

  if (!input || !sendBtn || !chatBody) return;

  const addMessage = (message, isUser = true) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'user' : 'bot'}`;
    bubble.textContent = message;

    // Animate instantly without CSS delay
    bubble.style.animationDelay = '0s';
    bubble.style.animation = 'bubble-in 0.4s forwards';

    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, true);
    input.value = '';

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Analyzing intent...",
        "Zion protocol engaged.",
        "That's a great task. I'll get it sorted.",
        "Module initialized successfully."
      ];
      const res = responses[Math.floor(Math.random() * responses.length)];
      addMessage(res, false);
    }, 800 + Math.random() * 800);
  };

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}


// ===== SEARCH TAGS CLICK =====
function initSearchTags() {
  const tags = document.querySelectorAll('.search-tag');
  const searchInput = document.getElementById('searchInput');

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const text = tag.textContent.trim().replace(/^[^\w]+/, '');
      searchInput.value = text;
      searchInput.focus();
    });
  });
}


// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = '✓ Protocol Initialized';
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

    setTimeout(() => {
      submitBtn.textContent = '⚡ Launch Request';
      submitBtn.style.background = '';
    }, 3000);
  });
}


// ===== TRUST LOGO HOVER COLORS =====
function initTrustLogos() {
  const logos = document.querySelectorAll('.trust-logo');
  const colors = ['#a78bfa', '#3b82f6', '#f59e0b', '#22c55e'];

  logos.forEach((logo, i) => {
    logo.addEventListener('mouseenter', () => {
      logo.querySelector('.logo-symbol').style.color = colors[i];
      logo.querySelector('.logo-name').style.color = '#fff';
    });
    logo.addEventListener('mouseleave', () => {
      logo.querySelector('.logo-symbol').style.color = '';
      logo.querySelector('.logo-name').style.color = '';
    });
  });
}


// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        document.getElementById('navLinks').classList.remove('active');
      }
    });
  });
}


// ===== 3D CARD TILT EFFECT =====
function initCardTilt() {
  const cards = document.querySelectorAll('.use-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `translateY(-18px) scale(1.02) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Update spotlight position
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${percentX}%`);
      card.style.setProperty('--mouse-y', `${percentY}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}


// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-canvas');
  new ParticleSystem(canvas);

  initNavbar();
  initMobileMenu();
  initTypewriter();
  initSearchCycling();
  initCursorGlow();
  initScrollAnimations();
  initInteractiveChat();
  initSearchTags();
  initContactForm();
  initTrustLogos();
  initSmoothScroll();
  initCardTilt();
});
