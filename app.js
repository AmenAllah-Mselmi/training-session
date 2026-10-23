/**
 * NovaStore - Core E-Commerce Logic
 */

// Product Catalog Data
const PRODUCTS = [
  {
    id: 1,
    name: "Aura Noise-Canceling Wireless Headphones",
    category: "Electronics",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 142,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Premium over-ear wireless headphones with active noise cancellation, 40-hour battery life, and crystal-clear acoustic tuning.",
    specs: ["Bluetooth 5.3", "Up to 40h battery", "Active Noise Cancellation", "Fast USB-C charging"]
  },
  {
    id: 2,
    name: "Minimalist Chronograph Watch",
    category: "Accessories",
    price: 129.50,
    originalPrice: 160.00,
    rating: 4.6,
    reviews: 89,
    badge: "New",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "A clean, modern timepiece featuring sapphire-coated glass, genuine Italian leather strap, and 5ATM water resistance.",
    specs: ["Sapphire crystal", "Genuine leather strap", "Water resistant 50m", "Japanese quartz movement"]
  },
  {
    id: 3,
    name: "Everyday Ergonomic Mechanical Keyboard",
    category: "Electronics",
    price: 109.00,
    originalPrice: null,
    rating: 4.9,
    reviews: 215,
    badge: null,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "Hot-swappable mechanical keyboard with pre-lubed switches, sound-dampening foam, and customizable RGB backlight.",
    specs: ["Hot-swappable switches", "Wireless & wired modes", "PBT keycaps", "Custom macro support"]
  },
  {
    id: 4,
    name: "All-Weather Commuter Backpack",
    category: "Fashion",
    price: 79.99,
    originalPrice: 99.00,
    rating: 4.7,
    reviews: 64,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description: "Water-resistant, durable daily backpack with dedicated 16-inch padded laptop sleeve and hidden anti-theft pockets.",
    specs: ["Fits up to 16\" laptop", "Weatherproof Cordura fabric", "Luggage strap", "24L capacity"]
  },
  {
    id: 5,
    name: "Smart Ambient Desk Lamp",
    category: "Home & Living",
    price: 64.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 43,
    badge: null,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description: "Dimmable LED desk light with wireless charging pad base, adjustable color temperature, and touch-sensitive controls.",
    specs: ["Integrated 15W wireless charger", "3 color temperature modes", "Zero flicker eye-care", "Auto timer"]
  },
  {
    id: 6,
    name: "Premium Ceramic Pour-Over Kettle",
    category: "Home & Living",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 77,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    description: "Precision gooseneck spout for optimal pour-over extraction, with ergonomic natural wood handle and thermometer gauge.",
    specs: ["Gooseneck precision spout", "Built-in thermometer", "Ergonomic wooden grip", "800ml capacity"]
  },
  {
    id: 7,
    name: "Studio Pro Podcast & Vocal Microphone",
    category: "Electronics",
    price: 139.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 182,
    badge: "New",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    description: "Cardioid condenser microphone with internal pop filter, zero-latency monitoring, and plug-and-play USB connection.",
    specs: ["Cardioid pickup pattern", "24-bit/96kHz resolution", "Headphone jack with volume dial", "Built-in shock mount"]
  },
  {
    id: 8,
    name: "Ultra-Soft Organic Cotton Hoodie",
    category: "Fashion",
    price: 58.00,
    originalPrice: 70.00,
    rating: 4.6,
    reviews: 95,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Heavyweight 400 GSM 100% organic French terry cotton hoodie. Pre-shrunk for an enduring, relaxed fit.",
    specs: ["100% Organic Cotton", "Heavyweight 400 GSM", "Ribbed cuffs & hem", "Machine washable"]
  }
];

// App State
let state = {
  cart: JSON.parse(localStorage.getItem('novastore_cart') || '[]'),
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'featured',
  theme: localStorage.getItem('novastore_theme') || 'light'
};

// DOM Selectors
const productsGrid = document.getElementById('products-grid');
const categoryPillsContainer = document.getElementById('category-pills');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const sortSelect = document.getElementById('sort-select');
const resultsCountEl = document.getElementById('results-count');
const resetFilterBtn = document.getElementById('reset-filter-btn');
const emptyStateEl = document.getElementById('empty-state');
const resetEmptyBtn = document.getElementById('reset-empty-btn');

