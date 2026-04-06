/* ================================================
   🧸 ToyWorld — Main JavaScript
   ================================================ */

// ---- Theme Management ----
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('toyworld-theme') || 'light';
    this.set(saved);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('toyworld-theme', theme);
    this.updateIcons(theme);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.set(current === 'dark' ? 'light' : 'dark');
  },
  updateIcons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }
};

// ---- RTL Management ----
const RTLManager = {
  init() {
    const saved = localStorage.getItem('toyworld-dir') || 'ltr';
    this.set(saved);
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  set(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('toyworld-dir', dir);
    this.updateIcons(dir);
  },
  toggle() {
    const current = document.documentElement.getAttribute('dir');
    this.set(current === 'rtl' ? 'ltr' : 'rtl');
  },
  updateIcons(dir) {
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
      btn.title = dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
    });
  }
};

// ---- Mobile Navigation ----
const MobileNav = {
  init() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const drawer = document.querySelector('.nav-mobile');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      drawer.classList.toggle('active');
      document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    drawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
};

// ---- Cart Management ----
const CartManager = {
  KEY: 'toyworld-cart',

  getCart() {
    return JSON.parse(localStorage.getItem(this.KEY) || '[]');
  },

  saveCart(cart) {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
    this.updateBadge();
  },

  addItem(product) {
    const cart = this.getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.saveCart(cart);
    this.showToast(`${product.name} added to cart!`);
  },

  removeItem(id) {
    const cart = this.getCart().filter(item => item.id !== id);
    this.saveCart(cart);
  },

  updateQuantity(id, qty) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, qty);
      this.saveCart(cart);
    }
  },

  getTotal() {
    return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCount() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
};

// ---- Toast Styles (injected) ----
(function injectToastStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .toast-notification {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--secondary);
      color: var(--white);
      padding: 14px 22px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-heading);
      font-weight: 500;
      font-size: 14px;
      box-shadow: var(--shadow-xl);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 9999;
    }
    [dir="rtl"] .toast-notification {
      right: auto;
      left: 24px;
    }
    .toast-notification.show {
      transform: translateY(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
})();

// ---- Testimonial Carousel ----
const TestimonialCarousel = {
  init() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;

    this.track = carousel.querySelector('.carousel-track');
    this.dots = carousel.querySelectorAll('.carousel-dot');
    this.current = 0;
    
    // In grouped mode, total is the number of slides (direct children of track)
    this.total = this.track.children.length;

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    // Set explicit widths for track and slides
    this.track.style.width = (this.total * 100) + '%';
    this.track.querySelectorAll('.carousel-slide').forEach(slide => {
      slide.style.width = (100 / this.total) + '%';
      slide.style.flex = '0 0 ' + (100 / this.total) + '%';
    });

    // Auto play every 3 seconds
    this.startAutoPlay();

    carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    
    // Prevent transition issues on load
    this.goTo(0);
  },

  startAutoPlay() {
    this.stopAutoPlay();
    this.interval = setInterval(() => this.next(), 3000);
  },

  stopAutoPlay() {
    if (this.interval) clearInterval(this.interval);
  },

  goTo(index) {
    this.current = index;
    if (this.current >= this.total) this.current = 0;
    if (this.current < 0) this.current = this.total - 1;

    const offset = -(this.current * (100 / this.total));
    if (this.track) {
      this.track.style.transform = `translateX(${offset}%)`;
    }

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.current);
    });
  },

  next() { this.goTo(this.current + 1); },
  prev() { this.goTo(this.current - 1); }
};

// ---- Accordion ----
const Accordion = {
  init() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const wasActive = item.classList.contains('active');
        
        // Close all in same group
        item.closest('.accordion-group')?.querySelectorAll('.accordion-item').forEach(el => {
          el.classList.remove('active');
        });

        if (!wasActive) {
          item.classList.add('active');
        }
      });
    });
  }
};

// ---- Intersection Observer (Scroll Animations) ----
const ScrollAnimator = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }
};

// ---- Header Scroll Effect ----
const HeaderScroll = {
  init() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
};

// ---- Scroll To Top ----
const ScrollToTop = {
  init() {
    this.injectStyles();
    this.injectHTML();
    this.btn = document.querySelector('.scroll-to-top');
    if (!this.btn) return;

    window.addEventListener('scroll', () => {
      this.btn.classList.toggle('show', window.scrollY > 300);
    });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  injectHTML() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);
  },

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .scroll-to-top {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 48px;
        height: 48px;
        border-radius: var(--radius-full);
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid rgba(255,255,255,0.1);
      }
      .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .scroll-to-top:hover {
        background: linear-gradient(135deg, var(--primary-light), var(--primary));
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
      }
      .scroll-to-top:active {
        transform: translateY(0) scale(0.95);
      }
      .scroll-to-top svg {
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;
      }
      .scroll-to-top:hover svg {
        transform: translateY(-2px);
      }
      
      /* RTL Support */
      [dir="rtl"] .scroll-to-top {
        right: auto;
        left: 24px;
      }

      /* Mobile Adjustment */
      @media (max-width: 768px) {
        .scroll-to-top {
          bottom: 16px;
          right: 16px;
          width: 42px;
          height: 42px;
        }
        [dir="rtl"] .scroll-to-top {
          left: 16px;
          right: auto;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  RTLManager.init();
  MobileNav.init();
  CartManager.updateBadge();
  TestimonialCarousel.init();
  Accordion.init();
  ScrollAnimator.init();
  HeaderScroll.init();
  ScrollToTop.init();
});
