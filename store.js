// Definir produtos com mais detalhes e categorias
const CATEGORIES = [
    { 
        id: 'all', 
        name: 'Todos os Jogos', 
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
        id: 'cod-mobile', 
        name: 'Call of Duty Mobile', 
        icon: '🔫',
        description: 'CP e Skins para COD Mobile'
    },
    { 
        id: 'lol', 
        name: 'League of Legends', 
        icon: '🎲',
        description: 'Riot Points e Skins'
    },
    { 
        id: 'minecraft', 
        name: 'Minecraft', 
        icon: '🧱',
        description: 'Conteúdo e Mods para Minecraft'
    },
    { 
        id: 'roblox', 
        name: 'Roblox', 
        icon: '🤖',
        description: 'Robux e Itens'
    },
    { 
        id: 'pubg', 
        name: 'PUBG Mobile', 
        icon: '🚙',
        description: 'UC e Skins para PUBG'
    },
    { 
        id: 'rocket-league', 
        name: 'Rocket League', 
        icon: '🚀',
        description: 'Créditos e Itens'
    },
    { 
        id: 'coming-soon', 
        name: '🚧 Em Breve', 
        icon: '⏳',
        description: 'Novas categorias em desenvolvimento'
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

    // Call of Duty Mobile
    {
        id: 3,
        name: 'UC 600 Call of Duty Mobile',
        description: 'UC para Call of Duty Mobile',
        price: 49.99,
        icon: '🔫',
        category: 'cod-mobile'
    },
    {
        id: 4,
        name: 'Skin Épica COD Mobile',
        description: 'Skin de arma exclusiva',
        price: 79.99,
        icon: '🚀',
        category: 'cod-mobile'
    },

    // League of Legends
    {
        id: 5,
        name: 'Skin Lendária LOL',
        description: 'Skin épica para campeão',
        price: 79.99,
        icon: '🎮',
        category: 'lol'
    },
    {
        id: 6,
        name: 'Riot Points 2800',
        description: 'Pacote de Riot Points',
        price: 99.99,
        icon: '💰',
        category: 'lol'
    },

    // Minecraft
    {
        id: 7,
        name: 'Pacote de Mods Minecraft',
        description: 'Coleção de mods exclusivos',
        price: 29.99,
        icon: '🧱',
        category: 'minecraft'
    },
    {
        id: 8,
        name: 'Skin de Personagem Minecraft',
        description: 'Skin personalizada',
        price: 19.99,
        icon: '👤',
        category: 'minecraft'
    },

    // Roblox
    {
        id: 9,
        name: '4500 Robux',
        description: 'Pacote de Robux',
        price: 59.99,
        icon: '🤖',
        category: 'roblox'
    },

    // PUBG Mobile
    {
        id: 10,
        name: 'UC 1500 PUBG Mobile',
        description: 'UC para PUBG Mobile',
        price: 79.99,
        icon: '🚙',
        category: 'pubg'
    },

    // Rocket League
    {
        id: 11,
        name: 'Créditos Rocket League',
        description: 'Pacote de créditos',
        price: 39.99,
        icon: '🚀',
        category: 'rocket-league'
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
