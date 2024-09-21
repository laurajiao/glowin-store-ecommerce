//use local storage for cart 
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

}


function displayCheckout() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const shippingFeeDisplay = document.getElementById('shipping-fee'); 
    const grandTotalDisplay = document.getElementById('grand-total');   
    let total = 0;

    checkoutItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item container';
            itemElement.innerHTML = `
               <div class="d-flex justify-content-between align-items-center py-3" style="border-bottom: 1px solid #ccc;">
               <div class="d-flex align-items-center w-75">
                <img src="${item.colorImage}" alt="Color Image" style="width: 50px; margin-right: 10px;">
                <p class="m-0 ">${item.name}</p>
            </div>
       
            <div class="d-flex align-items-center">
             <p class="pe-5"">${item.quantity}</p>
             
                <p class="ps-5">$${item.price.toFixed(2)}</p>
            </div>
        </div>
               
            `;
            checkoutItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        
        let shippingFee = total >= 50 ? 0 : 5;
        const remainingAmountForFreeDelivery = total >= 50 ? 0 : (50 - total).toFixed(2);
        shippingFeeDisplay.innerText =shippingFee.toFixed(2) + (remainingAmountForFreeDelivery > 0 ? ` - Add $${remainingAmountForFreeDelivery} to Free Delivery` : ' - Free Delivery!');
        const grandTotal = total + shippingFee;
        grandTotalDisplay.innerText = grandTotal.toFixed(2);
      
   
        checkoutTotal.innerText = `$${total.toFixed(2)}`;
       
    }
}

// Sent order to strapi and then to paypal
function createOrderInBackend() {
    const totalAmount = calculateTotal(cart).toFixed(2);  

    if (cart.length === 0) {
        alert('Your cart is empty.');
        return Promise.reject('Cart is empty.');
    }

    console.log({
      cartItems: cart,  
      totalAmount: parseFloat(totalAmount),  
      currency: 'AUD'
  });

    
    return fetch('http://localhost:1337/api/orders/create', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cartItems: cart,
            totalAmount: parseFloat(totalAmount),
            currency:'AUD'
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }).then(data => {
        console.log('Order created in backend:', data.id);
        return data.id;  // return an order Id t
    });
}

// Pass order id to front-end for payment
function initPayPalButton(orderId) {
    paypal.Buttons({
        createOrder: function() {
          console.log('Creating order with ID:', orderId)
            return orderId;  
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Payment successful, thank you ' + details.payer.name.given_name + '!');
                
                localStorage.removeItem('cart');
                
                window.location.href = 'information.html?category=success';
            });
        },
        onError: function(err) {
            console.error('Error:', err);
            alert('Payment failed, please try again.');
        }
    }).render('#paypal-button-container');
}

// order will be sent once load the checkout page
document.addEventListener('DOMContentLoaded', () => {
    displayCheckout();
    createOrderInBackend()
        .then(orderId => {
            
            initPayPalButton(orderId);
        })
        .catch(err => {
            console.error('Error creating order:', err);
            alert('Error creating order, please try again.');
        });
});
