// Cart Drawer Selectors
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartCountBadge = document.getElementById('cart-count');
const drawerItemsCount = document.getElementById('drawer-items-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartShippingEl = document.getElementById('cart-shipping');
const cartTotalEl = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');

// Modal Selectors
const quickViewModal = document.getElementById('quick-view-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const checkoutFormContainer = document.getElementById('checkout-form-container');
const orderSuccessView = document.getElementById('order-success-view');
const confirmedOrderId = document.getElementById('confirmed-order-id');
const checkoutFinalTotal = document.getElementById('checkout-final-total');
const btnPayAmount = document.getElementById('btn-pay-amount');
const continueShoppingBtn = document.getElementById('continue-shopping-btn');

// Theme & Toast
const themeToggleBtn = document.getElementById('theme-toggle');
const toastContainer = document.getElementById('toast-container');

// Initialize Application
function init() {
  applyTheme(state.theme);
  renderCategories();
  renderProducts();
  updateCartUI();
  setupEventListeners();
}

// Set up Event Listeners
function setupEventListeners() {
  // Theme Toggle
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Search
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    clearSearchBtn.classList.toggle('active', state.searchQuery.length > 0);
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearSearchBtn.classList.remove('active');
    renderProducts();
    searchInput.focus();
  });

  // Sorting
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Reset Filters
  resetFilterBtn.addEventListener('click', resetAllFilters);
  resetEmptyBtn.addEventListener('click', resetAllFilters);

  // Cart Drawer open/close
  openCartBtn.addEventListener('click', openCartDrawer);
  closeCartBtn.addEventListener('click', closeCartDrawer);
  cartBackdrop.addEventListener('click', closeCartDrawer);

  // Cart actions
  clearCartBtn.addEventListener('click', () => {
    if (state.cart.length === 0) return;
    if (confirm('Are you sure you want to empty your cart?')) {
      state.cart = [];
      saveCart();
      updateCartUI();
      showToast('Shopping cart cleared', 'fa-solid fa-trash-can');
    }
  });

  // Quick View Modal Close
  closeModalBtn.addEventListener('click', closeQuickView);
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });

  // Checkout Modal
  checkoutBtn.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your cart is empty!', 'fa-solid fa-circle-exclamation');
      return;
    }
    closeCartDrawer();
    openCheckoutModal();
  });

  closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  continueShoppingBtn.addEventListener('click', () => {
    closeCheckoutModal();
  });

  // Escape key to close modals/drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
      closeCheckoutModal();
    }
  });
}

