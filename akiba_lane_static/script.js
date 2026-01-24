// DATA
const categories = [
    { id: "individual", title: "Action Figures", icon: "sparkles", color: "border-pink", desc: "Premium individual pieces" },
    { id: "set", title: "Anime Sets", icon: "layers", color: "border-cyan", desc: "Complete collections" },
    { id: "myst_box", title: "Mystery Box", icon: "box", color: "border-purple", desc: "Surprise Crates" },
    { id: "hp", title: "Harry Potter", icon: "wand-2", color: "border-yellow", desc: "Wizarding World gear" }
];

const products = [
    { id: "ind-1", name: "Aanya", price: 480, currency: "Rs.", category: "individual", image: "images/individual/Aanya Rs.480 .jpg", rarity: "R" },
    { id: "ind-2", name: "Anya Forger", price: 420, currency: "Rs.", category: "individual", image: "images/individual/Anya Rs. 420 .jpg", rarity: "R" },
    { id: "ind-3", name: "Anya Deluxe", price: 700, currency: "Rs.", category: "individual", image: "images/individual/Anya Rs.700 .jpg", rarity: "SR" },
    { id: "ind-4", name: "Boa Hancock", price: 750, currency: "Rs.", category: "individual", image: "images/individual/BOA Rs. 750 .jpg", rarity: "SR" },
    { id: "ind-5", name: "Chainsaw Man", price: 700, currency: "Rs.", category: "individual", image: "images/individual/ChainsawM Rs. 700  .jpg", rarity: "SR" },
    { id: "ind-6", name: "Chainsaw Man Premium", price: 3500, currency: "Rs.", category: "individual", image: "images/individual/CS.M. Rs3500 .jpeg", rarity: "UR" },
    { id: "ind-7", name: "Daki", price: 1250, currency: "Rs.", category: "individual", image: "images/individual/Daki Rs 1250 .jpg", rarity: "SR" },
    { id: "ind-8", name: "Daki Alt", price: 1300, currency: "Rs.", category: "individual", image: "images/individual/Daki Rs. 1300 jpg.jpg", rarity: "SR" },
    { id: "ind-9", name: "Doma", price: 1350, currency: "Rs.", category: "individual", image: "images/individual/Doma Rs. 1350 .jpg", rarity: "SR" },
    { id: "ind-10", name: "Gogeta", price: 1300, currency: "Rs.", category: "individual", image: "images/individual/Gogeta Rs. 1300 .jpg", rarity: "SR" },
    { id: "ind-11", name: "Goku", price: 800, currency: "Rs.", category: "individual", image: "images/individual/Goku  Rs.800 .jpg", rarity: "SR" },
    { id: "ind-12", name: "Gyomei", price: 1250, currency: "Rs.", category: "individual", image: "images/individual/Gyomei Rs. 1250 .jpg", rarity: "SR" },
    { id: "ind-13", name: "Luffy X Sabo", price: 480, currency: "Rs.", category: "individual", image: "images/individual/L X S Rs. 480 .jpg", rarity: "R" },
    { id: "ind-14", name: "Levi Ackerman", price: 4000, currency: "Rs.", category: "individual", image: "images/individual/Levi Rs. 4000 .jpg", rarity: "UR" },
    { id: "ind-15", name: "Luffy Gear 4", price: 780, currency: "Rs.", category: "individual", image: "images/individual/Luffy G4 Rs. 780 .jpg", rarity: "SR" },
    { id: "ind-16", name: "Luffy Gear 5", price: 450, currency: "Rs.", category: "individual", image: "images/individual/Luffy G5 Rs. 450 .jpg", rarity: "R" },
    { id: "ind-17", name: "Luffy Gear 5 XL", price: 3500, currency: "Rs.", category: "individual", image: "images/individual/Luffy G5(1) Rs. 3500 .jpg", rarity: "UR" },
    { id: "ind-18", name: "Luffy Gear 5 Mini", price: 500, currency: "Rs.", category: "individual", image: "images/individual/Luffy G5(1) Rs.500 .jpg", rarity: "R" },
    { id: "ind-19", name: "Luffy Gear 5 Alt", price: 3500, currency: "Rs.", category: "individual", image: "images/individual/Luffy G5(2) Rs. 3500 .jpg", rarity: "UR" },
    { id: "ind-20", name: "Luffy Gear 5 Chibi", price: 500, currency: "Rs.", category: "individual", image: "images/individual/Luffy G5(2)Rs.500 .jpg", rarity: "R" },
    { id: "ind-21", name: "Luffy Standard", price: 1000, currency: "Rs.", category: "individual", image: "images/individual/Luffy Rs. 1000 .jpg", rarity: "SR" },
    { id: "ind-22", name: "Luffy Action", price: 750, currency: "Rs.", category: "individual", image: "images/individual/Luffy Rs. 750 .jpg", rarity: "SR" },
    { id: "ind-23", name: "Muzan", price: 1500, currency: "Rs.", category: "individual", image: "images/individual/Muzan Rs. 1500 .jpg", rarity: "SSR" },
    { id: "ind-24", name: "Nami", price: 950, currency: "Rs.", category: "individual", image: "images/individual/Nami Rs. 950 .jpg", rarity: "SR" },
    { id: "ind-25", name: "Naruto", price: 1000, currency: "Rs.", category: "individual", image: "images/individual/Naruto Rs. 1000 .jpg", rarity: "SR" },
    { id: "ind-26", name: "Nezuko", price: 800, currency: "Rs.", category: "individual", image: "images/individual/Nezuko Rs. 800 .jpg", rarity: "SR" },
    { id: "ind-27", name: "One Piece Set", price: 2000, currency: "Rs.", category: "individual", image: "images/individual/OP Set Rs. 2000 .jpg", rarity: "SSR" },
    { id: "ind-28", name: "Pikachu Special", price: 5500, currency: "Rs.", category: "individual", image: "images/individual/Pika Rs. 5500 .jpg", rarity: "UR" },
    { id: "ind-29", name: "Sanemi", price: 1250, currency: "Rs.", category: "individual", image: "images/individual/Sanemi Rs. 1250 .jpg", rarity: "SR" },
    { id: "ind-30", name: "Sanji Premium", price: 2800, currency: "Rs.", category: "individual", image: "images/individual/Sanji Rs. 2800 .jpg", rarity: "SSR" },
    { id: "ind-31", name: "Sanji", price: 700, currency: "Rs.", category: "individual", image: "images/individual/Sanji Rs. 700 .jpg", rarity: "SR" },
    { id: "ind-32", name: "Sanji Alt", price: 800, currency: "Rs.", category: "individual", image: "images/individual/Sanji Rs. 800 .jpg", rarity: "SR" },
    { id: "ind-33", name: "Shanks", price: 2500, currency: "Rs.", category: "individual", image: "images/individual/Shanks Rs. 2500 .jpg", rarity: "SSR" },
    { id: "ind-34", name: "Spiderman", price: 3600, currency: "Rs.", category: "individual", image: "images/individual/Spidey Rs. 3600 .jpg", rarity: "UR" },
    { id: "ind-35", name: "Tanjiro", price: 900, currency: "Rs.", category: "individual", image: "images/individual/Tanjiro Rs..900 .jpg", rarity: "SR" },
    { id: "ind-36", name: "Tanjiro Alt", price: 750, currency: "Rs.", category: "individual", image: "images/individual/Tanjiro Rs.750 .jpg", rarity: "R" },
    { id: "ind-37", name: "Tengen Uzui", price: 1450, currency: "Rs.", category: "individual", image: "images/individual/Tengen Rs. 1450 .jpg", rarity: "SR" },
    { id: "ind-38", name: "Yoriichi Tsugikuni", price: 1350, currency: "Rs.", category: "individual", image: "images/individual/Tsugikuni Rs.1350 .jpg", rarity: "SR" },
    { id: "ind-39", name: "Mitsuri & Obanai", price: 2050, currency: "Rs.", category: "individual", image: "images/individual/VishMita Rs. 2050 .jpg", rarity: "SSR" },
    { id: "ind-40", name: "Zenitsu", price: 500, currency: "Rs.", category: "individual", image: "images/individual/Zenitsu Rs. 500 .jpg", rarity: "R" },
    { id: "ind-41", name: "Zenitsu Alt", price: 700, currency: "Rs.", category: "individual", image: "images/individual/Zenitsu Rs. 700 .jpg", rarity: "SR" },
    { id: "ind-42", name: "Zoro Premium", price: 4000, currency: "Rs.", category: "individual", image: "images/individual/Zoro Rs. 4000 .jpg", rarity: "UR" },
    { id: "ind-43", name: "Zoro", price: 750, currency: "Rs.", category: "individual", image: "images/individual/Zoro Rs. 750 .jpg", rarity: "SR" },
    { id: "ind-44", name: "Zoro Alt", price: 850, currency: "Rs.", category: "individual", image: "images/individual/Zoro Rs. 850 .jpg", rarity: "SR" },
    { id: "ind-45", name: "Zoro Special", price: 950, currency: "Rs.", category: "individual", image: "images/individual/Zoro Rs. 950 .jpg", rarity: "SR" },
    // SETS
    { id: "set-1", name: "Badge Set", price: 150, currency: "Rs.", category: "set", image: "images/set/Rs. 150 each .jpg", rarity: "C" },
    { id: "set-2", name: "Sticker Pack", price: 165, currency: "Rs.", category: "set", image: "images/set/Rs. 165 each .jpg", rarity: "C" },
    { id: "set-3", name: "Card Set", price: 175, currency: "Rs.", category: "set", image: "images/set/Rs. 175 each .jpg", rarity: "C" },
    { id: "set-4", name: "Premium Set", price: 210, currency: "Rs.", category: "set", image: "images/set/Rs. 210 each .jpg", rarity: "R" },
    { id: "set-5", name: "Collectors Set", price: 250, currency: "Rs.", category: "set", image: "images/set/Rs. 250 each .jpg", rarity: "R" },
    { id: "set-new-1", name: "Exclusive Set 1", price: 0, currency: "Rs.", category: "set", image: "images/set/IMG-20260119-WA0033.jpg", rarity: "C" },
    { id: "set-new-2", name: "Exclusive Set 2", price: 0, currency: "Rs.", category: "set", image: "images/set/IMG-20260119-WA0037.jpg", rarity: "C" },
    // HP
    { id: "hp-1", name: "HP Artifact 1", price: 0, currency: "Rs.", category: "hp", image: "images/hp/IMG-20260123-WA0133.jpg", rarity: "R" },
    { id: "hp-2", name: "HP Artifact 2", price: 0, currency: "Rs.", category: "hp", image: "images/hp/IMG-20260123-WA0134.jpg", rarity: "R" },
    // MYSTERY
    { id: "myst-1", name: "Bronze Tier Box", price: 999, currency: "Rs.", category: "myst_box", image: "images/individual/OP Set Rs. 2000 .jpg", rarity: "R" },
    { id: "myst-2", name: "Silver Tier Box", price: 1999, currency: "Rs.", category: "myst_box", image: "images/individual/CS.M. Rs3500 .jpeg", rarity: "SR" },
    { id: "myst-3", name: "Gold Tier Box", price: 4999, currency: "Rs.", category: "myst_box", image: "images/individual/Pika Rs. 5500 .jpg", rarity: "UR" },
];

