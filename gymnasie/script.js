let slideIndex = 0;
showSlide(slideIndex);

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("slide");
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

let mobileSlideIndex = 0;

function showMobileSlides(index) {
    const slides = document.querySelectorAll('.mobile-slide');
    if (index >= slides.length) mobileSlideIndex = 0;
    if (index < 0) mobileSlideIndex = slides.length - 1;

    slides.forEach(slide => (slide.style.display = 'none'));
    slides[mobileSlideIndex].style.display = 'block';
}

function changeMobileSlide(n) {
    showMobileSlides((mobileSlideIndex += n));
}

showMobileSlides(mobileSlideIndex);

let currentGameSlideIndex = 0;

function showGameSlides(index) {
    const slides = document.querySelectorAll('.game-slide');
    const dots = document.querySelectorAll('.dot');

    if (index >= slides.length) currentGameSlideIndex = 0;
    if (index < 0) currentGameSlideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.display = i === currentGameSlideIndex ? 'block' : 'none';
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentGameSlideIndex);
    });
}

function changeGameSlide(n) {
    currentGameSlideIndex += n;
    showGameSlides(currentGameSlideIndex);
}

function currentGameSlide(n) {
    currentGameSlideIndex = n;
    showGameSlides(currentGameSlideIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    showMobileSlides(mobileSlideIndex);
    showGameSlides(currentGameSlideIndex);

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const originalPrice = parseFloat(card.dataset.originalPrice);
        const currentPriceElement = card.querySelector('.current-price');
        const discountInfoElement = card.querySelector('.discount-info');

        if (currentPriceElement) {
            const currentPrice = parseFloat(currentPriceElement.textContent.replace('$', ''));
            const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

            if (!isNaN(discount) && discount > 0) {
                discountInfoElement.textContent = `${discount}% OFF`;
            }
        }
    });
});