// Theme handling
function toggleTheme() {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('novastore_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  themeToggleBtn.innerHTML = theme === 'dark' 
    ? '<i class="fa-solid fa-sun"></i>' 
    : '<i class="fa-regular fa-moon"></i>';
}

// Render Categories Filter Pills
function renderCategories() {
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  categoryPillsContainer.innerHTML = categories.map(cat => `
    <button class="category-pill ${cat === state.selectedCategory ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');

  categoryPillsContainer.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      categoryPillsContainer.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedCategory = btn.dataset.category;
      renderProducts();
    });
  });
}

// Filter and Sort Products
function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    const matchesCategory = state.selectedCategory === 'All' || product.category === state.selectedCategory;
    const matchesSearch = !state.searchQuery || 
      product.name.toLowerCase().includes(state.searchQuery) ||
      product.description.toLowerCase().includes(state.searchQuery) ||
      product.category.toLowerCase().includes(state.searchQuery);
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (state.sortBy === 'price-asc') return a.price - b.price;
    if (state.sortBy === 'price-desc') return b.price - a.price;
    if (state.sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id; // Featured default
  });
}

// Render Product Grid
function renderProducts() {
  const filtered = getFilteredProducts();

  // Results status label
  const isFiltered = state.selectedCategory !== 'All' || state.searchQuery.length > 0;
  resetFilterBtn.classList.toggle('hidden', !isFiltered);

  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    emptyStateEl.classList.remove('hidden');
    resultsCountEl.textContent = 'Showing 0 products';
    return;
  }

  emptyStateEl.classList.add('hidden');
  resultsCountEl.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`;

  productsGrid.innerHTML = filtered.map(product => {
    const badgeHTML = product.badge 
      ? `<span class="badge-tag ${product.badge === 'Sale' ? 'badge-sale' : 'badge-new'}">${product.badge}</span>` 
      : '';

    const originalPriceHTML = product.originalPrice 
      ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` 
      : '';

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-image-box">
          ${badgeHTML}
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="card-quick-actions">
            <button class="action-btn-circle quick-view-btn" data-id="${product.id}" title="Quick View">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
        </div>

        <div class="card-body">
          <span class="card-category">${product.category}</span>
          <h3 class="card-title" data-id="${product.id}">${product.name}</h3>

          <div class="card-rating">
            <i class="fa-solid fa-star"></i>
            <strong>${product.rating.toFixed(1)}</strong>
            <span class="rating-count">(${product.reviews})</span>
          </div>

          <div class="card-footer-action">
            <div class="price-box">
              <span class="current-price">$${product.price.toFixed(2)}</span>
              ${originalPriceHTML}
            </div>
            <button class="add-cart-btn add-to-cart-action" data-id="${product.id}" title="Add to Cart" aria-label="Add to cart">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach card event listeners
  productsGrid.querySelectorAll('.add-to-cart-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id, 10);
      addToCart(id, 1);
    });
  });

  productsGrid.querySelectorAll('.quick-view-btn, .card-title').forEach(el => {
    el.addEventListener('click', (e) => {
      const id = parseInt(el.dataset.id, 10);
      openQuickView(id);
    });
  });
}

function resetAllFilters() {
  state.selectedCategory = 'All';
  state.searchQuery = '';
  state.sortBy = 'featured';
  searchInput.value = '';
  clearSearchBtn.classList.remove('active');
  sortSelect.value = 'featured';
  
  categoryPillsContainer.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.category === 'All');
  });

  renderProducts();
}

// Cart Management
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to your cart!`, 'fa-solid fa-check');
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  const item = state.cart.find(i => i.id === productId);
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  if (item) {
    showToast(`Removed "${item.name}" from cart`, 'fa-solid fa-trash-can');
  }
}

function saveCart() {
  localStorage.setItem('novastore_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8.50;
  const total = subtotal + shipping;

  // Header & Drawer Badges
  cartCountBadge.textContent = totalItems;
  drawerItemsCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

  // Drawer Footer amounts
  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  cartShippingEl.textContent = subtotal === 0 ? '$0.00' : (shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  // Checkout modal values
  checkoutFinalTotal.textContent = `$${total.toFixed(2)}`;
  btnPayAmount.textContent = total.toFixed(2);

  // Render items in drawer
  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-view">
        <i class="fa-solid fa-basket-shopping empty-cart-icon"></i>
        <p>Your shopping cart is currently empty.</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        <div class="cart-qty-control">
          <button class="qty-btn qty-decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn qty-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="remove-item-btn" data-id="${item.id}" title="Remove item" aria-label="Remove item">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');

  // Cart item events
  cartItemsContainer.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.id, 10), -1));
  });

  cartItemsContainer.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.id, 10), 1));
  });

  cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id, 10)));
  });
}

function openCartDrawer() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.add('hidden');
  document.body.style.overflow = '';
}

// Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  modalContent.innerHTML = `
    <div class="modal-quick-view-grid">
      <img src="${product.image}" alt="${product.name}" class="quick-view-img">
      <div class="quick-view-info">
        <div>
          <span class="card-category">${product.category}</span>
          <h2>${product.name}</h2>
          <div class="card-rating" style="margin: 8px 0 12px;">
            <i class="fa-solid fa-star"></i>
            <strong>${product.rating.toFixed(1)}</strong>
            <span class="rating-count">(${product.reviews} reviews)</span>
          </div>
          <div class="price-box" style="margin-bottom: 12px;">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <p class="quick-view-desc">${product.description}</p>
          <div class="quick-view-specs">
            ${product.specs.map(spec => `<div><i class="fa-solid fa-check" style="color:var(--primary); margin-right:6px;"></i>${spec}</div>`).join('')}
          </div>
        </div>
        <button class="btn btn-primary btn-block" id="modal-add-btn" data-id="${product.id}">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  `;

  document.getElementById('modal-add-btn').addEventListener('click', () => {
    addToCart(product.id, 1);
    closeQuickView();
  });

  quickViewModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  quickViewModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Checkout Flow
function openCheckoutModal() {
  checkoutFormContainer.classList.remove('hidden');
  orderSuccessView.classList.add('hidden');
  checkoutModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  checkoutModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  // Generate random order ID
  const orderId = '#NOV-' + Math.floor(100000 + Math.random() * 900000);
  confirmedOrderId.textContent = orderId;

  // Clear cart
  state.cart = [];
  saveCart();
  updateCartUI();

  // Transition to confirmation screen
  checkoutFormContainer.classList.add('hidden');
  orderSuccessView.classList.remove('hidden');
  checkoutForm.reset();
}

// Toast Notifications
function showToast(message, iconClass = 'fa-solid fa-circle-info') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);