// STATE
let cart = [];
let checkoutMethod = 'whatsapp';

// DOM LOAD
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    renderCategories();
    renderProducts('all');
    initMouseParallax();
    initAtmosphere();
    initScrollReveal();
});

// PRELOADER ANIMATION (GSAP)
function initPreloader() {
    const tl = gsap.timeline();
    const progress = document.querySelector('.loading-progress');
    const text = document.querySelector('.loading-text');

    // Simulate loading
    tl.to(progress, { width: '100%', duration: 1.5, ease: 'power2.inOut' })
      .to(text, { opacity: 0, duration: 0.2 })
      .to('.slash-line', { width: '150%', left: '-25%', opacity: 1, duration: 0.1, ease: 'power4.out' })
      .to('.white-flash', { opacity: 1, duration: 0.05, yoyo: true, repeat: 1 })
      .to('.split-top', { y: '-100%', rotation: -5, duration: 0.8, ease: 'power3.in' }, 'split')
      .to('.split-bottom', { y: '100%', rotation: 5, duration: 0.8, ease: 'power3.in' }, 'split')
      .to('.slash-line', { opacity: 0, duration: 0.1 }, 'split')
      .to('#preloader', { display: 'none' });
}

// RENDERING
function renderCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = categories.map((cat, idx) => `
        <div class="col-md-6 col-lg-3">
            <div class="clip-card h-100 p-4 d-flex flex-column justify-content-between cat-bg-hover" onclick="filterCategory('${cat.id}')">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="p-3 border rounded-circle border-secondary bg-black-blur">
                        <i data-lucide="${cat.icon}" class="text-white"></i>
                    </div>
                    <span class="font-bangers text-white opacity-25 display-4 line-height-1">0${idx+1}</span>
                </div>
                <div class="mt-4">
                    <h3 class="font-bangers text-white uppercase mb-1">${cat.title}</h3>
                    <div class="border-start border-2 border-secondary ps-3">
                        <p class="font-mono text-muted small m-0">${cat.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderProducts(filter) {
    const container = document.getElementById('products-container');
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    document.getElementById('current-category-title').innerText = filter === 'all' ? "ALL LOOT" : categories.find(c => c.id === filter).title.toUpperCase();
    document.getElementById('current-filter-name').innerText = filter.toUpperCase();

    if (filtered.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-muted font-mono py-5">// NO ITEMS FOUND IN THIS SECTOR</div>';
        return;
    }

    container.innerHTML = filtered.map(p => {
        const catColor = categories.find(c => c.id === p.category)?.color.replace('border-', 'text-') || 'text-white';
        const borderColor = categories.find(c => c.id === p.category)?.color.replace('border-', '') || 'white';
        
        return `
        <div class="col-sm-6 col-lg-4">
            <div class="manga-panel h-100 group">
                <div class="comic-triangle"></div>
                <div class="rarity-badge ${p.rarity === 'UR' ? 'text-yellow' : p.rarity === 'SSR' ? 'text-pink' : 'text-white'}">
                    ${p.rarity}
                </div>
                
                <div class="product-img-wrapper">
                    <div class="halftone-overlay"></div>
                    <img src="${p.image}" class="product-img" onerror="this.style.display='none'">
                    <div class="pow-text">POW!</div>
                </div>

                <div class="p-4 bg-white text-black position-relative z-10">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h4 class="font-black fst-italic text-uppercase m-0 leading-none">${p.name}</h4>
                            <span class="badge bg-black text-white font-mono mt-1">#${p.id}</span>
                        </div>
                        <span class="font-bangers h4 ${catColor}">${p.currency}${p.price}</span>
                    </div>
                    
                    <button onclick="addToCart('${p.id}')" class="btn btn-black w-100 py-2 mt-3 font-bold text-uppercase hover-scale d-flex align-items-center justify-content-center gap-2">
                        <i data-lucide="shopping-cart" style="width:16px"></i> GET IT
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
    lucide.createIcons();
    
    // Re-trigger reveal animation for new items
    gsap.fromTo("#products-container .col-sm-6", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, clearProps: "all" }
    );
}

