// Get the elements
const hamburger = document.querySelector('header nav #hamburger');
const navLinks = document.getElementById('nav-links');
const searchCart = document.getElementById('search-cart');
let isMenuOpen = false;

// Toggle the active class on the navbar
hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen; // Toggle the menu state
    document.querySelector('.navbar').classList.toggle('active', isMenuOpen);
});

// Close the navbar if clicked outside
document.addEventListener('click', (event) => {
    if (!document.querySelector('.navbar').contains(event.target) && isMenuOpen) {
        isMenuOpen = false; // Close the menu
        document.querySelector('.navbar').classList.remove('active');
    }
});
