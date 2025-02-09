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
    }

    initEventListeners() {
        // Adicionar evento de limpar carrinho
        if (this.cartSummary.clearCartButton) {
            this.cartSummary.clearCartButton.addEventListener('click', () => this.clearCart());
        }

        // Adicionar evento de finalizar compra
        if (this.cartSummary.checkoutButton) {
            this.cartSummary.checkoutButton.addEventListener('click', () => this.checkout());
        }

        // Delegação de eventos para interações no carrinho
        if (this.cartItemsContainer) {
            this.cartItemsContainer.addEventListener('click', (event) => {
                const target = event.target;
                
                // Botão de aumentar quantidade
                if (target.classList.contains('quantity-btn-increase')) {
                    const itemElement = target.closest('.game-cart-item');
                    const productId = parseInt(itemElement.dataset.productId);
                    this.updateItemQuantity(productId, 1);
                }

                // Botão de diminuir quantidade
                if (target.classList.contains('quantity-btn-decrease')) {
                    const itemElement = target.closest('.game-cart-item');
                    const productId = parseInt(itemElement.dataset.productId);
                    this.updateItemQuantity(productId, -1);
                }

                // Botão de remover item
                if (target.classList.contains('cart-item-remove')) {
                    const itemElement = target.closest('.game-cart-item');
                    const productId = parseInt(itemElement.dataset.productId);
                    this.removeItem(productId);
                }
            });
        }

        // Adicionar evento de abrir carrinho
        const cartOpenButtons = document.querySelectorAll('.open-cart-btn');
        cartOpenButtons.forEach(button => {
            button.addEventListener('click', () => this.openCart());
        });

        // Adicionar evento de fechar carrinho
        const cartCloseButton = document.querySelector('.game-cart-close-btn');
        cartCloseButton.addEventListener('click', () => this.closeCart());
    }

    addItem(product) {
        // Verificar se o produto já está no carrinho
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
            
            // Remover item se quantidade for zero
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

        // Limpar container atual
        this.cartItemsContainer.innerHTML = '';

        // Renderizar novos itens
        this.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('game-cart-item', 'cartoon-style');
            cartItemElement.dataset.productId = item.id;
            
            cartItemElement.innerHTML = `
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
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
                        <span class="remove-text">Remover</span>
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

        // Atualizar contador do botão flutuante
        const floatingCartButton = document.querySelector('.game-floating-cart-button .cart-item-count');
        if (floatingCartButton) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            floatingCartButton.textContent = totalItems;
            
            // Mostrar/esconder contador
            if (totalItems > 0) {
                floatingCartButton.style.display = 'flex';
            } else {
                floatingCartButton.style.display = 'none';
            }
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Seu carrinho está vazio! 🛒');
            return;
        }

        // Lógica de checkout
        const checkoutDetails = this.items.map(item => 
            `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const total = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        alert(`🎉 Compra finalizada!\n\nDetalhes:\n${checkoutDetails}\n\nTotal: R$ ${total.toFixed(2)}`);
        
        // Limpar carrinho após checkout
        this.clearCart();
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

// Inicializar carrinho
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
});
