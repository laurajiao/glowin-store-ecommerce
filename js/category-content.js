
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categorySlug = urlParams.get('category');
    const isPack = urlParams.get('isPack');
   

    const titleContainer = document.querySelector('#category-title-area');
   

    let titleHtml = ''; 

    
    if (categorySlug === 'crew') {
        titleHtml = `
            <h1 class="pt-5">Classic Crew Socks</h1>
            <p class="py-3 custom-font">
                Get the perfect balance of comfort and performance. 
                Our crew socks are built for active days, 
                whether you're hitting the gym or the streets.
            </p>
        `;
    } else if (categorySlug === 'no-show') {
        titleHtml = `
            <h1 class="pt-5">No-Show Socks</h1>
            <p class="py-3 custom-font">
                Invisible comfort for every occasion. 
                Perfect for low-cut shoes and a minimalist look.
            </p>
        `;
    } else if (categorySlug === 'ankle') {
        titleHtml = `
            <h1 class="pt-5">Ankle Socks</h1>
            <p class="py-3 custom-font">
                Stay comfortable and stylish with our ankle socks, 
                designed for maximum versatility.
            </p>
        `;
    } else if (categorySlug === 'calf') {
        titleHtml = `
            <h1 class="pt-5">Calf Socks</h1>
            <p class="py-3 custom-font">
                Discover our cozy and stylish calf socks, 
                 designed for ultimate comfort and perfect for elevating your everyday look with a touch of warmth and flair.
                More style is coming soon...
            </p>
          
        `;
    
    }
    else if (isPack === 'true') {
        titleHtml = `
            <h1 class="pt-5">Packs</h1>
            <p class="py-3 custom-font">
               Grab our budget-friendly sock packs, combining comfort and style at an unbeatable value.
            </p>         
        `;   
    }
  
    else if(categorySlug==='shipping'){
        titleHtml = `
     <h1 class="text-center mb-4 custom-font ">Delivery</h1>
       <h5 >Free Shipping</h5>
        <p>We offer <strong>free shipping</strong> on all orders <strong>over $50</strong> within Australia. Simply fill
          your cart, and if your total exceeds $50, the shipping fee will automatically be waived at checkout.</p>
        
        <h5>Flat Rate Shipping</h5>
        <p>For orders under $50, we offer a <strong>flat rate shipping fee of $5</strong> for all destinations within
          Australia.</p>
     
        <h5 >Processing Time</h5>
        <p>All orders are processed and shipped within <strong>3 business days</strong> from the date of your purchase.
          You'll receive a confirmation email with tracking details once shipped.</p>
    
        <h5 >Shipping Carrier</h5>
        <p>We use <strong>Australia Post</strong> for all deliveries within Australia to ensure fast and reliable
          service.</p>
   
        <h5 >International Shipping</h5>
        <p>At this time, we do not offer international shipping, but stay tuned as we expand in the future.</p>
        `;
    }

  else if(categorySlug==='exchange'){
    titleHtml=`
     <h1 class="text-center mb-4 custom-font ">Exchange and Return</h1>
            <h5 >Eligibility for Returns</h5>
            <p>If you're not completely satisfied with your purchase, you may return the item within <strong>30 days</strong> of receiving it, provided the item is unused, unworn, and in its original packaging with all tags attached.</p>
    
            <h5>How to Initiate a Return</h5>
            <p>To initiate a return, please contact our customer service team at info@glowinsocks.com with your order number and reason for the return. We will provide further instructions and a return shipping label, if applicable.</p>
         
            <h5 >Exchanges</h5>
            <p>If you wish to exchange an item for a different size or color, follow the same steps as returns. Once the returned item is received and inspected, we will process your exchange or refund, depending on availability.</p>
       
            <h5 >Refunds</h5>
            <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>
       
            <h5>Return Shipping Costs</h5>
            <p>For defective or incorrect items, return shipping will be free. For other returns, the customer is responsible for covering the return shipping costs.</p>
 
    
    `
  }

  else if(categorySlug === 'privacy'){
    titleHtml = `
        <h1 class="text-center mb-4 custom-font">Privacy Policy</h1>
       
        <h5>Collection of Information</h5>
        <p>We collect personal information that you provide to us when you make a purchase, sign up for our newsletter, or interact with our website. This may include your name, email address, shipping address, and payment details.</p>
     
        <h5>Use of Information</h5>
        <p>We use your information to process and fulfill your orders, send you updates about your order status, and provide customer support. If you opt-in, we may also send you promotional emails regarding new products, special offers, and updates about our store.</p>
    
        <h5>Protection of Information</h5>
        <p>Your privacy is important to us. We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no internet transaction is completely secure, and we cannot guarantee total security.</p>
    
        <h5>Third-Party Services</h5>
        <p>We may share your information with third-party service providers such as payment processors and shipping carriers to fulfill your order. These providers have access to your information only as necessary to perform their services and are required to protect your information.</p>
    
        <h5>Cookies</h5>
        <p>We use cookies to improve your experience on our website by remembering your preferences and repeat visits. You can choose to disable cookies in your browser settings, but this may affect the functionality of the website.</p>
    `;
}

else if (categorySlug==='success'){
    titleHtml=`
    <h3 class="text-center mb-4 custom-font">Thank You for Your Purchase!</h3>
    <p>We appreciate your order and are excited to get your package to you. Your order will be processed and dispatched within 3 days. You will receive a confirmation email within the next 24 hours. Once your package is on its way, we'll notify you with a dispatch email.</p>
    <p>Please note that we do not offer international delivery at this stage,your order will be cancelled and your payment will be refund in 7 days if you have made the payment.</p>
    <p>If you have any questions, feel free to contact our support team.<p>

    <p> Thank you for shopping with us!</p>
    
    
    `
}

    titleContainer.innerHTML = titleHtml;
});
