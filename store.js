// Definir produtos com mais detalhes e categorias
const CATEGORIES = [
    { 
        id: 'all', 
        name: 'Todos os Produtos', 
        icon: '🌐',
        description: 'Todos os produtos disponíveis'
    },
    { 
        id: 'free-fire', 
        name: 'Free Fire', 
        icon: '💥',
        description: 'Diamantes e Passes de Batalha'
    },
    { 
        id: 'roblox', 
        name: 'Roblox', 
        icon: '🤖',
        description: 'Robux e Itens'
    },
    { 
        id: 'anime-fighters', 
        name: 'Anime Fighters', 
        icon: '⚔️',
        description: 'Itens e Moedas para Anime Fighters'
    },
    { 
        id: 'assinaturas', 
        name: 'Assinaturas', 
        icon: '📺',
        description: 'Planos de Streaming e Serviços'
    }
];

const PRODUCTS = [
    // Free Fire
    {
        id: 1,
        name: 'Pacote 500 Diamantes Free Fire',
        description: 'Diamantes para Free Fire',
        price: 29.99,
        icon: '💎',
        category: 'free-fire'
    },
    {
        id: 2,
        name: 'Passe de Batalha Free Fire',
        description: 'Passe de Batalha mensal',
        price: 49.99,
        icon: '🏆',
        category: 'free-fire'
    },

    // Roblox
    {
        id: 3,
        name: '4500 Robux',
        description: 'Pacote de Robux',
        price: 59.99,
        icon: '🤖',
        category: 'roblox'
    },
    {
        id: 4,
        name: '10000 Robux',
        description: 'Pacote Premium de Robux',
        price: 99.99,
        icon: '💰',
        category: 'roblox'
    },

    // Anime Fighters
    {
        id: 5,
        name: 'Pacote 5000 Moedas',
        description: 'Moedas para Anime Fighters',
        price: 39.99,
        icon: '⚔️',
        category: 'anime-fighters'
    },
    {
        id: 6,
        name: 'Skin Lendária',
        description: 'Skin exclusiva de personagem',
        price: 79.99,
        icon: '✨',
        category: 'anime-fighters'
    },

    // Assinaturas
    {
        id: 7,
        name: 'Netflix Básico',
        description: 'Plano Básico 1 Mês',
        price: 24.99,
        icon: '🎬',
        category: 'assinaturas'
    },
    {
        id: 8,
        name: 'Netflix Premium',
        description: 'Plano Premium 1 Mês',
        price: 49.99,
        icon: '🌟',
        category: 'assinaturas'
    },
    {
        id: 9,
        name: 'Amazon Prime',
        description: 'Assinatura Amazon Prime 1 Mês',
        price: 14.99,
        icon: '📦',
        category: 'assinaturas'
    }
];

function renderCategories() {
    const categoryCarousel = document.querySelector('.game-category-carousel');
    if (!categoryCarousel) return;

    categoryCarousel.innerHTML = ''; // Limpar categorias existentes

    CATEGORIES.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('game-category-item', 'cartoon-style');
        categoryItem.dataset.category = category.id;

        categoryItem.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <div class="category-details">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            </div>
        `;

        categoryItem.addEventListener('click', () => {
            // Remover seleção de outras categorias
            document.querySelectorAll('.game-category-item').forEach(item => {
                item.classList.remove('selected');
            });

            // Adicionar seleção na categoria atual
            categoryItem.classList.add('selected');

            // Renderizar produtos da categoria
            renderProducts(category.id);
        });

        categoryCarousel.appendChild(categoryItem);
    });

    // Selecionar categoria padrão
    const defaultCategory = categoryCarousel.querySelector('[data-category="all"]');
    if (defaultCategory) {
        defaultCategory.classList.add('selected');
    }
}

function renderProducts(category = 'all') {
    const productGrid = document.querySelector('.game-product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = ''; // Limpar produtos existentes

    const filteredProducts = category === 'all' 
        ? PRODUCTS 
        : PRODUCTS.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        // Mensagem para categorias sem produtos
        const noProductsMessage = document.createElement('div');
        noProductsMessage.classList.add('no-products-message');
        noProductsMessage.innerHTML = `
            <div class="empty-category-icon">🕹️</div>
            <h3>Ops! Nenhum produto encontrado</h3>
            <p>Esta categoria ainda não possui produtos. Volte em breve!</p>
        `;
        productGrid.appendChild(noProductsMessage);
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('game-product-card', 'cartoon-style');
        productCard.dataset.category = product.category;
        productCard.dataset.productId = product.id;

        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <h3>${product.name}</h3>
            <div class="product-details">
                <p class="description">${product.description}</p>
                <p class="price">R$ ${product.price.toFixed(2)}</p>
                <button class="game-add-to-cart">Adicionar ao Carrinho</button>
            </div>
        `;

        // Adicionar evento de adicionar ao carrinho
        const addToCartButton = productCard.querySelector('.game-add-to-cart');
        addToCartButton.addEventListener('click', () => {
            window.cartManager.addItem(product);
        });

        productGrid.appendChild(productCard);
    });
}

// Inicializar a loja
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();
});
