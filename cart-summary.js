// cart-summary.js - For the cart.html page

document.addEventListener('DOMContentLoaded', function() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('nextplay-cart')) || [];
  const cartTable = document.getElementById('cartTable').querySelector('tbody');
  const totalPriceElement = document.getElementById('totalPrice');
  
  // Clear existing table rows
  cartTable.innerHTML = '';
  
  // Calculate total price
  let totalPrice = 0;
  
  // Add each item to cart table
  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    
    // Create item cell with image and name
    const itemCell = document.createElement('td');
    const itemContent = document.createElement('div');
    itemContent.className = 'cart-item';
    
    // Add image if available
    if (item.imageUrl) {
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.name;
      img.className = 'cart-item-img';
      itemContent.appendChild(img);
    }
    
    // Add name and remove button
    const itemInfo = document.createElement('div');
    itemInfo.className = 'cart-item-info';
    
    const itemName = document.createElement('p');
    itemName.textContent = item.name;
    itemInfo.appendChild(itemName);
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-item';
    removeButton.dataset.index = index;
    itemInfo.appendChild(removeButton);
    
    itemContent.appendChild(itemInfo);
    itemCell.appendChild(itemContent);
    
    // Create quantity cell with controls
    const qtyCell = document.createElement('td');
    const qtyControls = document.createElement('div');
    qtyControls.className = 'quantity-controls';
    
    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.className = 'qty-btn';
    decreaseButton.dataset.index = index;
    decreaseButton.dataset.action = 'decrease';
    qtyControls.appendChild(decreaseButton);
    
    const qtyDisplay = document.createElement('span');
    qtyDisplay.textContent = item.quantity;
    qtyDisplay.className = 'qty-display';
    qtyControls.appendChild(qtyDisplay);
    
    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.className = 'qty-btn';
    increaseButton.dataset.index = index;
    increaseButton.dataset.action = 'increase';
    qtyControls.appendChild(increaseButton);
    
    qtyCell.appendChild(qtyControls);
    
    // Create price cell
    const priceCell = document.createElement('td');
    const itemTotalPrice = item.price * item.quantity;
    priceCell.textContent = `$${itemTotalPrice.toFixed(2)}`;
    
    // Add to total price
    totalPrice += itemTotalPrice;
    
    // Add cells to row
    row.appendChild(itemCell);
    row.appendChild(qtyCell);
    row.appendChild(priceCell);
    
    // Add row to table
    cartTable.appendChild(row);
  });
  
  // Update total price
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  
  // Add event listeners for quantity buttons and remove buttons
  document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      const action = this.dataset.action;
      
      if (action === 'increase') {
        cart[index].quantity += 1;
      } else if (action === 'decrease') {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        }
      }
      
      // Update localStorage
      localStorage.setItem('nextplay-cart', JSON.stringify(cart));
      
      // Reload page to reflect changes
      location.reload();
    });
  });
  
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      
      // Remove item from cart
      cart.splice(index, 1);
      
      // Update localStorage
      localStorage.setItem('nextplay-cart', JSON.stringify(cart));
      
      // Reload page to reflect changes
      location.reload();
    });
  });
  
  // Handle favorites
  document.getElementById('addToFavourites').addEventListener('click', function() {
    localStorage.setItem('nextplay-favorites', JSON.stringify(cart));
    alert('Current cart saved to favorites!');
  });
  
  document.getElementById('applyFavourites').addEventListener('click', function() {
    const favorites = JSON.parse(localStorage.getItem('nextplay-favorites')) || [];
    if (favorites.length > 0) {
      localStorage.setItem('nextplay-cart', JSON.stringify(favorites));
      alert('Favorites applied to cart!');
      location.reload();
    } else {
      alert('No favorites saved!');
    }
  });
});