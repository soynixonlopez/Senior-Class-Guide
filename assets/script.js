// Firebase Auth Tutorial - JavaScript para funcionalidad de la documentación

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initNavigation();
    initCopyButtons();
    initSmoothScrolling();
    initMobileMenu();
    initProgressTracker();
});

// Navegación del sidebar
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Manejar clicks en navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar active al link actual
            this.classList.add('active');
            
            // Scroll suave a la sección
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Actualizar navegación al hacer scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Funcionalidad de botones de copiar
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            copyCode(this);
        });
    });
}

// Función global para copiar código
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const codeContent = codeBlock.querySelector('pre code');
    
    if (!codeContent) return;
    
    const text = codeContent.textContent;
    
    // Usar la API moderna de clipboard si está disponible
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button, true);
        }).catch(() => {
            fallbackCopyText(text);
            showCopyFeedback(button, true);
        });
    } else {
        // Fallback para navegadores más antiguos
        fallbackCopyText(text);
        showCopyFeedback(button, true);
    }
}

// Método fallback para copiar texto
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    
    document.body.removeChild(textArea);
}

// Mostrar feedback visual al copiar
function showCopyFeedback(button, success) {
    const originalText = button.textContent;
    const originalBg = button.style.backgroundColor;
    
    if (success) {
        button.textContent = '✅ ¡Copiado!';
        button.style.backgroundColor = '#10b981';
    } else {
        button.textContent = '❌ Error';
        button.style.backgroundColor = '#ef4444';
    }
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBg;
    }, 2000);
}

// Scroll suave para todos los enlaces internos
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menú móvil (para futuras mejoras)
function initMobileMenu() {
    // Detectar si estamos en móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Crear botón de menú móvil
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰ Menú';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: var(--accent);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: var(--shadow);
        `;
        
        document.body.appendChild(mobileMenuBtn);
        
        const sidebar = document.querySelector('.sidebar');
        
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            this.textContent = sidebar.classList.contains('open') ? '✕ Cerrar' : '☰ Menú';
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('open');
                mobileMenuBtn.textContent = '☰ Menú';
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('open');
                mobileMenuBtn.textContent = '☰ Menú';
            }
        });
    }
}

// Tracker de progreso (opcional)
function initProgressTracker() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent), var(--success));
        z-index: 1002;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Utilidades adicionales
const Utils = {
    // Debounce para optimizar eventos
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Verificar si un elemento está visible
    isElementVisible: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Animar entrada de elementos
    animateOnScroll: function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (this.isElementVisible(element)) {
                element.classList.add('animated');
            }
        });
    }
};

// Manejar redimensionado de ventana
window.addEventListener('resize', Utils.debounce(function() {
    // Reinicializar menú móvil si es necesario
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile && mobileMenuBtn) {
        mobileMenuBtn.remove();
        document.querySelector('.sidebar').classList.remove('open');
    } else if (isMobile && !mobileMenuBtn) {
        initMobileMenu();
    }
    
    // Cerrar sidebar overlay si existe
    if (window.GuideComponents) {
        window.GuideComponents.closeSidebar();
    }
}, 250));

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Funciones para mejorar la experiencia del usuario
document.addEventListener('keydown', function(e) {
    // Atajos de teclado
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Futuro: implementar búsqueda rápida
                break;
        }
    }
    
    // Navegación con teclas
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = '☰ Menú';
            }
        }
    }
});

// Mejorar accesibilidad
function enhanceAccessibility() {
    // Agregar skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#overview';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1003;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Mejorar navegación por teclado
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Inicializar mejoras de accesibilidad
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Exportar funciones para uso global
window.FirebaseAuthTutorial = {
    copyCode,
    Utils
};
