import { fetchDisplayProducts } from './fetch-display-product.js';
import{addToCart} from './cart.js'
// TOP PICK SECTION
export function renderLargeDisplay() {

    fetchDisplayProducts({
        apiUrl: 'http://localhost:1337/api/socks?populate=*&filters[isLargeDisplay][$eq]=true',
        productContainerSelector: '#product-list-large',
        renderProduct: (product,index,imageUrl,badgeHtml)=>{
            if(index === 0) {   
                return `
                    <div class="card product-card" data-product-id="${product.id}">
                    <img src="${imageUrl}" alt="${product.attributes.name}">                  
                    ${badgeHtml}
                    </div>               
                `;             
            }
            return '';
        }})
    }


export function renderSmallDisplay() {
  fetchDisplayProducts({
    apiUrl: 'http://localhost:1337/api/socks?populate=*&filters[isTopPick][$eq]=true',
    productContainerSelector: '#product-list-small',
    renderProduct: (product,index,imageUrl,badgeHtml)=>{
           console.log(index);
            return `
                <div class="card product-card col-lg-6 col-md-6" data-product-id="${product.id}">
                <img src="${imageUrl}" alt="${product.attributes.name}">
                ${badgeHtml}
                </div>
                `
            }
            
        })
    }

// NEW ARRIVALS SECTION
export function renderNewArrivals() {
    fetchDisplayProducts({
        apiUrl: 'http://localhost:1337/api/socks?populate=*&filters[isNew][$eq]=true',
        productContainerSelector: '#new-arrivals-display',
        renderProduct: (product,index,imageUrl,badgeHtml)=>{
            return `
                <div class="card product-card col-md-3 col-lg-3" data-product-id="${product.id}">
                <img src="${imageUrl}" alt="${product.attributes.name}">
                ${badgeHtml}
                </div>
                `
        }
    })
}

export function renderYouMayLike() {
    fetchDisplayProducts({
        apiUrl: 'http://localhost:1337/api/socks?populate=*',
        productContainerSelector: '#you-may-like-display',
        renderProduct: (product, index, imageUrl, badgeHtml) => {
            return `
                <div class="card product-card col-md-3" data-product-id="${product.id}">
                    <img src="${imageUrl}" alt="${product.attributes.name}">
                    ${badgeHtml}
                </div>
            `;
        }
    }).then(data => {
        const products = data.data;  
        const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);
        const productContainer = document.querySelector('#you-may-like-display');
        productContainer.innerHTML = '';       
        randomProducts.forEach((product, index) => {
            const imageUrl = 'http://localhost:1337' + product.attributes.images.data[0].attributes.url;
            const badgeHtml = '';  
            const productHtml = `
                <div class="card product-card  col-md-2" data-product-id="${product.id}">
                    <img src="${imageUrl}" alt="${product.attributes.name}">
                    ${badgeHtml}
                </div>
            `;
            productContainer.innerHTML += productHtml;
        });

        setCardClickListeners(randomProducts);  
    }).catch(error => {
        console.error('Error fetching You May Like products:', error);
    });
}


    

//Category Product Section+search

export function renderCategoryDisplay(page = 1, pageSize = 12) {
    const urlParams = new URLSearchParams(window.location.search);
    const categorySlug = urlParams.get('category');
    const searchQuery = urlParams.get('search');
    const isPack = urlParams.get('isPack');
    const isThick = urlParams.get('isThick');
    const isFunky=urlParams.get('isFunky')
    let apiUrl;

    if (searchQuery) {
        apiUrl = `http://localhost:1337/api/socks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$or][0][name][$containsi]=${encodeURIComponent(searchQuery)}&filters[$or][1][type][$containsi]=${encodeURIComponent(searchQuery)}&filters[$or][2][description][$containsi]=${encodeURIComponent(searchQuery)}`;
    } else if (isPack === 'true') {
        apiUrl = `http://localhost:1337/api/socks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isPack][$eq]=true`;
    } else if (isFunky === 'true') {
        apiUrl = `http://localhost:1337/api/socks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isFunky][$eq]=true`;
    }else if (isThick === 'true') {
        apiUrl = `http://localhost:1337/api/socks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isThick][$eq]=true`;
    } else if (categorySlug === 'all') {
        apiUrl = `http://localhost:1337/api/socks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    } else if (categorySlug) {
        apiUrl = `http://localhost:1337/api/socks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[type][$eq]=${encodeURIComponent(categorySlug)}`;
    } else {
        console.error("No valid search or category provided");
        return;
    }

    console.log("Final API URL", apiUrl);

  
    fetchDisplayProducts({
        apiUrl,
        productContainerSelector: '#category-display',
        renderProduct: (product, index, imageUrl, badgeHtml) => {
            return `  
            <div class="card product-card col-md-3 col-lg-3" data-product-id="${product.id}">
                <img src="${imageUrl}" alt="${product.attributes.name}">
                ${badgeHtml}
            </div>`;
        }
    }).then(data => {
        
        const totalPages = Math.ceil(data.meta.pagination.total / pageSize);
        renderPaginationControls(page, totalPages);
    }).catch(error => {
        console.error('Error handling pagination:', error);
    });
}


