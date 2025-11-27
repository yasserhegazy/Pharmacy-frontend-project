// ==========================================
// Shopping Cart Functionality
// ==========================================

function initializeCartCounters() {
    // Get all cart items
    const cartItems = document.querySelectorAll('#element');
    
    cartItems.forEach((item, index) => {
        const plusBtn = item.querySelector('button[id="plus"]');
        const minusBtn = item.querySelector('button[id="minus"]');
        const resultSpan = item.querySelector('span[id="results"]');
        
        if (!plusBtn || !minusBtn || !resultSpan) return;
        
        let count = 0;
        
        // Plus button - increase quantity
        plusBtn.onclick = () => {
            count++;
            resultSpan.textContent = count;
            updateCartTotal();
        };
        
        // Minus button - decrease quantity (minimum 0)
        minusBtn.onclick = () => {
            if (count > 0) {
                count--;
                resultSpan.textContent = count;
                updateCartTotal();
            }
        };
    });
}

// Calculate and update cart total
function updateCartTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('#element');
    
    cartItems.forEach(item => {
        const priceElement = item.querySelector('#information h6:last-child');
        const quantityElement = item.querySelector('span[id="results"]');
        
        if (priceElement && quantityElement) {
            const price = parseFloat(priceElement.textContent.replace('$', ''));
            const quantity = parseInt(quantityElement.textContent);
            total += price * quantity;
        }
    });
    
    // Update total display if it exists
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
    
    return total;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCartCounters);
} else {
    initializeCartCounters();
}
