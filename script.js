// Wedding Planner Website - Interactive Features
// Updated for Providers Database Platform

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProvidersFromDatabase(); // Cargar proveedores de la BD
    initializeSearch();
    initializeScrollAnimations();
    initializeCategoryFilters();
    initializeMobileMenu();
    initializeVendorCards();
    initializeProviderFilters();
});

// Load providers from database
function loadProvidersFromDatabase() {
    if (typeof providersDatabase === 'undefined') {
        console.error('Base de datos no cargada');
        return;
    }
    
    const vendorsContainer = document.getElementById('vendors-container');
    if (!vendorsContainer) return;
    
    // Limpiar contenedor
    vendorsContainer.innerHTML = '';
    
    // Obtener proveedores ordenados por rating
    const providers = providersDatabase.ordenar('rating');
    
    // Generar HTML para cada proveedor
    providers.forEach(provider => {
        const card = createProviderCard(provider);
        vendorsContainer.appendChild(card);
    });
    
    console.log(`✅ ${providers.length} proveedores cargados`);
}

// Create provider card
function createProviderCard(provider) {
    const card = document.createElement('div');
    card.className = 'vendor-card';
    card.setAttribute('data-category', provider.categoria);
    card.setAttribute('data-provider-id', provider.id);
    
    const contactInfo = `
        ${provider.telefono ? `<p class="contact-info">📞 ${provider.telefono}</p>` : ''}
        ${provider.paginaWeb ? `<p class="contact-info">🌐 <a href="${provider.paginaWeb}" target="_blank">Sitio Web</a></p>` : ''}
    `;
    
    card.innerHTML = `
        <div class="vendor-image" style="background-image: url('${provider.fotoPerfil}'); background-size: cover; background-position: center;"></div>
        <div class="vendor-info">
            <span class="vendor-badge">${provider.subcategoria}</span>
            ${provider.verificado ? '<span class="verified-badge">✓ Verificado</span>' : ''}
            <h4>${provider.nombre}</h4>
            <div class="rating">⭐ ${provider.rating} (${provider.totalReviews})</div>
            <p class="location">📍 ${provider.ciudad}, ${provider.estado}</p>
            <p class="price">💰 $${provider.precioPromedio}/persona</p>
            <p class="services">${provider.servicios.slice(0, 3).join(' • ')}</p>
            ${contactInfo}
            <button class="btn-contact" onclick="showProviderDetails(${provider.id})">Ver Detalles</button>
        </div>
    `;
    
    return card;
}

// Search Functionality
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const categorySelect = document.querySelector('.category-select');
    const locationInput = document.querySelector('.location-input');

    searchBtn.addEventListener('click', function() {
        const category = categorySelect.value;
        const location = locationInput.value.trim();

        if (category || location) {
            performSearch(category, location);
        } else {
            showNotification('Por favor selecciona una categoría o ubicación', 'warning');
        }
    });

    // Enter key support
    locationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

function performSearch(category, location) {
    // Buscar en la base de datos
    const results = providersDatabase.buscar('', location, category === '' ? null : category);
    
    // Limpiar y mostrar resultados
    const vendorsContainer = document.getElementById('vendors-container');
    if (!vendorsContainer) return;
    
    vendorsContainer.innerHTML = '';
    
    if (results.length === 0) {
        vendorsContainer.innerHTML = '<p class="no-results">No se encontraron proveedores. Intenta con otros criterios.</p>';
        showNotification('No se encontraron resultados', 'warning');
        return;
    }
    
    results.forEach(provider => {
        const card = createProviderCard(provider);
        vendorsContainer.appendChild(card);
    });
    
    // Scroll to results
    setTimeout(() => {
        const resultsSection = document.querySelector('.awards-section');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
        showNotification(`¡Encontramos ${results.length} proveedores!`, 'success');
    }, 500);
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

// Provider Filters
function initializeProviderFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterVendorsByCategory(filter);
        });
    });
}

function filterVendorsByCategory(category) {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        if (category === 'todos') {
            card.classList.remove('hidden');
            card.style.display = '';
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.classList.remove('hidden');
                card.style.display = '';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        }
    });
    
    // Count visible vendors
    const visibleCount = document.querySelectorAll('.vendor-card:not(.hidden)').length;
    showNotification(`Mostrando ${visibleCount} proveedores`, 'info');
}

