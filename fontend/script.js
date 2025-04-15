const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const searchButton = document.querySelector('.search-button');
const searchModal = document.querySelector('.search-modal');
const closeSearchButton = document.querySelector('.close-search');

if (searchButton && searchModal && closeSearchButton) {
  searchButton.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchModal.classList.remove('hidden');
  });

  closeSearchButton.addEventListener('click', () => {
    searchModal.classList.remove('active');
    searchModal.classList.add('hidden');
  });

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('active');
      searchModal.classList.add('hidden');
    }
  });
}

const loginButtons = document.querySelectorAll('.login-button');
const authModal = document.querySelector('.auth-modal');
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const closeAuthButton = document.querySelector('.close-auth');
const switchToSignupButton = document.querySelector('.switch-to-signup-button');
const switchToLoginButton = document.querySelector('.switch-to-login-button');

loginButtons.forEach(button => {
  button.addEventListener('click', () => {
    authModal.classList.add('active');
    authModal.classList.remove('hidden');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });
});

closeAuthButton.addEventListener('click', () => {
  authModal.classList.remove('active');
  authModal.classList.add('hidden');
});

switchToSignupButton.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
});

switchToLoginButton.addEventListener('click', () => {
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.remove('active');
    authModal.classList.add('hidden');
  }
});

const slideshowContainer = document.querySelector('.slideshow-container');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 1;
let slideWidth = slides[0].clientWidth;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

slideshowContainer.appendChild(firstClone);
slideshowContainer.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.slide');
slideshowContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
slideshowContainer.style.transition = 'transform 0.5s ease-in-out';

function moveToSlide(index) {
  slideshowContainer.style.transition = 'transform 0.5s ease-in-out';
  slideshowContainer.style.transform = `translateX(-${index * slideWidth}px)`;
}

function handleTransitionEnd() {
  const actualSlides = document.querySelectorAll('.slide:not(.clone)');
  if (allSlides[currentIndex].classList.contains('clone')) {
    slideshowContainer.style.transition = 'none';
    if (currentIndex === 0) {
      currentIndex = actualSlides.length;
    } else if (currentIndex === allSlides.length - 1) {
      currentIndex = 1;
    }
    slideshowContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
}

nextButton.addEventListener('click', () => {
  if (currentIndex >= allSlides.length - 1) return;
  currentIndex++;
  moveToSlide(currentIndex);
});

prevButton.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  moveToSlide(currentIndex);
});

slideshowContainer.addEventListener('transitionend', handleTransitionEnd);

window.addEventListener('resize', () => {
  slideWidth = document.querySelector('.slide').clientWidth;
  moveToSlide(currentIndex);
});

const user_id = 1;

document.querySelectorAll('.watchlist-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    const movie_id = index + 1; // Update this to get actual movie IDs from backend
    fetch("http://localhost:8008/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id, movie_id })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Added to watchlist!");
    })
    .catch(err => {
      console.error("Error adding to watchlist:", err);
    });
  });
});

// Only run on watchlist.html
if (window.location.pathname.includes("watchlist.html")) {
  const user_id = 1; // Again, get this from login state/session
  fetch(`http://localhost:8008/watchlist?user_id=${user_id}`)
    .then(res => res.json())
    .then(movies => {
      const container = document.querySelector(".watchlist-grid");
      container.innerHTML = ""; // Clear placeholder

      movies.forEach(movie => {
        const div = document.createElement("div");
        div.className = "watchlist-item";
        div.innerHTML = `
          <img src="${movie.image_url}" alt="${movie.title}" />
          <div class="watchlist-info">
            <h2>${movie.title}</h2>
            <p>${movie.description}</p>
          </div>
        `;
        container.appendChild(div);
      });
    });
}

document.querySelector(".submit-signup").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const msg = await res.text();
  alert(msg);
});

document.querySelector(".submit-login").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // important for session cookies
  });

  const msg = await res.text();
  alert(msg);
});

