// cart.js - Main cart functionality

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('nextplay-cart')) || [];

// Update cart count in the header
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Add item to cart
function addToCart(name, price, imageUrl = '') {
  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(item => item.name === name);
  
  if (existingItemIndex !== -1) {
    // Increment quantity if item already exists
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cart.push({
      name: name,
      price: price,
      imageUrl: imageUrl,
      quantity: 1
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('nextplay-cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show confirmation message
  showConfirmation(`${name} added to cart!`);
}

// Show confirmation message
function showConfirmation(message) {
  // Create confirmation element if it doesn't exist
  let confirmation = document.getElementById('cart-confirmation');
  if (!confirmation) {
    confirmation = document.createElement('div');
    confirmation.id = 'cart-confirmation';
    confirmation.style.position = 'fixed';
    confirmation.style.top = '20px';
    confirmation.style.right = '20px';
    confirmation.style.padding = '10px 20px';
    confirmation.style.backgroundColor = '#4CAF50';
    confirmation.style.color = 'white';
    confirmation.style.borderRadius = '5px';
    confirmation.style.zIndex = '1000';
    confirmation.style.transition = 'opacity 0.5s';
    document.body.appendChild(confirmation);
  }
  
  // Set message and show confirmation
  confirmation.textContent = message;
  confirmation.style.opacity = '1';
  
  // Hide confirmation after 2 seconds
  setTimeout(() => {
    confirmation.style.opacity = '0';
  }, 2000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  // Add event listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const name = productCard.querySelector('h3').textContent;
      const priceString = productCard.querySelector('.price-tag').textContent;
      const price = parseFloat(priceString.replace('$', ''));
      const imageUrl = productCard.querySelector('img').src;
      
      addToCart(name, price, imageUrl);
    });
  });
  
  // Add event listeners to all "Buy Now" buttons
  const buyNowButtons = document.querySelectorAll('.buy-now');
  buyNowButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const name = productCard.querySelector('h3').textContent;
      const priceString = productCard.querySelector('.price-tag').textContent;
      const price = parseFloat(priceString.replace('$', ''));
      const imageUrl = productCard.querySelector('img').src;
      
      // Add to cart first
      addToCart(name, price, imageUrl);
      
      // Then navigate to payment page
      window.location.href = 'payment.html';
    });
  });
  
  // Add event listener to cart icon
  const cartIcon = document.querySelector('.cart-indicator');
  if (cartIcon) {
    cartIcon.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'cart.html';
    });
  }
});