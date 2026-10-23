# NovaStore - Modern E-Commerce Website

A responsive, feature-rich e-commerce store built purely with semantic **HTML5**, modern **CSS3**, and vanilla **JavaScript (ES6+)**.

## ✨ Features

- **Product Catalog & Details**:
  - Curated items with realistic photography, pricing, badges (Sale/New), and customer ratings.
  - Interactive **Quick View Modal** showing detailed descriptions, bulleted specifications, and direct add-to-cart actions.
- **Search, Filter & Sorting**:
  - Live, real-time search filter across product names, categories, and descriptions.
  - Category pill filter tabs (All, Electronics, Accessories, Fashion, Home & Living).
  - Multi-criteria sorting (Featured, Price: Low to High, Price: High to Low, Rating).
- **Interactive Shopping Cart**:
  - Slide-over side drawer with smooth animations and backdrop blur.
  - Quantity controls (`+` / `-`), individual item removal, and full cart clearing.
  - Dynamic pricing calculation with Subtotal, Free Shipping qualification (free for orders over $50), and Total.
  - Cart persistence via `localStorage` (cart items stay preserved across page reloads).
- **Checkout Simulation**:
  - Seamless checkout flow modal with address inputs, order summary, and real-time total.
  - Interactive order confirmation screen generating simulated order IDs.
- **Modern UI & UX**:
  - Responsive design optimized for desktop, tablet, and mobile devices.
  - Dark Mode & Light Mode switcher with saved preference.
  - Non-intrusive toast notifications for user actions.

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, serve it locally using any static file server:
   ```bash
   # Using Python 3
   python -m http.server 3000

   # Or using Node.js npx
   npx serve .
   ```
3. Visit `http://localhost:3000` in your browser.

## 📂 Project Structure

```
e-commerce/
├── index.html     # Semantic markup and UI structure
├── styles.css     # Responsive styles, design system tokens, animations
├── app.js         # Reactive UI updates, cart logic, catalog filtering
└── README.md      # Project overview and usage guide
```