function renderPaginationControls(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = '';  

    const paginationWrapper = document.createElement('div');
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.classList.add('btn','btn-custom');  
        prevButton.onclick = () => renderCategoryDisplay(currentPage - 1);
        paginationWrapper.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('btn','btn-custom'); 
        nextButton.onclick = () => renderCategoryDisplay(currentPage + 1);
        paginationWrapper.appendChild(nextButton);
    }

    paginationContainer.appendChild(paginationWrapper);
}



window.handleSearchSubmit=handleSearchSubmit;

//handle search
export function handleSearchSubmit(){
    const searchInput=document.getElementById('search-input').value.trim();
    if(searchInput){
        window.location.href=`/front-end/products.html?search=${encodeURIComponent(searchInput)}`;
        return false;
    }
    return false;
}



//modal card
export function setCardClickListeners(products) {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = card.getAttribute('data-product-id');
            const product = products.find(p => p.id == productId);

            if (product) {
                // Fetch images
                const imagesArray = product.attributes.images.data.map((img, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    return `
                    <div class="carousel-item ${activeClass}">
                        <img src="http://localhost:1337${img.attributes.url}" class="d-block w-100" alt="${product.attributes.name}">
                    </div>`;
                }).join('');
                document.querySelector('#productImageCarousel .carousel-inner').innerHTML = imagesArray;

                // Fetch price and name
                document.getElementById('product-price').innerHTML = `AU: $${product.attributes.Price}`;
                document.getElementById('product-title').innerHTML = `${product.attributes.name}`;

                // Fetch colors
                const colorImagesArray = product.attributes.colors.data.map((colorItem, index) => {
                    const activeClass = index === 0 ? 'selected-color' : '';
                    return `<img src="http://localhost:1337${colorItem.attributes.url}" alt="color-image" class="color-image ${activeClass}" data-color-id="${colorItem.id}">`;
                });
                document.getElementById('product-colors').innerHTML = `${colorImagesArray.join('')}`;
                document.getElementById('quantity-input').value = 1;

                // Fetch description
                const descriptionText = product.attributes.description
                    .map(desc => desc.children.map(child => `<p>${child.text}</p>`).join(''))
                    .join('');
                document.getElementById('product-descriptions').innerHTML = descriptionText;

                // Handle color selection
                document.querySelectorAll('.color-image').forEach(img => {
                    img.addEventListener('click', (e) => {
                        document.querySelectorAll('.color-image').forEach(img => img.classList.remove('selected-color'));
                        e.target.classList.add('selected-color');
                    });
                });

                // Show modal
                const modal = new bootstrap.Modal(document.getElementById('product-modal'));
                modal.show();

                modal._element.addEventListener('shown.bs.modal', function () {
                    const addToCartBtn = document.getElementById('add-to-cart-btn');

                   
                    addToCartBtn.replaceWith(addToCartBtn.cloneNode(true));
                    const newAddToCartBtn = document.getElementById('add-to-cart-btn');

                    newAddToCartBtn.setAttribute('data-id', productId);
                    newAddToCartBtn.setAttribute('data-title', product.attributes.name);
                    newAddToCartBtn.setAttribute('data-price', product.attributes.Price);

                    newAddToCartBtn.addEventListener('click', () => {
                        const productId = newAddToCartBtn.getAttribute('data-id');
                        const productName = newAddToCartBtn.getAttribute('data-title');
                        const productPrice = newAddToCartBtn.getAttribute('data-price');

                      
                        const selectedColor = document.querySelector('.selected-color');
                        if (!selectedColor) {
                            alert('Please select a color.');
                            return;
                        }

                        const selectedColorId = selectedColor.getAttribute('data-color-id');
                        const selectedColorImage = selectedColor.src;
                        const quantity = parseInt(document.getElementById('quantity-input').value);

                       
                        addToCart(productId, productName, productPrice, selectedColorId, selectedColorImage, quantity);

                        const modal = bootstrap.Modal.getInstance(document.getElementById('product-modal'));
                        modal.hide()

                       
                    
                        const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
                        cartOffcanvas.show();
                    });
                });
            }
        });
    });
}

    








