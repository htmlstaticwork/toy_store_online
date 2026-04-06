/* ================================================
   🧸 ToyWorld — Shop & Product Logic
   ================================================ */

// ---- Product Data ----
const PRODUCTS = [
  {
    id: 1,
    name: "Rainbow Stacking Rings",
    price: 24.99,
    originalPrice: 29.99,
    category: "montessori",
    ageGroup: "0-2",
    skillType: "motor",
    image: "assets/images/toy-stacking-rings.png",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 124,
    description: "Beautiful wooden stacking rings in rainbow colors. Each ring is made from sustainably harvested beechwood, sanded smooth and finished with non-toxic, water-based paints. Helps develop hand-eye coordination and color recognition.",
    benefits: ["Motor Skills", "Color Recognition", "Hand-Eye Coordination"]
  },
  {
    id: 2,
    name: "Alphabet Puzzle Board",
    price: 32.99,
    originalPrice: null,
    category: "puzzles",
    ageGroup: "3-5",
    skillType: "cognitive",
    image: "assets/images/toy-puzzle-alphabet.png",
    badge: null,
    rating: 4.9,
    reviews: 89,
    description: "Chunky wooden alphabet puzzle with bright, colorful letters. Each letter fits perfectly into its own space on the natural wood board. Perfect for learning the ABCs while developing fine motor skills.",
    benefits: ["Letter Recognition", "Fine Motor Skills", "Problem Solving"]
  },
  {
    id: 3,
    name: "Classic Building Blocks Set",
    price: 39.99,
    originalPrice: 49.99,
    category: "wooden",
    ageGroup: "3-5",
    skillType: "creative",
    image: "assets/images/toy-wooden-blocks.png",
    badge: "Sale",
    rating: 4.7,
    reviews: 203,
    description: "A premium set of 50 wooden building blocks in various shapes and natural wood tones. Includes cubes, cylinders, arches, and triangles. Inspires creativity and spatial awareness.",
    benefits: ["Creativity", "Spatial Awareness", "Engineering Skills"]
  },
  {
    id: 4,
    name: "Number Train Puzzle",
    price: 27.99,
    originalPrice: null,
    category: "puzzles",
    ageGroup: "3-5",
    skillType: "cognitive",
    image: "assets/images/toy-number-train.png",
    badge: "New",
    rating: 4.6,
    reviews: 67,
    description: "A delightful wooden number train with removable pieces numbered 0-9. Each car connects with wooden pegs and is painted in vibrant, non-toxic colors.",
    benefits: ["Number Recognition", "Sequencing", "Fine Motor Skills"]
  },
  {
    id: 5,
    name: "Montessori Shape Sorter",
    price: 34.99,
    originalPrice: 42.99,
    category: "montessori",
    ageGroup: "0-2",
    skillType: "cognitive",
    image: "assets/images/toy-shape-sorter.svg",
    badge: "Popular",
    rating: 4.9,
    reviews: 156,
    description: "A beautifully crafted Montessori shape sorting box with 12 different geometric shapes. Made from sustainable pine wood with a natural finish.",
    benefits: ["Shape Recognition", "Problem Solving", "Cognitive Development"]
  },
  {
    id: 6,
    name: "Wooden Animal Puzzle Set",
    price: 22.99,
    originalPrice: null,
    category: "puzzles",
    ageGroup: "0-2",
    skillType: "cognitive",
    image: "assets/images/toy-animal-puzzle.svg",
    badge: null,
    rating: 4.5,
    reviews: 94,
    description: "Adorable wooden animal chunky puzzle set featuring 6 farm animals. Each piece has a large wooden knob for tiny hands to grasp easily.",
    benefits: ["Animal Recognition", "Grip Strength", "Vocabulary Building"]
  },
  {
    id: 7,
    name: "Wooden Marble Run",
    price: 54.99,
    originalPrice: 64.99,
    category: "wooden",
    ageGroup: "6-10",
    skillType: "creative",
    image: "assets/images/toy-marble-run.svg",
    badge: "Premium",
    rating: 4.8,
    reviews: 78,
    description: "An advanced wooden marble run set with 45 pieces including ramps, funnels, and bridges. Teaches physics concepts through play.",
    benefits: ["Engineering", "Physics Concepts", "Problem Solving"]
  },
  {
    id: 8,
    name: "Musical Xylophone",
    price: 19.99,
    originalPrice: null,
    category: "montessori",
    ageGroup: "0-2",
    skillType: "creative",
    image: "assets/images/toy-xylophone.svg",
    badge: null,
    rating: 4.4,
    reviews: 112,
    description: "A colorful 8-note wooden xylophone with metal keys that produce clear, melodious tones. Comes with 2 wooden mallets.",
    benefits: ["Musical Development", "Rhythm", "Color Recognition"]
  },
  {
    id: 9,
    name: "Brain Teaser Puzzle Box",
    price: 29.99,
    originalPrice: null,
    category: "puzzles",
    ageGroup: "6-10",
    skillType: "cognitive",
    image: "assets/images/toy-brain-teaser.svg",
    badge: null,
    rating: 4.7,
    reviews: 45,
    description: "A challenging wooden puzzle box with secret compartments. Features sliding panels, hidden buttons, and rotating elements.",
    benefits: ["Critical Thinking", "Patience", "Logic Skills"]
  },
  {
    id: 10,
    name: "Dollhouse Furniture Kit",
    price: 44.99,
    originalPrice: 54.99,
    category: "wooden",
    ageGroup: "3-5",
    skillType: "creative",
    image: "assets/images/toy-dollhouse.svg",
    badge: "Sale",
    rating: 4.6,
    reviews: 83,
    description: "A 34-piece wooden dollhouse furniture set including bedroom, kitchen, living room, and bathroom pieces. All made from natural wood.",
    benefits: ["Imagination", "Social Skills", "Storytelling"]
  },
  {
    id: 11,
    name: "Counting Beads Frame",
    price: 18.99,
    originalPrice: null,
    category: "montessori",
    ageGroup: "3-5",
    skillType: "cognitive",
    image: "assets/images/toy-counting-beads.svg",
    badge: null,
    rating: 4.5,
    reviews: 91,
    description: "A classic wooden abacus with 100 colorful beads on 10 rows. Perfect for learning counting, addition, subtraction, and patterns.",
    benefits: ["Math Skills", "Counting", "Pattern Recognition"]
  },
  {
    id: 12,
    name: "Adventure Map Puzzle",
    price: 36.99,
    originalPrice: null,
    category: "puzzles",
    ageGroup: "6-10",
    skillType: "cognitive",
    image: "assets/images/toy-map-puzzle.svg",
    badge: "New",
    rating: 4.8,
    reviews: 34,
    description: "A detailed 100-piece wooden world map puzzle. Each continent is a separate puzzle piece group, teaching geography through play.",
    benefits: ["Geography", "Spatial Thinking", "Cultural Awareness"]
  }
];

