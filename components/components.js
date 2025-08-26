// IT CLASS SENIORS - Componentes Reutilizables

// Header Component
function createHeader(guideTitle, guideIcon = "📚") {
    return `
        <header class="guide-header">
            <div class="header-content">
                <div class="header-left">
                    <a href="index.html" class="back-btn" title="Volver al inicio">
                        <span class="back-icon">←</span>
                        <span class="back-text">Inicio</span>
                    </a>
                </div>
                
                <div class="header-right">
                    <button class="logout-btn" onclick="handleLogout()" title="Cerrar sesión">
                        🚪 Logout
                    </button>
                </div>
            </div>
        </header>
    `;
}

// Footer Component
function createFooter() {
    return `
        <footer class="guide-footer">
            <div class="footer-content">
                <div class="footer-message">
                    <p>
                        📚 Guía creada por <strong>Teacher Nixon</strong> para estudiantes Senior<span class="heart">💚</span>
                    </p>
                </div>
                <div class="footer-links">
                    <a href="index.html" class="footer-link">🏠 Inicio</a>
                    <a href="auth-guide.html" class="footer-link">🔐 Auth</a>
                    <a href="crud-guide.html" class="footer-link">📝 CRUD</a>
                    <a href="imgbb-guide.html" class="footer-link">🖼️ IMGBB</a>
                    <a href="database-guide.html" class="footer-link">🗄️ Database</a>
                    <a href="chatbot-guide.html" class="footer-link">🤖 Chatbot</a>
                </div>
            </div>
        </footer>
    `;
}

// Sidebar Toggle Function (for collapse/expand)
function toggleSidebarCollapse() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

// Mobile Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
        
        // Crear overlay si no existe
        if (!overlay) {
            const newOverlay = document.createElement('div');
            newOverlay.className = 'sidebar-overlay';
            newOverlay.onclick = closeSidebar;
            document.body.appendChild(newOverlay);
        }
        
        document.querySelector('.sidebar-overlay').classList.toggle('active');
    }
}

// Logout Function
function handleLogout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        // Aquí se puede agregar lógica específica de logout
        // Por ejemplo, limpiar localStorage, cookies, etc.
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirigir al inicio
        window.location.href = 'index.html';
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Inicializar componentes cuando el DOM esté listo
function initializeComponents(guideTitle, guideIcon) {
    // Insertar header si existe el contenedor
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader(guideTitle, guideIcon);
    }
    
    // Insertar footer si existe el contenedor
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
    
    // Agregar botón de toggle al sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.querySelector('.sidebar-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'sidebar-toggle';
        toggleBtn.innerHTML = '◀';
        toggleBtn.onclick = toggleSidebarCollapse;
        toggleBtn.title = 'Colapsar/Expandir sidebar';
        sidebar.appendChild(toggleBtn);
    }
    
    // Agregar event listeners
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
    
    // Cerrar sidebar al hacer click en enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
}

// Exportar funciones para uso global
window.GuideComponents = {
    createHeader,
    createFooter,
    toggleSidebar,
    toggleSidebarCollapse,
    closeSidebar,
    handleLogout,
    initializeComponents
};
