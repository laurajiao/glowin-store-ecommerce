import { apiRequest } from './api.js';
import { setCardClickListeners } from './product-display.js';


export function fetchDisplayProducts({ apiUrl, productContainerSelector, renderProduct }) {
    return apiRequest(apiUrl)
        .then(data => {
            const products = data.data;
            console.log(data);

           
            const productContainer = document.querySelector(productContainerSelector);

           
            if (!productContainer) {
                console.warn(`No element found with selector: ${productContainerSelector}, skipping rendering.`);
                return; 
            }

            productContainer.innerHTML = '';

            products.forEach((product, index) => {
                const productId = product.id;
                const imageUrl = 'http://localhost:1337' + product.attributes.images.data[0].attributes.url;
                const badgeHtml = getBadgeHtml(product);

              
                const productHtml = renderProduct(product, index, imageUrl, badgeHtml);
                productContainer.innerHTML += productHtml;
            });

            setCardClickListeners(products);
          
            return data;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

//badge
function getBadgeHtml(product) {
    const isNew = product.attributes.isNew;
    const isDiscount = product.attributes.isDiscount;
    const isHot = product.attributes.isHot;
    let badgeHtml = '';

    if (isNew) {
        badgeHtml = '<span class="badge position-absolute top-0 end-0 m-2 bg-primary text-white rounded-0">New</span>';
    } else if (isDiscount) {
        badgeHtml = '<span class="badge position-absolute top-0 end-0 m-2 bg-dark text-white rounded-0">Sale</span>';
    } else if (isHot) {
        badgeHtml = '<span class="badge position-absolute top-0 end-0 m-2 bg-danger text-white rounded-0">Hot</span>';
    }

    return badgeHtml;
}


