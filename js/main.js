
import {renderLargeDisplay,renderSmallDisplay,renderNewArrivals,renderCategoryDisplay,renderYouMayLike} from './product-display.js';

import './nav.js';
import'./modal.js';
import'./cart.js';

import'./product-display.js';


import {modalHTML} from './modal.js'



document.addEventListener("DOMContentLoaded", function() {

document.body.insertAdjacentHTML('beforeend', modalHTML);
 

  renderCategoryDisplay();
  renderLargeDisplay(); 
  renderSmallDisplay();
  renderNewArrivals();
  renderYouMayLike();

 
});