// Contest Features - Updated
function initializeContest() {
    const floatingBtn = document.querySelector('.floating-btn');
    
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            showContactModal();
        });
    }
}

function showContactModal() {
    const modal = createModal(`
        <div class="contest-modal">
            <h2>💬 ¿Necesitas Ayuda?</h2>
            <p>Contáctanos y te ayudaremos a encontrar los mejores proveedores</p>
            <div class="contest-form">
                <input type="text" placeholder="Nombre completo" class="modal-input">
                <input type="email" placeholder="Correo electrónico" class="modal-input">
                <input type="tel" placeholder="Teléfono" class="modal-input">
                <select class="modal-input">
                    <option value="">¿Qué tipo de evento?</option>
                    <option value="boda">Boda</option>
                    <option value="corporativo">Evento Corporativo</option>
                    <option value="social">Evento Social</option>
                    <option value="otro">Otro</option>
                </select>
                <textarea placeholder="Cuéntanos más sobre tu evento..." class="modal-input" rows="4"></textarea>
                <button class="btn-primary" onclick="submitContact()">Enviar Mensaje</button>
            </div>
        </div>
    `);
}

function submitContact() {
    showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
    closeModal();
}

function showContestModal() {
    showContactModal();
}

// Category Filters
function initializeCategoryFilters() {
    const categoryCards = document.querySelectorAll('.card[data-category]');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('card-link')) {
                const category = this.getAttribute('data-category');
                filterVendorsByCategory(category);
                
                // Scroll to providers section
                const providersSection = document.querySelector('#proveedores');
                if (providersSection) {
                    providersSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    const categoryTags = document.querySelectorAll('.category-tag');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all
            categoryTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            
            const category = this.textContent;
            showNotification(`Filtrando por: ${category}`, 'info');
        });
    });
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
    // Si es un ID numérico, buscar en la base de datos
    if (typeof vendorName === 'number') {
        const provider = providersDatabase.obtenerPorId(vendorName);
        if (provider) {
            showProviderDetails(provider.id);
            return;
        }
    }
    
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

// Show provider details from database
function showProviderDetails(providerId) {
    const provider = providersDatabase.obtenerPorId(providerId);
    if (!provider) {
        showNotification('Proveedor no encontrado', 'error');
        return;
    }
    
    const horarioHTML = Object.entries(provider.horario)
        .map(([dia, horas]) => `<p><strong>${dia.charAt(0).toUpperCase() + dia.slice(1)}:</strong> ${horas}</p>`)
        .join('');
    
    const serviciosHTML = provider.servicios
        .map(s => `<span class="service-tag">${s}</span>`)
        .join('');
    
    const especialidadesHTML = provider.especialidades
        .map(e => `<span class="specialty-tag">${e}</span>`)
        .join('');
    
    const modal = createModal(`
        <div class="provider-details">
            <div class="provider-header">
                <h2>${provider.nombre}</h2>
                <div class="provider-meta">
                    <span class="provider-badge">${provider.subcategoria}</span>
                    ${provider.verificado ? '<span class="verified-badge-large">✓ Verificado</span>' : ''}
                    ${provider.premium ? '<span class="premium-badge">👑 Premium</span>' : ''}
                </div>
                <div class="rating-large">
                    <span class="stars">⭐ ${provider.rating}</span>
                    <span class="reviews">(${provider.totalReviews} reseñas)</span>
                </div>
            </div>
            
            <div class="provider-gallery">
                <div class="main-image" style="background-image: url('${provider.fotoPerfil}'); height: 400px; background-size: cover; background-position: center; border-radius: 15px; margin-bottom: 20px;"></div>
            </div>
            
            <div class="provider-info-grid">
                <div class="info-section">
                    <h3>📍 Ubicación</h3>
                    <p><strong>${provider.direccion}</strong></p>
                    <p>${provider.ciudad}, ${provider.estado} ${provider.codigoPostal}</p>
                    ${provider.googleMaps ? `<p><a href="${provider.googleMaps}" target="_blank" class="map-link">Ver en Google Maps →</a></p>` : ''}
                </div>
                
                <div class="info-section">
                    <h3>📞 Contacto</h3>
                    <p><strong>Teléfono:</strong> <a href="tel:${provider.telefono}">${provider.telefono}</a></p>
                    ${provider.email ? `<p><strong>Email:</strong> <a href="mailto:${provider.email}">${provider.email}</a></p>` : ''}
                    ${provider.paginaWeb ? `<p><strong>Web:</strong> <a href="${provider.paginaWeb}" target="_blank">Visitar sitio web →</a></p>` : ''}
                </div>
                
                <div class="info-section">
                    <h3>💰 Información de Precios</h3>
                    <p><strong>Precio promedio:</strong> $${provider.precioPromedio.toLocaleString()}/persona</p>
                    <p><strong>Capacidad:</strong> Hasta ${provider.capacidad} personas</p>
                </div>
                
                <div class="info-section">
                    <h3>🕐 Horarios</h3>
                    ${horarioHTML}
                </div>
                
                <div class="info-section full-width">
                    <h3>✨ Servicios</h3>
                    <div class="tags-container">
                        ${serviciosHTML}
                    </div>
                </div>
                
                <div class="info-section full-width">
                    <h3>🍽️ Especialidades</h3>
                    <div class="tags-container">
                        ${especialidadesHTML}
                    </div>
                </div>
            </div>
            
            <div class="provider-actions">
                <button class="btn-primary" onclick="contactProvider(${provider.id})">
                    📞 Contactar Ahora
                </button>
                <button class="btn-secondary" onclick="saveProvider(${provider.id})">
                    ❤️ Guardar en Favoritos
                </button>
                <button class="btn-secondary" onclick="shareProvider(${provider.id})">
                    🔗 Compartir
                </button>
            </div>
        </div>
    `);
}

