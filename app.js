// Global Marketplace - Main Application JavaScript

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Application State
const AppState = {
    currentView: 'customer',
    products: [],
    cart: [],
    transactions: [],
    walletBalance: 0,
    referralCommission: 0.05, // 5% commission
    ownerName: 'Olawale Abdul',
    platformName: 'Global Marketplace',
    referralName: 'Adegan Global',
    bankDetails: {
        bankName: 'Global Pilgrim Bank',
        accountNumber: '1234567890'
    }
};

// Initialize App
function initializeApp() {
    loadFromStorage();
    initializeProducts();
    updateSignalIndicator();
    startAutoSync();
    setupEventListeners();
    renderCurrentView();
    updateCartDisplay();
    
    // Add initial terminal log
    addTerminalLog('🚀 Global Marketplace System Initialized', 'success');
    addTerminalLog('👤 Owner: Olawale Abdul', 'info');
    addTerminalLog('🌐 Connected to e-commerce networks', 'info');
    addTerminalLog('💳 Payment Gateway API: Active', 'success');
    addTerminalLog('🔒 VPN Connection: Secure', 'success');
}

// Load Data from Local Storage
function loadFromStorage() {
    const savedData = localStorage.getItem('globalMarketplaceData');
    if (savedData) {
        const data = JSON.parse(savedData);
        AppState.walletBalance = data.walletBalance || 0;
        AppState.transactions = data.transactions || [];
        AppState.cart = data.cart || [];
    }
}

// Save Data to Local Storage
function saveToStorage() {
    const data = {
        walletBalance: AppState.walletBalance,
        transactions: AppState.transactions,
        cart: AppState.cart
    };
    localStorage.setItem('globalMarketplaceData', JSON.stringify(data));
}

