// Wedding Planner Website - Interactive Features

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeScrollAnimations();
    initializeContest();
    initializeCategoryFilters();
    initializeMobileMenu();
    initializeVendorCards();
});

// Search Functionality
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const locationInput = document.querySelector('.location-input');

    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        const location = locationInput.value.trim();

        if (query || location) {
            performSearch(query, location);
        } else {
            showNotification('Por favor ingresa un término de búsqueda o ubicación', 'warning');
        }
    });

    // Enter key support
    [searchInput, locationInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    });
}

function performSearch(query, location) {
    // Simulate search with animation
    showNotification(`Buscando "${query}" en ${location || 'todas las ubicaciones'}...`, 'info');
    
    // Scroll to results (in a real app, this would load actual results)
    setTimeout(() => {
        const resultsSection = document.querySelector('.awards-section');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
        showNotification('¡Encontramos ' + Math.floor(Math.random() * 500 + 100) + ' resultados!', 'success');
    }, 1000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards and sections on scroll
    const animatedElements = document.querySelectorAll('.card, .vendor-card, .wedding-card, .article-card, .template-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Contest Features
function initializeContest() {
    const contestBtns = document.querySelectorAll('.btn-contest, .floating-btn');
    
    contestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showContestModal();
        });
    });
}

function showContestModal() {
    const modal = createModal(`
        <div class="contest-modal">
            <h2>🎉 ¡Participa en nuestro sorteo!</h2>
            <p>Gana $50,000 para tu boda</p>
            <div class="contest-form">
                <input type="text" placeholder="Nombre completo" class="modal-input">
                <input type="email" placeholder="Correo electrónico" class="modal-input">
                <input type="tel" placeholder="Teléfono" class="modal-input">
                <input type="date" placeholder="Fecha de tu boda" class="modal-input">
                <button class="btn-primary" onclick="submitContest()">Participar ahora</button>
            </div>
        </div>
    `);
}

function submitContest() {
    showNotification('¡Registro exitoso! Recibirás un correo de confirmación.', 'success');
    closeModal();
}

// Category Filters
function initializeCategoryFilters() {
    const categoryTags = document.querySelectorAll('.category-tag');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all
            categoryTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            
            const category = this.textContent;
            filterArticles(category);
        });
    });
}

function filterArticles(category) {
    showNotification(`Mostrando artículos de: ${category}`, 'info');
    // In a real app, this would filter the articles
}

// Mobile Menu
function initializeMobileMenu() {
    // Create hamburger menu for mobile
    if (window.innerWidth <= 768) {
        const navWrapper = document.querySelector('.nav-wrapper');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = 'font-size: 24px; background: none; border: none; cursor: pointer;';
        
        navWrapper.insertBefore(mobileMenuBtn, navWrapper.children[1]);
        
        mobileMenuBtn.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '70px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        });
    }
}

// Vendor Cards Interactions
function initializeVendorCards() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        // Add favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '♡';
        favoriteBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: white; border: none; font-size: 24px; cursor: pointer; border-radius: 50%; width: 40px; height: 40px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);';
        
        card.style.position = 'relative';
        card.appendChild(favoriteBtn);
        
        favoriteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFavorite(this);
        });
        
        // Add click event to view details
        card.addEventListener('click', function() {
            const vendorName = this.querySelector('h4').textContent;
            showVendorDetails(vendorName);
        });
    });
}

function toggleFavorite(btn) {
    if (btn.innerHTML === '♡') {
        btn.innerHTML = '♥';
        btn.style.color = '#d4458c';
        showNotification('Añadido a favoritos', 'success');
    } else {
        btn.innerHTML = '♡';
        btn.style.color = 'inherit';
        showNotification('Eliminado de favoritos', 'info');
    }
}

function showVendorDetails(vendorName) {
    const modal = createModal(`
        <div class="vendor-details">
            <h2>${vendorName}</h2>
            <div class="vendor-gallery">
                <div class="gallery-image" style="width: 100%; height: 300px; background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%); border-radius: 10px; margin-bottom: 20px;"></div>
            </div>
            <div class="vendor-info-detailed">
                <p><strong>Ubicación:</strong> Oaxaca, México</p>
                <p><strong>Especialidad:</strong> Fotografía de bodas profesional</p>
                <p><strong>Precio:</strong> Desde $20,000</p>
                <p><strong>Disponibilidad:</strong> Consultar fechas</p>
                <div class="vendor-reviews">
                    <h3>Opiniones</h3>
                    <p>⭐⭐⭐⭐⭐ "Excelente servicio, superó nuestras expectativas"</p>
                    <p>⭐⭐⭐⭐⭐ "Muy profesional y creativo"</p>
                </div>
            </div>
            <div style="display: flex; gap: 15px; margin-top: 30px;">
                <button class="btn-primary" style="flex: 1;" onclick="contactVendor()">Contactar</button>
                <button class="btn-secondary" style="flex: 1;" onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `);
}

function contactVendor() {
    showNotification('Formulario de contacto enviado. El proveedor te contactará pronto.', 'success');
    closeModal();
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4caf50' : type === 'warning' ? '#ff9800' : '#2196f3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function createModal(content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideUp 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #999;
    `;
    closeBtn.addEventListener('click', closeModal);
    
    modalContent.innerHTML = content;
    modalContent.appendChild(closeBtn);
    overlay.appendChild(modalContent);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });
    
    return overlay;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

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
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-input {
        width: 100%;
        padding: 12px 20px;
        margin: 10px 0;
        border: 2px solid #ddd;
        border-radius: 10px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s;
    }
    
    .modal-input:focus {
        border-color: #d4458c;
    }
    
    .contest-modal h2 {
        color: #d4458c;
        margin-bottom: 10px;
    }
    
    .contest-modal p {
        color: #666;
        margin-bottom: 30px;
    }
    
    .vendor-details h2 {
        color: #d4458c;
        margin-bottom: 20px;
    }
    
    .vendor-reviews {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
    }
    
    .vendor-reviews h3 {
        margin-bottom: 15px;
        color: #333;
    }
    
    .vendor-reviews p {
        margin: 10px 0;
        color: #666;
    }
    
    .category-tag.active {
        background: #d4458c;
        color: white;
    }
`;
document.head.appendChild(style);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🎉 Wedding Planner Website initialized successfully!');