// LOGIC
function filterCategory(cat) {
    renderProducts(cat);
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    toggleCart(true); // Open cart on add
    showToast(`ACQUIRED: ${product.name}`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    
    // Count
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    countBadge.innerText = totalCount;
    countBadge.classList.toggle('d-none', totalCount === 0);
    
    // Total Price
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalEl.innerText = total;

    // Items
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted mt-5 font-mono">
                <i data-lucide="shopping-bag" class="opacity-25" style="width: 48px; height: 48px;"></i>
                <p class="mt-3">CONTAINER EMPTY</p>
            </div>`;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="d-flex gap-3 mb-3 bg-dark-glass p-2 border border-secondary position-relative">
                <img src="${item.image}" class="rounded border border-secondary" style="width: 60px; height: 60px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="font-bold text-white mb-0 text-truncate" style="max-width: 150px;">${item.name}</h6>
                    <small class="text-pink font-mono">${item.currency}${item.price} x ${item.quantity}</small>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="btn btn-link text-secondary p-0 position-absolute top-0 end-0 mt-1 me-2 hover-text-danger">
                    <i data-lucide="trash-2" style="width: 16px;"></i>
                </button>
            </div>
        `).join('');
    }
    lucide.createIcons();
}

function toggleCart(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    
    if (forceOpen || !drawer.classList.contains('open')) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
    } else {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
    }
}

