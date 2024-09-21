 //Slider function for home-page Slider section
 function createSlider(containerId, sliderId, images, links, buttonNames) {
    const container = document.getElementById(containerId);
    const slider = document.createElement('div');
  
    slider.id = sliderId;
    slider.className = 'carousel slide';
    slider.setAttribute('data-bs-ride', 'carousel');
  
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
  
    const inner = document.createElement('div');
    inner.className = 'carousel-inner';
  
    images.forEach((image, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('data-bs-target', `#${sliderId}`);
        button.setAttribute('data-bs-slide-to', index);
        button.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            button.className = 'active';
            button.setAttribute('aria-current', 'true');
        }
        indicators.appendChild(button);
  
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (index === 0) {
            item.classList.add('active');
        }
  
        const link = document.createElement('a');
        link.href = links[index];
        link.style.display = 'block';
  
        const img = document.createElement('img');
        img.src = image;
        img.className = 'd-block w-100';
        img.alt = '';
        
       
        img.style.width = '100%';
        img.style.maxHeight = '60vh'; 
        img.style.objectFit = 'cover';  
  
        link.appendChild(img);
        item.appendChild(link);
        inner.appendChild(item);
    });
  
    slider.style.width = '100%';
    slider.style.height = 'auto'; 
  
    inner.style.height = 'auto'; 
  
    inner.querySelectorAll('.carousel-item').forEach(item => {
        item.style.height = 'auto';  
        item.style.overflow = 'hidden'; 
    });
  
    slider.appendChild(indicators);
    slider.appendChild(inner);
    container.appendChild(slider);
}
const sliderSocksLinks = [
    'products.html?isFunky=true',
    'products.html?isPack=true',
    'products.html?isThick=true'
];

const sliderClothesLinks = [
    'products.html?isPack=true',
    'products.html?isThick=true',
    'products.html?isFunky=true'
];

const sliderAccessoriesLinks = [
    'products.html?isFunky=true',
    'products.html?isThick=true',
    'products.html?isPack=true'
];

// slider
const sliderSocksImages = [
    '/front-end/Img/Slider/slider-funky.png',
    '/front-end/Img/Slider/slider-pack.png',
    '/front-end/Img/Slider/slider-thick.png',
    ,
  ];
  //Replace for clothes items
  const sliderClothesImages = [
   '/front-end/Img/Slider/slider-pack.png',
   '/front-end/Img/Slider/slider-thick.png',
   '/front-end/Img/Slider/slider-funky.png',
  ];
  //Replace for Accessory items
  const sliderAccessoriesImages = [
    '/front-end/Img/Slider/slider-thick.png',
    '/front-end/Img/Slider/slider-funky.png',
   '/front-end/Img/Slider/slider-pack.png',
  
  ];
  



createSlider('slider-container-socks', 'sliderSocks', sliderSocksImages,sliderSocksLinks);
createSlider('slider-container-clothes', 'sliderClothes', sliderClothesImages,sliderClothesLinks );
createSlider('slider-container-accessories', 'sliderAccessories', sliderAccessoriesImages,sliderAccessoriesLinks);


