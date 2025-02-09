document.addEventListener('DOMContentLoaded', () => {
    // Cart Management
    const cartBtn = document.querySelector('.game-cart-btn');
    const cartSidebar = document.querySelector('.game-cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.game-checkout-btn');

    let cart = [];

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.game-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.game-product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('.product-image').textContent;

            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            // Check if item already in cart
            const existingItem = cart.find(item => item.name === cartItem.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(cartItem);
            }

            updateCart();
        });
    });

    // Update Cart Display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item">❌</button>
                </div>
            `;

            const removeBtn = cartItemElement.querySelector('.remove-item');
            removeBtn.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.name !== item.name);
                updateCart();
            });

            cartItemsContainer.appendChild(cartItemElement);
            total += parseFloat(item.price.replace('R$ ', '').replace(',', '.')) * item.quantity;
        });

        cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        document.querySelector('.cart-count').textContent = cart.length;
    }

    // Toggle Cart Sidebar
    cartBtn.addEventListener('click', () => {
        cartSidebar.style.right = '0';
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.style.right = '-400px';
    });

    // Checkout Functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        alert('Obrigado por sua compra! 🎮');
        cart = [];
        updateCart();
        cartSidebar.style.right = '-400px';
    });

    // Category Filtering
    const categoryItems = document.querySelectorAll('.game-category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const categoryName = item.dataset.category;
            
            // Remove active state from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active state to clicked category
            item.classList.add('active');
            
            // Filter products
            const productCards = document.querySelectorAll('.game-product-card');
            
            productCards.forEach(productCard => {
                const productCategory = productCard.dataset.category;
                
                if (productCategory === categoryName || categoryName === 'all') {
                    productCard.style.display = 'block';
                } else {
                    productCard.style.display = 'none';
                }
            });
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.game-search-bar input');
    const searchButton = document.querySelector('.search-button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const productCards = document.querySelectorAll('.game-product-card');

        productCards.forEach(productCard => {
            const productName = productCard.querySelector('h3').textContent.toLowerCase();
            
            if (productName.includes(searchTerm)) {
                productCard.style.display = 'block';
            } else {
                productCard.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
});