// ---- Shop Page Logic ----
const ShopPage = {
  filters: {
    age: [],
    category: [],
    skill: [],
    sort: 'popular'
  },

  init() {
    this.renderProducts(PRODUCTS);
    this.bindFilters();
    this.bindSort();
    this.bindMobileFilter();
  },

  bindFilters() {
    document.querySelectorAll('.filter-option input').forEach(input => {
      input.addEventListener('change', () => {
        this.updateFilters();
        this.applyFilters();
      });
    });
  },

  bindSort() {
    const sortSelect = document.getElementById('shop-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.filters.sort = e.target.value;
        this.applyFilters();
      });
    }
  },

  bindMobileFilter() {
    const filterBtn = document.querySelector('.mobile-filter-btn');
    const sidebar = document.querySelector('.shop-sidebar');
    if (filterBtn && sidebar) {
      filterBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
    }
  },

  updateFilters() {
    this.filters.age = [...document.querySelectorAll('[data-filter="age"]:checked')].map(el => el.value);
    this.filters.category = [...document.querySelectorAll('[data-filter="category"]:checked')].map(el => el.value);
    this.filters.skill = [...document.querySelectorAll('[data-filter="skill"]:checked')].map(el => el.value);
  },

  applyFilters() {
    let filtered = [...PRODUCTS];

    if (this.filters.age.length) {
      filtered = filtered.filter(p => this.filters.age.includes(p.ageGroup));
    }
    if (this.filters.category.length) {
      filtered = filtered.filter(p => this.filters.category.includes(p.category));
    }
    if (this.filters.skill.length) {
      filtered = filtered.filter(p => this.filters.skill.includes(p.skillType));
    }

    // Sort
    switch (this.filters.sort) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'newest': filtered.sort((a, b) => b.id - a.id); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: filtered.sort((a, b) => b.reviews - a.reviews);
    }

    this.renderProducts(filtered);
    
    const countEl = document.querySelector('.result-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} products`;
  },

  renderProducts(products) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-tertiary); margin-bottom: 16px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h4 style="color: var(--text-tertiary); margin-bottom: 8px;">No products found</h4>
          <p style="font-size: 14px;">Try adjusting your filters</p>
        </div>`;
      return;
    }

    grid.innerHTML = products.map(p => `
      <div class="card product-card" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="card-img-wrap">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy">
          <button class="quick-add" onclick="event.stopPropagation(); CartManager.addItem({id:${p.id}, name:'${p.name.replace(/'/g, "\\'")}', price:${p.price}, image:'${p.image}'})" title="Add to Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <div class="card-body">
          <div class="product-rating mb-2">
            <span class="stars">${this.renderStars(p.rating)}</span>
            <span>(${p.reviews})</span>
          </div>
          <h4 class="card-title">${p.name}</h4>
          <p class="card-text">${p.benefits.join(' · ')}</p>
          <div class="product-price">
            $${p.price.toFixed(2)}
            ${p.originalPrice ? `<span class="original-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  },

  renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    let html = '';
    for (let i = 0; i < full; i++) html += '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    for (let i = 0; i < half; i++) html += '<svg viewBox="0 0 24 24" style="opacity:0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    for (let i = 0; i < empty; i++) html += '<svg viewBox="0 0 24 24" style="opacity:0.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    return html;
  }
};

// ---- Product Detail Page Logic ----
const ProductDetailPage = {
  init() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')) || 1;
    const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
    this.render(product);
  },

  render(product) {
    // Main image
    const mainImg = document.getElementById('product-main-img');
    if (mainImg) mainImg.src = product.image;

    // Info
    const nameEl = document.getElementById('product-name');
    if (nameEl) nameEl.textContent = product.name;

    const priceEl = document.getElementById('product-price-display');
    if (priceEl) {
      priceEl.innerHTML = `$${product.price.toFixed(2)}${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}`;
    }

    const descEl = document.getElementById('product-description');
    if (descEl) descEl.textContent = product.description;

    const ratingEl = document.getElementById('product-rating-display');
    if (ratingEl) {
      ratingEl.innerHTML = `<span class="stars">${ShopPage.renderStars(product.rating)}</span> <span>${product.rating} (${product.reviews} reviews)</span>`;
    }

    // Benefits
    const benefitsEl = document.getElementById('product-benefits');
    if (benefitsEl) {
      benefitsEl.innerHTML = product.benefits.map(b => `
        <span class="product-benefit-tag">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ${b}
        </span>
      `).join('');
    }

    // Add to cart button
    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const qty = parseInt(document.getElementById('product-qty')?.value || 1);
        for (let i = 0; i < qty; i++) {
          CartManager.addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
        }
      });
    }

    // Related products
    const relatedGrid = document.getElementById('related-products');
    if (relatedGrid) {
      const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
      relatedGrid.innerHTML = related.map(p => `
        <div class="card product-card" onclick="window.location.href='product.html?id=${p.id}'">
          <div class="card-img-wrap">
            <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy">
          </div>
          <div class="card-body">
            <h4 class="card-title" style="font-size: 14px;">${p.name}</h4>
            <div class="product-price" style="font-size: 16px;">$${p.price.toFixed(2)}</div>
          </div>
        </div>
      `).join('');
    }
  }
};

// ---- Cart Page Logic ----
const CartPage = {
  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('order-summary-content');
    if (!container) return;

    const cart = CartManager.getCart();

    const layout = document.querySelector('.cart-layout');
    if (cart.length === 0) {
      if (layout) layout.classList.add('cart-is-empty');
      container.innerHTML = `
        <div style="text-align: center; padding: 100px 20px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-tertiary); margin-bottom: 24px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h2 style="margin-bottom: 12px; font-size: 32px;">Your cart is empty</h2>
          <p style="font-size: 18px; color: var(--text-tertiary); margin-bottom: 32px;">Looks like you haven't added any toys yet!</p>
          <a href="shop.html" class="btn btn-primary btn-lg">Browse Toys</a>
        </div>`;
      if (summary) summary.style.display = 'none';
      return;
    }

    if (layout) layout.classList.remove('cart-is-empty');

    container.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variant">Wooden · Educational</div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button onclick="CartPage.changeQty(${item.id}, -1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <input type="number" value="${item.quantity}" min="1" readonly>
              <button onclick="CartPage.changeQty(${item.id}, 1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <button class="cart-item-remove" onclick="CartPage.remove(${item.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');

    // Update summary
    this.updateSummary(cart);
  },

  updateSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  },

  changeQty(id, delta) {
    const cart = CartManager.getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      CartManager.saveCart(cart);
      this.render();
    }
  },

  remove(id) {
    CartManager.removeItem(id);
    this.render();
  }
};

// ---- Initialize based on page ----
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.products-grid')) ShopPage.init();
  if (document.querySelector('.product-detail')) ProductDetailPage.init();
  if (document.getElementById('cart-items')) CartPage.init();
});