function contactProvider(providerId) {
    const provider = providersDatabase.obtenerPorId(providerId);
    if (!provider) return;
    
    closeModal();
    
    const modal = createModal(`
        <div class="contact-modal">
            <h2>Contactar a ${provider.nombre}</h2>
            <p>Completa el formulario y el proveedor te contactará pronto</p>
            <div class="contest-form">
                <input type="text" placeholder="Tu nombre" class="modal-input">
                <input type="email" placeholder="Tu email" class="modal-input">
                <input type="tel" placeholder="Tu teléfono" class="modal-input">
                <input type="date" placeholder="Fecha del evento" class="modal-input">
                <input type="number" placeholder="Número de invitados" class="modal-input">
                <textarea placeholder="Cuéntanos sobre tu evento..." class="modal-input" rows="4"></textarea>
                <button class="btn-primary" onclick="sendContactForm(${providerId})">Enviar Solicitud</button>
            </div>
            <div class="direct-contact">
                <h4>O contáctalos directamente:</h4>
                <p>📞 <a href="tel:${provider.telefono}">${provider.telefono}</a></p>
                ${provider.email ? `<p>📧 <a href="mailto:${provider.email}">${provider.email}</a></p>` : ''}
                ${provider.paginaWeb ? `<p>🌐 <a href="${provider.paginaWeb}" target="_blank">Visitar sitio web</a></p>` : ''}
            </div>
        </div>
    `);
}

function sendContactForm(providerId) {
    const provider = providersDatabase.obtenerPorId(providerId);
    showNotification(`Solicitud enviada a ${provider.nombre}. Te contactarán pronto.`, 'success');
    closeModal();
}

function saveProvider(providerId) {
    // Guardar en localStorage
    let favorites = JSON.parse(localStorage.getItem('favoriteProviders') || '[]');
    if (!favorites.includes(providerId)) {
        favorites.push(providerId);
        localStorage.setItem('favoriteProviders', JSON.stringify(favorites));
        showNotification('Proveedor guardado en favoritos', 'success');
    } else {
        showNotification('Este proveedor ya está en tus favoritos', 'info');
    }
}

function shareProvider(providerId) {
    const provider = providersDatabase.obtenerPorId(providerId);
    const shareText = `${provider.nombre} - ${provider.subcategoria} en ${provider.ciudad}`;
    const shareUrl = window.location.href + '?provider=' + providerId;
    
    if (navigator.share) {
        navigator.share({
            title: provider.nombre,
            text: shareText,
            url: shareUrl
        }).then(() => {
            showNotification('Compartido exitosamente', 'success');
        }).catch(() => {});
    } else {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(shareUrl).then(() => {
            showNotification('Enlace copiado al portapapeles', 'success');
        });
    }
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
        font-family: inherit;
    }
    
    .modal-input:focus {
        border-color: #d4458c;
    }
    
    textarea.modal-input {
        resize: vertical;
        min-height: 100px;
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