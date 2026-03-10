/**
 * Página Doces - Cardápio digital
 * Modal, carrossel e interações
 */

document.addEventListener('DOMContentLoaded', () => {
    initDocesCarousel();
    initDocesModal();
    initDocesCardClick();
});

// ============================================
// CARROSSEL NOS CARDS
// ============================================
function initDocesCarousel() {
    document.querySelectorAll('.doces-card--carousel [data-carousel]').forEach((carouselEl) => {
        const images = carouselEl.querySelectorAll('img');
        if (images.length <= 1) return;

        const card = carouselEl.closest('.doces-card');
        const prevBtn = card.querySelector('.doces-carousel-prev');
        const nextBtn = card.querySelector('.doces-carousel-next');

        let index = 0;

        function updateCarousel() {
            carouselEl.style.transform = `translateX(-${index * 100}%)`;
        }

        prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            index = (index - 1 + images.length) % images.length;
            updateCarousel();
        });

        nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            index = (index + 1) % images.length;
            updateCarousel();
        });
    });
}

// ============================================
// MODAL DOCES
// ============================================
const DOCES_DATA = {};

function initDocesModal() {
    document.querySelectorAll('.doces-card').forEach((card) => {
        const id = card.getAttribute('data-doces-id');
        const imagesJson = card.getAttribute('data-images');
        const images = imagesJson ? JSON.parse(imagesJson) : [];
        const title = card.querySelector('h3')?.textContent || '';
        const description = card.querySelector('.produto-info p')?.textContent || '';
        const price = card.querySelector('.produto-price')?.textContent || '';
        const whatsappProduct = card.querySelector('[data-product]')?.getAttribute('data-product') || `${title} - ${price}`;

        DOCES_DATA[id] = { id, images, title, description, price, whatsappProduct };
    });

    const overlay = document.getElementById('doces-modal-overlay');
    const modal = document.getElementById('doces-modal');
    const closeBtn = document.getElementById('doces-modal-close');
    const carouselEl = document.getElementById('doces-modal-carousel');
    const prevBtn = document.getElementById('doces-modal-prev');
    const nextBtn = document.getElementById('doces-modal-next');
    const whatsappBtn = document.getElementById('doces-modal-whatsapp-btn');

    let modalImages = [];
    let modalIndex = 0;

    function openModal(docesId) {
        const data = DOCES_DATA[docesId];
        if (!data) return;

        modalImages = data.images;
        modalIndex = 0;

        // Montar carrossel do modal
        carouselEl.innerHTML = modalImages
            .map((src) => `<img src="${src}" alt="${data.title}">`)
            .join('');

        document.getElementById('doces-modal-title').textContent = data.title;
        document.getElementById('doces-modal-description').textContent = data.description;
        document.getElementById('doces-modal-price').textContent = data.price;
        whatsappBtn?.setAttribute('data-product', data.whatsappProduct);

        updateModalCarousel();

        overlay?.classList.add('is-open');
        overlay?.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay?.classList.remove('is-open');
        overlay?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateModalCarousel() {
        if (!carouselEl) return;
        carouselEl.style.transform = `translateX(-${modalIndex * 100}%)`;

        const showNav = modalImages.length > 1;
        prevBtn.style.display = showNav ? 'flex' : 'none';
        nextBtn.style.display = showNav ? 'flex' : 'none';
    }

    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (modalImages.length <= 1) return;
        modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
        updateModalCarousel();
    });

    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (modalImages.length <= 1) return;
        modalIndex = (modalIndex + 1) % modalImages.length;
        updateModalCarousel();
    });

    window.openDocesModal = openModal;
    window.closeDocesModal = closeModal;

    closeBtn?.addEventListener('click', closeModal);

    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay?.classList.contains('is-open')) {
            closeModal();
        }
    });
}

// ============================================
// CLIQUE NO CARD ABRE MODAL
// ============================================
function initDocesCardClick() {
    document.querySelectorAll('.doces-card').forEach((card) => {
        card.addEventListener('click', (e) => {
            const isLink = e.target.closest('a') || e.target.closest('button');
            if (isLink && !e.target.closest('[data-open-doces-modal]')) return;

            const docesId = card.getAttribute('data-doces-id');
            if (docesId) {
                window.openDocesModal?.(docesId);
            }
        });
    });

    document.querySelectorAll('[data-open-doces-modal]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.doces-card');
            const docesId = card?.getAttribute('data-doces-id');
            if (docesId) {
                window.openDocesModal?.(docesId);
            }
        });
    });
}

