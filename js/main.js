// 1. FUNCIONES DEL MENÚ LATERAL (SIDENAV)

const sidenav = document.getElementById("mySidenav");
const menuIcon = document.querySelector('.header-top .icon.menu i');

function openNav() {
    sidenav.style.width = "250px";
    menuIcon.className = 'bx bx-x'; 
}
        
function closeNav() {
    sidenav.style.width = "0";
    menuIcon.className = 'bx bx-menu'; 
}
        
function toggleNav() {
    if (sidenav.style.width === "250px") {
        closeNav();
    } else {
        openNav();
    }
}

document.addEventListener('click', function(event) {
    const isClickInsideSidenav = sidenav.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);

    if (sidenav.style.width === "250px" && !isClickInsideSidenav && !isClickOnMenuIcon) {
        closeNav();
    }
});

// 2. LÓGICA DE ANIMACIÓN AL SCROLL (SECCIONES)
//    Y 3. LÓGICA DEL LIGHTBOX (UNIDAS)

document.addEventListener('DOMContentLoaded', () => {
    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };
    
    const animatedSection = document.querySelector('.animated-section');
    if (animatedSection) {
        let hasAnimatedKitchen = false; 

        const observerKitchen = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedKitchen) {
                    animatedSection.classList.add('visible'); 
                    document.querySelector('.pizza-img').classList.add('animate');
                    document.querySelector('.chef-hat-img').classList.add('animate');
                    document.querySelector('.jarra-img').classList.add('animate');
                    document.querySelector('.bowl-spoon-img').classList.add('animate');

                    hasAnimatedKitchen = true; 
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        observerKitchen.observe(animatedSection); 
    }
    
    // --- LÓGICA PARA LA SECCIÓN DE OBJETOS DE COMPROMISO (ANIMATED-SECTION-2) ---
    const animatedSection2 = document.querySelector('.animated-section-2');
    if (animatedSection2) {
        let hasAnimatedCommitment = false; 

        const observerCommitment = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedCommitment) {
                    animatedSection2.classList.add('visible'); 
                    document.querySelector('.reloj-img').classList.add('animate-2');
                    document.querySelector('.agenda-img').classList.add('animate-2');
                    document.querySelector('.bonsai-img').classList.add('animate-2');

                    hasAnimatedCommitment = true; 
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        observerCommitment.observe(animatedSection2); 
    }
    
    // --- LÓGICA PARA LA SECCIÓN DE PREPARACIÓN DE POSTRES (ANIMATED-POSTRES-PREP) ---
    const animatedPostresPrep = document.querySelector('.animated-postres-prep');
    if (animatedPostresPrep) {
        let hasAnimatedDessertPrep = false; 

        const observerDessertPrep = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedDessertPrep) {
                    animatedPostresPrep.classList.add('visible'); 
                    document.querySelector('.harina-img').classList.add('animate-prep');
                    document.querySelector('.budin-final-img').classList.add('animate-prep');
                    document.querySelector('.licor-img').classList.add('animate-prep');
                    document.querySelector('.bowl-mezclando-img').classList.add('animate-prep');

                    hasAnimatedDessertPrep = true; 
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        observerDessertPrep.observe(animatedPostresPrep); 
    }

    // --- LÓGICA PARA LA GALERÍA DE FOTOS (SCROLL REVEAL) ---
    const photoItems = document.querySelectorAll('.scroll-reveal-foto');
    if (photoItems.length > 0) {
        const photoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const delay = item.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, delay * 1000); 
                    
                    observer.unobserve(item); 
                }
            });
        }, observerOptions);

        photoItems.forEach(item => {
            photoObserver.observe(item);
        });
    }

    // ===============================================
    // 3. LÓGICA DEL LIGHTBOX/MODAL (GALERÍA) - CORREGIDA Y UNIFICADA
    // ===============================================
    
    // 1. OBTENEMOS LOS ELEMENTOS DEL DOM
    const modalElement = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    // 2. INICIALIZAMOS LA INSTANCIA DE BOOTSTRAP UNA SOLA VEZ
    let imageModalInstance = null;
    if (modalElement) {
        // Inicializa la instancia UNA SOLA VEZ
        imageModalInstance = new bootstrap.Modal(modalElement); 
    }

    // Seleccionamos los elementos de la galería (el div .foto-item)
    const galleryItems = document.querySelectorAll('.foto-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // event.preventDefault() ya no es tan crítico aquí, pero lo dejo por seguridad.
            event.preventDefault(); 
            
            const img = this.querySelector('img');
            
            if (img && imageModalInstance) {
                // 1. Obtener la fuente de la imagen
                const imgSrc = img.getAttribute('src');

                // 2. Establecer esa fuente en la imagen dentro del modal
                modalImage.setAttribute('src', imgSrc);
                
                // 3. MOSTRAR EL MODAL USANDO LA INSTANCIA ÚNICA
                imageModalInstance.show();
            }
        });
    });

// ¡IMPORTANTE! El corchete de cierre del DOMContentLoaded va aquí, al final del archivo.
});