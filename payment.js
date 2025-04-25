// payment.js - For the payment.html page

document.addEventListener('DOMContentLoaded', function() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('nextplay-cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const finalTotalElement = document.getElementById('finalTotal');
    
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.quantity;
      
      // Create order item element
      const orderItem = document.createElement('div');
      orderItem.className = 'order-item';
      
      // Create item info
      const itemInfo = document.createElement('div');
      itemInfo.className = 'item-info';
      
      const itemName = document.createElement('p');
      itemName.className = 'item-name';
      itemName.textContent = item.name;
      
      const itemPrice = document.createElement('p');
      itemPrice.className = 'item-price';
      itemPrice.textContent = `$${item.price.toFixed(2)} x ${item.quantity}`;
      
      // Append elements
      itemInfo.appendChild(itemName);
      itemInfo.appendChild(itemPrice);
      orderItem.appendChild(itemInfo);
      
      // Add item to order summary
      orderItemsContainer.appendChild(orderItem);
    });
    
    // Calculate tax and final total
    const shipping = 5.99;
    const tax = subtotal * 0.08;
    const finalTotal = subtotal + shipping + tax;
    
    // Update summary info
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    finalTotalElement.textContent = `$${finalTotal.toFixed(2)}`;
    
    // Add form submit event listener
    document.getElementById('paymentForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validate form
      const form = this;
      if (form.checkValidity()) {
        // Show confirmation
        alert('Payment successful! Your order has been placed.');
        
        // Clear cart
        localStorage.removeItem('nextplay-cart');
        
        // Redirect to homepage
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        // Show validation errors
        form.reportValidity();
      }
    });
  });