function startCheckout() {
    if (cart.length === 0) return;
    document.getElementById('cart-items').classList.add('d-none');
    document.getElementById('cart-footer').classList.add('d-none');
    document.getElementById('checkout-form').classList.remove('d-none');
    document.getElementById('checkout-form').classList.add('d-flex');
}

function cancelCheckout() {
    document.getElementById('cart-items').classList.remove('d-none');
    document.getElementById('cart-footer').classList.remove('d-none');
    document.getElementById('checkout-form').classList.add('d-none');
    document.getElementById('checkout-form').classList.remove('d-flex');
}

function setMethod(method) {
    checkoutMethod = method;
    // Visually update buttons (simplified for vanilla JS)
    document.querySelectorAll('#checkout-form button[type="button"]').forEach(btn => btn.classList.remove('active', 'border-pink'));
    event.currentTarget.classList.add('active', 'border-pink');
}

function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('cust-name').value;
    const city = document.getElementById('cust-city').value;
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const itemsList = cart.map(item => `- ${item.name} x${item.quantity} (${item.currency}${item.price})`).join('\n');
    const message = `
*NEW ORDER REQUEST*
------------------
*Customer:* ${name}
*City:* ${city}
------------------
*ITEMS:*
${itemsList}
------------------
*TOTAL ESTIMATE:* Rs. ${total}
------------------
Please confirm availability.`;

    if (checkoutMethod === 'whatsapp') {
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        window.open(`mailto:admin@akibalane.com?subject=Order Request&body=${encodeURIComponent(message)}`, '_blank');
    }
}

