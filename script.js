document.addEventListener('DOMContentLoaded', function () {
     // Get the elements
    const hamburger = document.querySelector('header nav #hamburger');
    const navLinks = document.getElementById('nav-links');
    const searchCart = document.getElementById('search-cart');
    const greetBtn = document.querySelector('.video-intro-container button');
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

    greetBtn.onclick = function () {
        ScrollToGreetings();
    }

    function ScrollToGreetings() {
        const gmessage1 = document.querySelector('.logo-greeting-image');
        const gmessage2 = document.querySelector('.gratitude-message');

        gmessage1.style.display ='flex';
        gmessage2.style.display ='flex';

        gmessage1.scrollIntoView({behavior:"smooth", block:"center"});

        setTimeout(function () {
            gmessage2.scrollIntoView({behavior:"smooth", block:"center"});
        },1000);

    }
})


