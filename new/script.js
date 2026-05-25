const itemsData = {
    lost: [
        {
            id: 1,
            title: "Black Leather Wallet",
            category: "Wallet & Purse",
            location: "Library - 2nd Floor",
            date: "Dec 4, 2025",
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
            description: "Black leather bifold wallet with initials 'SK' embossed",
            status: "lost"
        },
        {
            id: 2,
            title: "iPhone 14 Pro",
            category: "Electronics",
            location: "Cafeteria",
            date: "Dec 3, 2025",
            image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
            description: "Space black iPhone with clear case and cracked screen protector",
            status: "lost"
        },
        {
            id: 3,
            title: "Blue Sports Bag",
            category: "Bags",
            location: "Sports Complex",
            date: "Dec 2, 2025",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
            description: "Nike blue duffel bag with gym clothes and water bottle",
            status: "lost"
        }
    ],
    found: [
        {
            id: 4,
            title: "Wireless Earbuds",
            category: "Electronics",
            location: "Computer Lab - Block A",
            date: "Dec 4, 2025",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
            description: "White wireless earbuds in charging case",
            status: "found"
        },
        {
            id: 5,
            title: "Student ID Card",
            category: "ID & Documents",
            location: "Main Gate",
            date: "Dec 3, 2025",
            image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
            description: "PSIT student ID card - name partially visible",
            status: "found"
        },
        {
            id: 6,
            title: "Silver Watch",
            category: "Accessories",
            location: "Parking Area B",
            date: "Dec 1, 2025",
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
            description: "Analog silver watch with brown leather strap",
            status: "found"
        },
        {
            id: 7,
            title: "Prescription Glasses",
            category: "Accessories",
            location: "Auditorium",
            date: "Nov 30, 2025",
            image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
            description: "Black frame prescription glasses in blue case",
            status: "claimed"
        }
    ]
};

// -----------------------
// DOM Elements
// -----------------------
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');
const itemsGrid = document.getElementById('itemsGrid');

// -----------------------
// Initialize
// -----------------------
document.addEventListener('DOMContentLoaded', () => {
    renderItems('lost');
    initScrollEffects();
    init3DPhotoEffect();
});

// -----------------------
// Mobile Menu
// -----------------------
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
}

// -----------------------
// Scroll Effects
// -----------------------
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 12, 20, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 12, 20, 0.8)';
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// -----------------------
// Tabs
// -----------------------
function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) {
            btn.classList.add('active');
        }
    });
    
    // Render items
    renderItems(tab);
}

// -----------------------
// Render Items
// -----------------------
function renderItems(type) {
    const items = itemsData[type];
    
    itemsGrid.innerHTML = items.map(item => `
        <div class="item-card" data-id="${item.id}">
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
                <span class="item-badge ${item.status}">${capitalizeFirst(item.status)}</span>
            </div>
            <div class="item-content">
                <h3>${item.title}</h3>
                <p class="description">${item.description}</p>
                <div class="item-meta">
                    <span><i class="fas fa-tag"></i> ${item.category}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    <span><i class="fas fa-calendar"></i> ${item.date}</span>
                </div>
                ${getItemButton(item)}
            </div>
        </div>
    `).join('');
    
    // Add animation
    itemsGrid.querySelectorAll('.item-card').forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s both`;
    });
}

function getItemButton(item) {
    if (item.status === 'lost') {
        return `<button class="btn-primary" onclick="handleItemAction(${item.id}, 'found')">
            <i class="fas fa-hand-holding"></i> I Found This
        </button>`;
    } else if (item.status === 'found') {
        return `<button class="btn-outline" onclick="handleItemAction(${item.id}, 'claim')">
            <i class="fas fa-hand-paper"></i> Claim Item
        </button>`;
    } else {
        return `<button class="btn-outline" disabled>
            <i class="fas fa-check"></i> Already Claimed
        </button>`;
    }
}

function handleItemAction(id, action) {
    if (action === 'found') {
        showToast('Thank you! We will contact you shortly to verify the item.');
    } else if (action === 'claim') {
        showToast('Claim request submitted! Please visit the Lost & Found center with valid ID.');
    }
}

// -----------------------
// Modal
// -----------------------
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// -----------------------
// Report Type Switch
// -----------------------
function switchReportType(type) {
    document.querySelectorAll('.report-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.type === type) {
            tab.classList.add('active');
        }
    });
    document.getElementById('reportType').value = type;
}

// -----------------------
// Form Handlers
// -----------------------
function handleContactSubmit(event) {
    event.preventDefault();
    showToast('Message sent successfully! We\'ll get back to you soon.');
    event.target.reset();
}

function handleReportSubmit(event) {
    event.preventDefault();
    const type = document.getElementById('reportType').value;
    const message = type === 'lost' 
        ? 'Lost item report submitted! We\'ll notify you if someone finds it.'
        : 'Found item report submitted! Thank you for your honesty.';
    showToast(message);
    closeModal('reportModal');
    event.target.reset();
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    showToast('Subscribed successfully! You\'ll receive updates on matching items.');
    event.target.reset();
}

// -----------------------
// Toast
// -----------------------
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

// -----------------------
// Utilities
// -----------------------
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// -----------------------
// Smooth scroll for anchor links
// -----------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// -----------------------
// 3D Photo Effect
// -----------------------
function init3DPhotoEffect() {
    const photo3DCard = document.querySelector('.photo-3d-card');
    const photo3DWrapper = document.querySelector('.photo-3d-wrapper');
    
    if (!photo3DCard || !photo3DWrapper) return;
    
    // Enhanced mouse move effect with smoother tracking
    photo3DWrapper.addEventListener('mousemove', (e) => {
        const rect = photo3DWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Increased rotation values for more dramatic effect
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((centerX - x) / centerX) * 15;
        
        photo3DCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
    });
    
    photo3DWrapper.addEventListener('mouseleave', () => {
        photo3DCard.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
    
    // Enhanced parallax effect for glow
    const photoGlow = document.querySelector('.photo-3d-glow');
    if (photoGlow) {
        photo3DWrapper.addEventListener('mousemove', (e) => {
            const rect = photo3DWrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
            
            photoGlow.style.transform = `translate(${x}px, ${y}px) scale(1.15)`;
        });
        
        photo3DWrapper.addEventListener('mouseleave', () => {
            photoGlow.style.transform = 'translate(0, 0) scale(1)';
        });
    }
    
    // Add click animation
    photo3DCard.addEventListener('click', () => {
        photo3DCard.style.animation = 'none';
        setTimeout(() => {
            photo3DCard.style.animation = '';
        }, 10);
        
        // Create ripple effect on click
        createRipple(event, photo3DWrapper);
    });
}

// -----------------------
// Ripple Effect
// -----------------------
function createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: rippleEffect 0.8s ease-out;
        z-index: 10;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// -----------------------
// Intersection Observer for animations
// -----------------------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});