// UI HELPERS
function toggleSearch() {
    document.getElementById('search-overlay').classList.toggle('active');
    if(document.getElementById('search-overlay').classList.contains('active')) {
        document.getElementById('search-input').focus();
    }
}

function handleSearch(query) {
    const container = document.getElementById('search-results');
    if (!query) { container.innerHTML = ''; return; }
    
    const results = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    
    container.innerHTML = results.map(p => `
        <div class="col-md-6" onclick="filterCategory('${p.category}'); toggleSearch()">
            <div class="d-flex gap-3 p-3 border border-secondary bg-dark-glass cursor-pointer hover-border-cyan">
                <img src="${p.image}" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <h5 class="text-white m-0">${p.name}</h5>
                    <small class="text-pink">${p.currency}${p.price}</small>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleContact() {
    document.getElementById('contact-modal').classList.toggle('active');
}

function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'anime-toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// EFFECTS
function initMouseParallax() {
    const card = document.getElementById('hero-card');
    document.addEventListener('mousemove', (e) => {
        if (!card) return;
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
}

function initAtmosphere() {
    const container = document.getElementById('atmosphere-container');
    const chars = ["ゴ", "ド", "ン", "秋", "葉", "侍", "刀"];
    
    for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        el.innerText = chars[Math.floor(Math.random() * chars.length)];
        el.style.position = 'absolute';
        el.style.color = 'rgba(255,255,255,0.1)';
        el.style.fontSize = `${2 + Math.random() * 3}rem`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.top = `${Math.random() * 100}vh`;
        el.style.userSelect = 'none';
        container.appendChild(el);
        
        gsap.to(el, {
            y: -50,
            opacity: 0.2,
            duration: 3 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

function initScrollReveal() {
    gsap.utils.toArray('.reveal-on-scroll').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    });
}

// SAKURA RAIN (Simple CSS implementation injected via JS)
const style = document.createElement('style');
style.innerHTML = `
.sakura {
    position: absolute; background: rgba(255, 183, 197, 0.6);
    border-radius: 100% 0 100% 0;
    animation: fall linear infinite;
}
@keyframes fall {
    to { transform: translateY(100vh) rotate(720deg); }
}
`;
document.head.appendChild(style);

const sakuraContainer = document.getElementById('sakura-container');
setInterval(() => {
    const petal = document.createElement('div');
    petal.classList.add('sakura');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = -10 + 'px';
    petal.style.width = Math.random() * 10 + 5 + 'px';
    petal.style.height = Math.random() * 10 + 5 + 'px';
    petal.style.animationDuration = Math.random() * 3 + 2 + 's';
    sakuraContainer.appendChild(petal);
    
    setTimeout(() => petal.remove(), 5000);
}, 300);
