class CartManager {
    constructor() {
        this.items = [];
        this.cartItemsContainer = document.querySelector('.game-cart-items');
        this.cartSummary = {
            subtotalElement: document.querySelector('.cart-summary-row span:nth-child(2)'),
            discountElement: document.querySelector('.cart-summary-row:nth-child(2) span:nth-child(2)'),
            totalElement: document.querySelector('.cart-summary-row.total span:nth-child(2)'),
            checkoutButton: document.querySelector('.game-checkout-btn'),
            clearCartButton: document.querySelector('.game-clear-cart-btn')
        };

        this.initEventListeners();
        this.createCartAnimationStyles();
    }

    createCartAnimationStyles() {
        const styleTag = document.createElement('style');
        styleTag.textContent = `
            .game-cart-sidebar {
                background-color: #f0f0ff;
                border-left: 5px solid #6a5acd;
                box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            }

            .game-cart-header {
                background-color: #6a5acd;
                color: white;
                border-bottom: 3px solid #4b3d8f;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .game-cart-header h2 {
                margin: 0;
                font-size: 1.5em;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            .game-cart-items {
                max-height: 500px;
                overflow-y: auto;
                padding: 15px;
                background-color: #ffffff;
            }

            .game-cart-item {
                display: flex;
                align-items: center;
                background-color: #f9f9ff;
                border: 2px solid #6a5acd;
                border-radius: 15px;
                margin-bottom: 10px;
                padding: 10px;
                transition: all 0.3s ease;
                box-shadow: 3px 3px 8px rgba(0,0,0,0.1);
            }

            .game-cart-item:hover {
                transform: scale(1.02);
                box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
            }

            .game-cart-item .cart-item-icon {
                font-size: 40px;
                margin-right: 15px;
                background-color: #e6e6fa;
                border-radius: 50%;
                width: 70px;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: inset 2px 2px 5px rgba(0,0,0,0.1);
            }

            .cart-item-details {
                flex-grow: 1;
            }

            .cart-item-details h3 {
                margin: 0 0 5px 0;
                color: #4b3d8f;
                font-size: 1.1em;
            }

            .cart-item-details .description {
                color: #666;
                font-size: 0.9em;
                margin: 0 0 5px 0;
            }

            .cart-item-price-quantity {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .cart-item-quantity {
                display: flex;
                align-items: center;
                background-color: #e6e6fa;
                border-radius: 20px;
                overflow: hidden;
            }

            .cart-item-quantity button {
                background-color: #6a5acd;
                color: white;
                border: none;
                width: 30px;
                height: 30px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .cart-item-quantity button:hover {
                background-color: #4b3d8f;
            }

            .cart-item-quantity .quantity {
                padding: 0 10px;
                font-weight: bold;
                color: #4b3d8f;
            }

            .cart-item-remove-container {
                display: flex;
                align-items: center;
            }

            .cart-item-remove {
                background-color: #ff6b6b;
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .cart-item-remove:hover {
                background-color: #ff4757;
                transform: scale(1.1) rotate(5deg);
            }

            .game-cart-summary {
                background-color: #f0f0ff;
                padding: 15px;
                border-top: 3px solid #6a5acd;
            }

            .cart-summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                color: #4b3d8f;
            }

            .cart-summary-row.total {
                font-weight: bold;
                border-top: 2px solid #6a5acd;
                padding-top: 10px;
            }

            .game-checkout-btn {
                width: 100%;
                background-color: #6a5acd;
                color: white;
                border: none;
                padding: 15px;
                border-radius: 25px;
                font-weight: bold;
                text-transform: uppercase;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }

            .game-checkout-btn:hover {
                background-color: #4b3d8f;
                transform: translateY(-3px);
                box-shadow: 0 6px 8px rgba(0,0,0,0.2);
            }

            .game-clear-cart-btn {
                background-color: #ff6b6b;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 20px;
                transition: all 0.3s ease;
            }

            .game-clear-cart-btn:hover {
                background-color: #ff4757;
                transform: scale(1.05);
            }

            .game-cart-item.removing {
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.5s ease;
            }
        `;
        document.head.appendChild(styleTag);
    }

