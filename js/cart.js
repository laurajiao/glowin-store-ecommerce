import { setCardClickListeners } from "./product-display.js";


let cart = JSON.parse(localStorage.getItem('cart')) || [];


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartBadge = document.getElementById('cart-badge');
    const shippingFeeDisplay = document.getElementById('shipping-fee'); 
    const grandTotalDisplay = document.getElementById('grand-total');   
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        total = 0; 
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p class="cart-title custom-font fst-italic">${item.name}</p>
            <div class="cart-details">
                <img src="${item.colorImage}" alt="Color Image" style="width: 50px;">
                <p class="cart-price">$${(item.price * item.quantity).toFixed(2)}</p>
                <div class="cart-quantity">
                    <input type="number" class="form-control quantity-input" value="${item.quantity}"
                    min="1" data-id="${item.id}" data-color-id="${item.colorId}" style="width:50px">
                </div>
                <button class="btn remove-from-cart-btn" data-id="${item.id}" data-color-id="${item.colorId}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
    });
    let shippingFee = total >= 50 ? 0 : 5;
    const remainingAmountForFreeDelivery = total >= 50 ? 0 : (50 - total).toFixed(2);



    cartTotal.innerText = total.toFixed(2);
    shippingFeeDisplay.innerText =shippingFee.toFixed(2) + (remainingAmountForFreeDelivery > 0 ? ` - Add $${remainingAmountForFreeDelivery} to Free Delivery` : ' - Free Delivery!');
    const grandTotal = total + shippingFee;
    grandTotalDisplay.innerText = grandTotal.toFixed(2);
    cartBadge.innerText = totalQuantity;

    if (totalQuantity === 0) {
        cartBadge.style.display = 'none';
    } else {
        cartBadge.style.display = 'inline-block';
    }

    // quantity input
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', (event) => {
            const productId = event.target.getAttribute('data-id');
            const colorId = event.target.getAttribute('data-color-id');
            const newQuantity = parseInt(event.target.value);

            if (newQuantity >= 1) {
                updateCartQuantity(productId, colorId, newQuantity);
            } else {
                event.target.value = 1;
            }
        });
    });

    // reduce quality
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            const colorId = event.target.getAttribute('data-color-id');
            decreaseQuantity(productId, colorId);
        });
    });

    cartTotal.innerText = total.toFixed(2);
}

function updateCartQuantity(productId, colorId, newQuantity) {
    const item = cart.find(item => item.id === productId && item.colorId === colorId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

function decreaseQuantity(productId, colorId) {
    const item = cart.find(item => item.id === productId && item.colorId === colorId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(item => !(item.id === productId && item.colorId === colorId));
        }
        saveCart();
        updateCartDisplay();
    }
}

export function addToCart(productId, productName, productPrice, colorId, colorImage, quantity) {
    const existingItem = cart.find(item => item.id === productId && item.colorId === colorId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: quantity,
            colorId: colorId,
            colorImage: colorImage
        });
    }

    saveCart();
    updateCartDisplay();
    document.querySelector('.offcanvas-backdrop')?.remove();
    document.querySelector('.modal-backdrop')?.remove();
}

setCardClickListeners();



document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay(); 
});

document.getElementById('checkout-btn').addEventListener('click', function() {
    window.location.href = 'checkout.html';  
});





