import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

export const modalHTML = `
<div id="product-modal" class="modal fade" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

        <div class="modal-header d-flex>
         <h5 class="modal-title" id="productModalLabel"></h5>
       
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

            <div class="modal-body">
                <div class="row g-5">
                    
                    <div class="col-md-6">
                        <div id="productImageCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                 
                    <div class="col-md-6 mt-5" id="modal-description">
                   
                        <div class="container" id="product-title"></div>                   
                        <div class="container mt-2 custom-font" id="product-price"></div>                  
                        <div class="container custom-font" id="product-price-gst">GST incl.</div>

                    
                        <div class="container mt-2" id="product-colors-container">
                            <div id="product-colors-title">Select your color & pattern</div>
                            <div id="product-colors"></div>
                        </div>
                    
                        <div class="container quantity-selector mt-2">
                            <label for="quantity-input">Quantity:</label>
                            <input type="number" id="quantity-input" class="quantity-input" value="1" min="1">
                        </div>

                       
                        <div class="container mt-3 custom-font" id="product-descriptions"></div>                  
                        <footer class="card-footer d-flex">
                       <button id="add-to-cart-btn" class="btn payment-btn mt-3 mx-4" >Add to Cart</button>
          
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;




























