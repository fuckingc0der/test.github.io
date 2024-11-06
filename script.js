const notification = document.getElementById('notification');
const themeToggle = document.getElementById('theme-toggle');
const catalog = document.getElementById('catalog');
const favoritesSection = document.getElementById('favorites');
const cartSection = document.getElementById('cart');
const favoritesContent = document.getElementById('favorites-content');
const cartContent = document.getElementById('cart-content');

let favoriteProducts = [];
let cartProducts = [];
let products = [];  // Объявляем products как глобальную переменную

// Инициализация темы
function initializeTheme() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
}

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Показ уведомлений
function showNotification(message) {
    notification.innerText = message;
    notification.style.opacity = 1;
    notification.style.top = "20px";
    setTimeout(() => {
        notification.style.opacity = 0;
        notification.style.top = "-50px";
    }, 1000);
}

// Загрузка товаров
function loadProducts() {
    products = [  // Теперь products глобальная, и мы можем использовать её в других функциях
        { id: 1, name: 'Самолет', description: 'Мощный и быстрый самолет для ваших дальних путешествий.', image: 'avia.png' },
        { id: 2, name: 'Машина', description: 'Удобный и экономичный автомобиль для повседневных поездок.', image: 'car.png' },
        { id: 3, name: 'Яхта', description: 'Роскошная яхта для отдыха и морских путешествий.', image: 'yacht.png' },
        { id: 4, name: 'Спрей от комаров', description: 'Эффективная защита от комаров на природе.', image: 'spray.png' },
        { id: 5, name: 'Щука (рыба)', description: 'Свежая и крупная щука для приготовления вкусных блюд.', image: 'pike.png' }
    ];
    
    catalog.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}<br>${product.description}</p>
            <div class="product-buttons">
                <img src="fav.png" alt="Добавить в избранное" onclick="addToFavorites(${product.id})">
                <img src="cart.png" alt="Добавить в корзину" onclick="addToCart(${product.id})">
            </div>
        `;
        catalog.appendChild(productDiv);
    });
}

// Показ разделов
function showCatalog() {
    catalog.classList.remove('hidden');
    favoritesSection.classList.add('hidden');
    cartSection.classList.add('hidden');
}

function showFavorites() {
    favoritesSection.classList.remove('hidden');
    catalog.classList.add('hidden');
    cartSection.classList.add('hidden');
    favoritesContent.innerHTML = favoriteProducts.length > 0 ? favoriteProducts.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}<br>${product.description}</p>
        </div>
    `).join('') : '<p>Здесь будут отображаться избранные товары</p>';
}

function showCart() {
    cartSection.classList.remove('hidden');
    catalog.classList.add('hidden');
    favoritesSection.classList.add('hidden');
    cartContent.innerHTML = cartProducts.length > 0 ? cartProducts.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}<br>${product.description}</p>
        </div>
    `).join('') : '<p>Здесь будут отображаться товары в корзине</p>';
}

// Добавление товара в избранное
function addToFavorites(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !favoriteProducts.includes(product)) {
        favoriteProducts.push(product);
        showNotification("Товар добавлен в избранное");
    }
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !cartProducts.includes(product)) {
        cartProducts.push(product);
        showNotification("Товар добавлен в корзину");
    }
}

// Очистка избранного
function clearFavorites() {
    favoriteProducts = []; // Очищаем массив избранных товаров
    favoritesContent.innerHTML = '';
    showNotification("Избранное очищено");
}

// Очистка корзины
function clearCart() {
    cartProducts = []; // Очищаем массив товаров в корзине
    cartContent.innerHTML = '';
    showNotification("Корзина очищена");
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadProducts();
});
