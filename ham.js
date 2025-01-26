// JavaScript to toggle the navigation menu on mobile
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');

// Toggle 'active' class when hamburger is clicked
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});