// Initialize Products (Simulated sync from e-commerce sites)
function initializeProducts() {
    const sources = ['Amazon', 'eBay', 'Alibaba', 'Walmart', 'Best Buy', 'Target', 'AliExpress', 'Etsy', 'Newegg', 'Overstock'];
    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Beauty', 'Automotive'];
    const productNames = [
        'Wireless Bluetooth Headphones', 'Smart Watch Series 5', '4K Ultra HD TV', 'Laptop Computer', 'Smartphone Pro',
        'Running Shoes', 'Designer T-Shirt', 'Winter Jacket', 'Casual Sneakers', 'Formal Dress',
        'Coffee Maker', 'Air Fryer', 'Vacuum Cleaner', 'Smart Home Speaker', 'LED Desk Lamp',
        'Yoga Mat', 'Dumbbell Set', 'Tennis Racket', 'Basketball', 'Football',
        'Bestseller Novel', 'Cookbook Collection', 'Science Textbook', 'Art History Book', 'Business Guide',
        'Building Blocks Set', 'Remote Control Car', 'Board Game', 'Puzzle Collection', 'Action Figure',
        'Skincare Set', 'Makeup Kit', 'Hair Dryer', 'Electric Toothbrush', 'Perfume Collection',
        'Car Phone Mount', 'LED Headlights', 'Car Cover', 'Floor Mats', 'Emergency Kit'
    ];
    
    for (let i = 0; i < 50; i++) {
        const source = sources[Math.floor(Math.random() * sources.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const price = (Math.random() * 500 + 10).toFixed(2);
        const productName = productNames[Math.floor(Math.random() * productNames.length)];
        
        AppState.products.push({
            id: i + 1,
            name: productName,
            price: parseFloat(price),
            source: source,
            category: category,
            description: `Premium ${productName} from ${source}. High-quality ${category.toLowerCase()} product with excellent customer reviews and fast shipping available.`,
            image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(productName)}`,
            rating: (Math.random() * 2 + 3).toFixed(1),
            reviews: Math.floor(Math.random() * 500) + 10
        });
    }
}

// Update Signal Indicator
function updateSignalIndicator() {
    const signalBars = document.querySelectorAll('.signal-bar');
    signalBars.forEach(bar => {
        const strength = Math.random();
        bar.style.opacity = strength > 0.3 ? 1 : 0.5;
    });
}

// Start Auto Sync (Simulated)
function startAutoSync() {
    setInterval(() => {
        syncProducts();
        updateSignalIndicator();
    }, 30000); // Sync every 30 seconds
}

// Sync Products from E-commerce Sites
function syncProducts() {
    addTerminalLog('🔄 Syncing products from e-commerce platforms...', 'info');
    
    const sources = ['Amazon', 'eBay', 'Alibaba', 'Walmart', 'Best Buy', 'Target', 'AliExpress', 'Etsy', 'Newegg', 'Overstock'];
    
    sources.forEach((source, index) => {
        setTimeout(() => {
            addTerminalLog(`✅ Connected to ${source} API - Syncing products...`, 'success');
        }, index * 300);
    });
    
    setTimeout(() => {
        addTerminalLog('📦 Product sync completed. 50+ products updated from global sources.', 'success');
        addTerminalLog(`🌍 Active connections: ${sources.length} e-commerce platforms`, 'info');
    }, sources.length * 300 + 500);
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('data-view');
            switchView(view);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // Source filter
    const sourceFilter = document.getElementById('sourceFilter');
    if (sourceFilter) {
        sourceFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
}

// Switch View
function switchView(view) {
    AppState.currentView = view;
    renderCurrentView();
}

// Render Current View
function renderCurrentView() {
    const customerView = document.getElementById('customerView');
    const adminView = document.getElementById('adminView');
    
    if (AppState.currentView === 'customer') {
        customerView.style.display = 'block';
        adminView.style.display = 'none';
        renderProducts();
    } else {
        customerView.style.display = 'none';
        adminView.style.display = 'block';
        renderAdminDashboard();
    }
}

// Render Products
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    AppState.products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Show product count
    const productCount = document.createElement('div');
    productCount.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 1rem; color: #6b7280;';
    productCount.innerHTML = `<strong>${AppState.products.length}</strong> products available from <strong>${[...new Set(AppState.products.map(p => p.source))].length}</strong> stores`;
    productGrid.appendChild(productCount);
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <span class="product-source">${product.source}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span>⭐ ${product.rating} (${product.reviews} reviews)</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="addToCart(${product.id})">
                🛒 Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Filter Products
function filterProducts(searchTerm) {
    const filtered = AppState.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Apply All Filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sourceFilter = document.getElementById('sourceFilter').value;
    
    const filtered = AppState.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.category.toLowerCase().includes(searchTerm) ||
                             product.source.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesSource = !sourceFilter || product.source === sourceFilter;
        
        return matchesSearch && matchesCategory && matchesSource;
    });
    
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        productGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #6b7280;"><h3>No products found</h3><p>Try adjusting your filters or search terms</p></div>';
    } else {
        filtered.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        // Show filtered product count
        const productCount = document.createElement('div');
        productCount.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 1rem; color: #6b7280;';
        productCount.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${AppState.products.length}</strong> products`;
        productGrid.appendChild(productCount);
    }
}

// Add to Cart
function addToCart(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (product) {
        const existingItem = AppState.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            AppState.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        saveToStorage();
        updateCartDisplay();
        showNotification('Product added to cart!', 'success');
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartItems = document.getElementById('cartItems');
    
    if (cartCount) {
        const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    if (cartTotal) {
        const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Update cart items display
    if (cartItems) {
        if (AppState.cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = '';
            AppState.cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #e5e7eb;';
                cartItem.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>${item.source}</small>
                    </div>
                    <div style="text-align: right;">
                        <div>$${(item.price * item.quantity).toFixed(2)}</div>
                        <small>Qty: ${item.quantity}</small>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }
}

// Process Payment
function processPayment() {
    if (AppState.cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const commission = total * AppState.referralCommission;
    
    // Add commission to wallet
    AppState.walletBalance += commission;
    
    // Create transaction record
    const transaction = {
        id: Date.now(),
        type: 'sale',
        amount: total,
        commission: commission,
        items: [...AppState.cart],
        customer: 'Customer',
        referral: AppState.referralName,
        date: new Date().toISOString(),
        status: 'completed',
        paymentMethod: 'Payment Gateway API',
        vpnStatus: 'Secure'
    };
    
    AppState.transactions.unshift(transaction);
    
    // Clear cart
    AppState.cart = [];
    saveToStorage();
    updateCartDisplay();
    
    // Log to terminal
    addTerminalLog(`💰 NEW SALE: $${total.toFixed(2)}`, 'success');
    addTerminalLog(`💵 Commission Earned: $${commission.toFixed(2)}`, 'success');
    addTerminalLog(`👤 Referral: ${AppState.referralName}`, 'info');
    addTerminalLog(`💳 Payment processed via Payment Gateway API`, 'info');
    addTerminalLog(`🔒 VPN Transaction: Secure & Encrypted`, 'success');
    addTerminalLog(`📦 Items purchased: ${transaction.items.length}`, 'info');
    
    showNotification(`Payment successful! Commission earned: $${commission.toFixed(2)}`, 'success');
    
    // Close modal
    document.getElementById('cartModal').classList.remove('active');
}

// Render Admin Dashboard
function renderAdminDashboard() {
    updateDashboardStats();
    renderTransactions();
    renderTerminal();
    
    // Update available balance in withdrawal modal
    const availableBalance = document.getElementById('availableBalance');
    if (availableBalance) {
        availableBalance.value = `$${AppState.walletBalance.toFixed(2)}`;
    }
}

// Update Dashboard Stats
function updateDashboardStats() {
    const totalSales = AppState.transactions
        .filter(t => t.type === 'sale')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalCommission = AppState.transactions
        .filter(t => t.type === 'sale')
        .reduce((sum, t) => sum + t.commission, 0);
    
    const totalWithdrawals = AppState.transactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0);
    
    document.getElementById('walletBalance').textContent = `$${AppState.walletBalance.toFixed(2)}`;
    document.getElementById('totalSales').textContent = `$${totalSales.toFixed(2)}`;
    document.getElementById('totalCommission').textContent = `$${totalCommission.toFixed(2)}`;
    document.getElementById('totalWithdrawals').textContent = `$${totalWithdrawals.toFixed(2)}`;
}

// Render Transactions
function renderTransactions(filter = 'all') {
    const transactionsBody = document.getElementById('transactionsBody');
    if (!transactionsBody) return;
    
    transactionsBody.innerHTML = '';
    
    let filteredTransactions = AppState.transactions;
    
    if (filter !== 'all') {
        filteredTransactions = AppState.transactions.filter(t => t.type === filter);
    }
    
    filteredTransactions.slice(0, 20).forEach(transaction => {
        const row = document.createElement('tr');
        
        let details = transaction.referral || '-';
        if (transaction.type === 'withdrawal') {
            details = `${transaction.accountName} (${transaction.bankName})`;
        }
        
        row.innerHTML = `
            <td>${new Date(transaction.date).toLocaleString()}</td>
            <td><span class="badge badge-${transaction.type === 'sale' ? 'success' : 'danger'}">${transaction.type.toUpperCase()}</span></td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${details}</td>
            <td><span class="badge badge-${transaction.status === 'completed' ? 'success' : 'warning'}">${transaction.status}</span></td>
        `;
        transactionsBody.appendChild(row);
    });
}

// Filter Transactions
function filterTransactions(filter) {
    renderTransactions(filter);
}

// Render Terminal
function renderTerminal() {
    const terminalContent = document.getElementById('terminalContent');
    if (!terminalContent) return;
    
    terminalContent.innerHTML = '';
    
    AppState.transactions.slice(0, 10).forEach(transaction => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `
            <span class="terminal-timestamp">[${new Date(transaction.date).toLocaleString()}]</span>
            ${transaction.type.toUpperCase()}: $${transaction.amount.toFixed(2)} - ${transaction.referral || 'System'}
        `;
        terminalContent.appendChild(line);
    });
}

// Add Terminal Log
function addTerminalLog(message, type = 'info') {
    const terminalContent = document.getElementById('terminalContent');
    if (!terminalContent) return;
    
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const timestamp = new Date().toLocaleString();
    const color = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#00ff00';
    
    line.innerHTML = `
        <span class="terminal-timestamp">[${timestamp}]</span>
        <span style="color: ${color}">${message}</span>
    `;
    
    terminalContent.insertBefore(line, terminalContent.firstChild);
}

// Process Withdrawal
function processWithdrawal() {
    const amount = parseFloat(document.getElementById('withdrawalAmount').value);
    const accountNumber = document.getElementById('accountNumber').value;
    const accountName = document.getElementById('accountName').value;
    
    if (!amount || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (amount > AppState.walletBalance) {
        showNotification('Insufficient balance', 'error');
        return;
    }
    
    if (!accountNumber || accountNumber.length !== 10) {
        showNotification('Please enter a valid 10-digit account number', 'error');
        return;
    }
    
    if (!accountName) {
        showNotification('Please enter account name', 'error');
        return;
    }
    
    // Process withdrawal
    AppState.walletBalance -= amount;
    
    const transaction = {
        id: Date.now(),
        type: 'withdrawal',
        amount: amount,
        bankName: AppState.bankDetails.bankName,
        accountNumber: accountNumber,
        accountName: accountName,
        companyName: 'Global Marketplace',
        senderName: 'Olawale Abdul',
        date: new Date().toISOString(),
        status: 'completed',
        paymentGateway: 'API Transfer',
        vpnStatus: 'Secure'
    };
    
    AppState.transactions.unshift(transaction);
    saveToStorage();
    
    // Log to terminal
    addTerminalLog(`💸 WITHDRAWAL INITIATED: $${amount.toFixed(2)}`, 'success');
    addTerminalLog(`🏦 Transfer to: ${AppState.bankDetails.bankName}`, 'info');
    addTerminalLog(`👤 Account Name: ${accountName}`, 'info');
    addTerminalLog(`🔢 Account Number: ****${accountNumber.slice(-4)}`, 'info');
    addTerminalLog(`🏢 Sender: ${transaction.senderName}`, 'info');
    addTerminalLog(`📅 Date: ${new Date().toLocaleString()}`, 'info');
    addTerminalLog(`💳 Payment Gateway: API Transfer Complete`, 'success');
    addTerminalLog(`🔒 VPN Transfer: Secure & Encrypted`, 'success');
    
    showNotification(`Withdrawal of $${amount.toFixed(2)} processed successfully!`, 'success');
    
    // Update dashboard
    updateDashboardStats();
    
    // Close modal
    document.getElementById('withdrawalModal').classList.remove('active');
    
    // Clear form
    document.getElementById('withdrawalAmount').value = '';
    document.getElementById('accountNumber').value = '';
    document.getElementById('accountName').value = '';
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#2563eb'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Clear All Data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This will reset wallet balance, transactions, and cart.')) {
        localStorage.removeItem('globalMarketplaceData');
        AppState.walletBalance = 0;
        AppState.transactions = [];
        AppState.cart = [];
        
        addTerminalLog('🗑️ All data cleared successfully', 'warning');
        addTerminalLog('💰 Wallet balance reset to $0.00', 'info');
        addTerminalLog('📋 Transaction history cleared', 'info');
        
        updateDashboardStats();
        updateCartDisplay();
        renderTransactions();
        renderTerminal();
        
        showNotification('All data cleared successfully!', 'success');
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    
    // Update available balance in withdrawal modal
    if (modalId === 'withdrawalModal') {
        const availableBalance = document.getElementById('availableBalance');
        if (availableBalance) {
            availableBalance.value = `$${AppState.walletBalance.toFixed(2)}`;
        }
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);