    initEventListeners() {
        if (this.cartSummary.clearCartButton) {
            this.cartSummary.clearCartButton.addEventListener('click', () => this.clearCart());
        }

        if (this.cartSummary.checkoutButton) {
            this.cartSummary.checkoutButton.addEventListener('click', () => this.checkout());
        }

        if (this.cartItemsContainer) {
            this.cartItemsContainer.addEventListener('click', (event) => {
                const target = event.target;
                
                if (target.classList.contains('quantity-btn-increase')) {
                    const itemElement = target.closest('.game-cart-item');
                    const productId = parseInt(itemElement.dataset.productId);
                    this.updateItemQuantity(productId, 1);
                }

                if (target.classList.contains('quantity-btn-decrease')) {
                    const itemElement = target.closest('.game-cart-item');
                    const productId = parseInt(itemElement.dataset.productId);
                    this.updateItemQuantity(productId, -1);
                }

                if (target.classList.contains('cart-item-remove')) {
                    const itemElement = target.closest('.game-cart-item');
                    const productId = parseInt(itemElement.dataset.productId);
                    this.removeItem(productId);
                }
            });
        }

        const cartOpenButtons = document.querySelectorAll('.open-cart-btn');
        cartOpenButtons.forEach(button => {
            button.addEventListener('click', () => this.openCart());
        });

        const cartCloseButton = document.querySelector('.game-cart-close-btn');
        cartCloseButton.addEventListener('click', () => this.closeCart());
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.renderCart();
        this.updateCartSummary();
        this.openCart();
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1);
            this.renderCart();
            this.updateCartSummary();
        }
    }

    updateItemQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.renderCart();
                this.updateCartSummary();
            }
        }
    }

    clearCart() {
        if (this.cartItemsContainer) {
            const items = this.cartItemsContainer.querySelectorAll('.game-cart-item');
            items.forEach(item => {
                item.classList.add('removing');
            });

            setTimeout(() => {
                this.items = [];
                this.renderCart();
                this.updateCartSummary();
            }, 500);
        }
    }

    renderCart() {
        if (!this.cartItemsContainer) return;

        this.cartItemsContainer.innerHTML = '';

        this.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('game-cart-item', 'cartoon-style');
            cartItemElement.dataset.productId = item.id;
            
            cartItemElement.innerHTML = `
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <div class="cart-item-price-quantity">
                        <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn quantity-btn-decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn quantity-btn-increase">+</button>
                        </div>
                    </div>
                </div>
                <div class="cart-item-remove-container">
                    <button class="cart-item-remove" title="Remover produto">
                        <span class="remove-icon">🗑️</span>
                    </button>
                </div>
            `;

            this.cartItemsContainer.appendChild(cartItemElement);
        });
    }

    updateCartSummary() {
        const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discount = 10.00;
        const total = subtotal - discount;

        if (this.cartSummary.subtotalElement) {
            this.cartSummary.subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        }

        if (this.cartSummary.discountElement) {
            this.cartSummary.discountElement.textContent = `-R$ ${discount.toFixed(2)}`;
        }

        if (this.cartSummary.totalElement) {
            this.cartSummary.totalElement.textContent = `R$ ${total.toFixed(2)}`;
        }

        const floatingCartButton = document.querySelector('.game-floating-cart-button .cart-item-count');
        if (floatingCartButton) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            floatingCartButton.textContent = totalItems;
            
            if (totalItems > 0) {
                floatingCartButton.style.display = 'flex';
            } else {
                floatingCartButton.style.display = 'none';
            }
        }
    }

    checkout() {
        if (this.items.length === 0) {
            this.showCartoonAlert('🛒 Seu carrinho está vazio!', '😢 Adicione alguns itens antes de finalizar.');
            return;
        }

        const checkoutDetails = this.items.map(item => 
            `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const total = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        this.showCartoonAlert('🎉 Compra Finalizada!', 
            `Detalhes:\n${checkoutDetails}\n\nTotal: R$ ${total.toFixed(2)}`);
        
        this.clearCart();
    }

    showCartoonAlert(title, message) {
        const alertContainer = document.createElement('div');
        alertContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #f0f0ff;
            border: 5px solid #6a5acd;
            border-radius: 20px;
            padding: 20px;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 90%;
            width: 300px;
        `;

        alertContainer.innerHTML = `
            <h2 style="color: #6a5acd; margin-bottom: 15px;">${title}</h2>
            <p style="white-space: pre-line; color: #4b3d8f;">${message}</p>
            <button style="
                background-color: #6a5acd;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                margin-top: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Entendi!</button>
        `;

        const closeButton = alertContainer.querySelector('button');
        closeButton.addEventListener('click', () => {
            alertContainer.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => document.body.removeChild(alertContainer), 300);
        });

        const styleTag = document.createElement('style');
        styleTag.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(styleTag);

        document.body.appendChild(alertContainer);
    }

    openCart() {
        const cartSidebar = document.querySelector('.game-cart-sidebar');
        if (cartSidebar) {
            cartSidebar.style.right = '0';
        }
    }

    closeCart() {
        const cartSidebar = document.querySelector('.game-cart-sidebar');
        if (cartSidebar) {
            cartSidebar.style.right = '-400px';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
});
