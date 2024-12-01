document.addEventListener('DOMContentLoaded', function () {
     // Get the elements
    const content = document.querySelector('main .content');
    const container = document.querySelector('main .container');
    const hamburger = document.querySelector('header nav #hamburger');
    const navLinks = document.getElementById('nav-links');
    const allSections = document.querySelectorAll('main section');
    const searchCart = document.getElementById('search-cart');
    const greetBtn = document.querySelector('.video-intro-container button');
    const femaleVoice = new Audio("ceo.mp3");
    const maleVoice = new Audio("ceo2.mp3");

    let currentVoice = null;
    let isMenuOpen = false;
    let currentIndex = 0;
    let currentIndexs = 0;
    let currentHerosectionImageIndex = 0;
    let interValId;
    let interValdIdTwo;
    let heroInterval;

    const listOfConsideredColors = ["White", "Black", "Blue", "Red", "Green", "Yellow", "Pink", "Gray", "Purple"];
    const listOfConsideredAge = ["Young", "Middle-Age", "Adult", "Senior"];
    const listOfConsideredGender = ["Male", "Female", "Unisex"];
    const listOfConsideredMaterial = ["Cotton", "Polyester", "Silk", "Wool", "Leather", "Linen", "Denim"];
    const listOfConsideredSize = ["S", "M", "L", "XL", "XXL", "XXXL"];
    const listOfConsideredCategory = ["Casual", "Formal", "Sportswear", "Activewear", "Luxury", "Vintage", "Streetwear"];
    const listOfConsideredBrand = ["Seichi Clothing", "Louis Vuitton", "Nike", "Adidas", "Puma", "Gucci", "Levi's"];
    const listOfConsideredSleeveLength = ["Short", "Long", "Sleeveless"];
    const listOfConsideredDesignType = ["Plain", "Written", "Graphic", "Patterned", "Embroidered"];
    const listOfConsideredAffordability = ["Available", "Out of Stock", "Limited Edition"];
    const listOfConsideredPriceRange = ["$0 - $50", "$51 - $100", "$101 - $200", "$201 and above"];


    const introAnimText = [
        "Hey lovebirds! Ready to stand out together in style?",
        "Looking for Couple T-shirts to share your love?",
        "Want to surprise your partner with matching outfits?",
        "Craving to twin with your love and turn heads?",
        "How about expressing your romance with twinning outfits?",
        "Excited to flaunt your love with a stylish match?"
    ];

    const ceoInfo = [
        "Empowering You, One Stitch at a Time.",
        "Designing Beyond Trends, Crafting Timeless Statements.",
        "A Hue of Vibrant Art, Draping the World in Confidence.",
        "Turning Fabrics into Stories, and Customers into Icons.",
        "From Concepts to Closets, She Makes Dreams Wearable.",
        "Where Passion Meets the Seam of Perfection.",
        "Style is Her Canvas, and the World Her Runway",
        "Championing Elegance, Tailored for Every Soul.",
        "Threads of Elegance, Woven with Vision.",
        "A Symphony of Textures, Conducted with Purpose."
    ];

    const myCeoDescription = "Ma Christine Bocacao is a visionary in the world of fashion—a hue of vibrant art, draping the world in confidence. She weaves threads of elegance with purpose, turning fabrics into stories and customers into icons. Passion meets the seam of perfection as she designs beyond trends, crafting timeless statements that empower individuals, one stitch at a time. Her style is a canvas, transforming the world into her runway. From concepts to closets, she makes dreams wearable, championing elegance tailored for every soul. Truly, a symphony of textures conducted with vision and heart.";


    const heroSectionPhotos = ["photo3.jpg", "photo14.jpg", "img2.jpg", "photo7.jpg", "img1.jpg", "photo13.jpg"];
    

    // Toggle the active class on the navbar
    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen; // Toggle the menu state
        document.querySelector('.navbar').classList.toggle('active', isMenuOpen);
    });

    navLinks.querySelectorAll("ul li").forEach(anchor => {
        anchor.addEventListener('click', function () {
            navLinks.querySelectorAll("ul li").forEach(a => a.classList.remove('active'));
            allSections.forEach(sect => sect.style.display = 'none');

            anchor.classList.add('active');

            // Get the href attribute from the anchor's child <a> tag
            const targetId = anchor.querySelector('a').getAttribute('href').substring(1); // Remove the '#' from href

            // Find the corresponding section and display it
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'flex';
            }

            if(targetId === "Home") {
                clearInterval(interValId);
                clearInterval(heroInterval);
                updateUI(0);
                showAnim();
                showHeroSlide();
                loadItems();
            }

            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth' // Optional for smooth scrolling
            });
            

            if(navLinks.classList.contains("show")){
                navLinks.classList.remove("show");
            }

            enableLinks(true);
        })
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

    function enableLinks(state) {
       navLinks.classList.toggle('show', state);
       searchCart.classList.toggle('show', state);

       content.style.display = state ? "none" : "flex";
       container.style.display = state ? "none": "flex";
    }

    function updateUI(index) {
        allSections.forEach(sect => sect.style.display = 'none');
        allSections[index].style.display = "flex";
        navLinks.querySelectorAll("ul li").forEach(a => a.classList.remove('active'));
        navLinks.querySelectorAll("ul li")[index].classList.add('active');
        container.style.display = "none";
        content.style.display = "none";
        
    }

    document.querySelectorAll('.proceed-button button')[0].onclick = function() {
        enableLinks(true);
        updateUI(0);
        showAnim();
        showHeroSlide();
        loadItems();
    }

    document.querySelectorAll('.proceed-button button')[1].onclick = function () {
        enableLinks(true);
        clearInterval(heroInterval);
        showAbout();
        
    }

    

    function showAbout() {
        updateUI(1);
        showAnim2();
        typeWriteDescription(100);
    }

    function typeWriteDescription(speed) {
        const textContainer = document.querySelector(".about-message .text-content");
        let i = 0;
         
    
        // Clear any existing content
        textContainer.innerHTML = "";
    
        function type() {
            if (i < myCeoDescription.length) {
                textContainer.innerHTML += myCeoDescription.charAt(i);
                i++;
                setTimeout(type, speed); // Type next character after the defined speed
            } else {
                // Callback logic once typing is complete
                const readBtns = document.querySelector('.read-buttons');
                readBtns.style.display = "flex";
            }
        }
    
        type(); // Start the typing effect
    }
    
    document.querySelectorAll('.read-buttons button')[0].onclick = function () {
        if(currentVoice && currentVoice !== maleVoice){
            currentVoice.pause();
            currentVoice.currentTime = 0;
        }

        document.querySelectorAll('.read-buttons button')[0].disabled = true;
        document.querySelectorAll('.read-buttons button')[1].disabled = true;

        currentVoice = maleVoice;
        currentVoice.play();
        typeWriteDescription(50);

        currentVoice.onended = function () {
            document.querySelectorAll('.read-buttons button')[0].disabled = false;
            document.querySelectorAll('.read-buttons button')[1].disabled = false;
        }
    }

    document.querySelectorAll('.read-buttons button')[1].onclick = function () {
        if(currentVoice && currentVoice !== femaleVoice){
            currentVoice.pause();
            currentVoice.currentTime = 0;
        }

        document.querySelectorAll('.read-buttons button')[1].disabled = true;
        document.querySelectorAll('.read-buttons button')[0].disabled = true;

        currentVoice = femaleVoice;
        currentVoice.play();
        typeWriteDescription(70);

        currentVoice.onended = function () {
            document.querySelectorAll('.read-buttons button')[1].disabled = false;
            document.querySelectorAll('.read-buttons button')[0].disabled = false;
        }
    }
    

    function showAnim() {
        const animTextHolder = document.querySelector(".animation-header");
        animTextHolder.innerHTML = `<h1>${introAnimText[currentIndex]}</h1>`;

        interValId = setInterval(function () {
            currentIndex = (currentIndex + 1) % introAnimText.length;
            animTextHolder.innerHTML = `<h1>${introAnimText[currentIndex]}</h1>`;
           
        },20000)
    }

    function showAnim2() {
        const animTextHolder = document.querySelector('.ceo-page .header-about .awesome-words');
        animTextHolder.innerHTML = `<h1>${ceoInfo[currentIndexs]}</h1>`;

        interValdIdTwo = setInterval(function () {
            currentIndexs = (currentIndexs + 1) % ceoInfo.length;
            animTextHolder.innerHTML = `<h1>${ceoInfo[currentIndexs]}</h1>`;
        },6000)
    }

    function showHeroSlide() {
        const imageContainer = document.querySelector('.image-slide');
        const timerCount = document.querySelector('.progress-bar');
        const duration = 20; // Duration in seconds
    
        // Initialize the first image
        imageContainer.innerHTML = `<img src="${heroSectionPhotos[currentHerosectionImageIndex]}" alt="Hero_section_photos">`;
    
        // Start the hero slider interval
        heroInterval = setInterval(function () {
            // Update the hero image
            currentHerosectionImageIndex = (currentHerosectionImageIndex + 1) % heroSectionPhotos.length;
            imageContainer.innerHTML = `<img src="${heroSectionPhotos[currentHerosectionImageIndex]}" alt="Hero_section_photos">`;
    
            // Reset and animate the progress bar
            timerCount.style.transition = 'none'; // Disable transition for resetting
            timerCount.style.width = '0%'; // Reset width
            setTimeout(() => {
                timerCount.style.transition = `width ${duration}s linear`; // Smooth transition
                timerCount.style.width = '100%'; // Animate to full width
            }, 50); // Small delay to apply reset before animating
        }, duration * 1000);
    
        // Trigger progress bar animation for the first slide
        timerCount.style.transition = `width ${duration}s linear`;
        timerCount.style.width = '100%';

        loadItems();
    }

    function loadItems() {
        fetch('items.json')
            .then(response => response.json())
            .then(data => {
                const itemList = data; // Now you can access the items
                console.log(itemList);
    
                // Pick 9 random items
                const randomItems = getRandomItems(itemList, 12);
    
                // Distribute 3 items per section
                distributeItems(randomItems);
            })
            .catch(error => console.log('Error loading JSON:', error));
    }
    
    function getRandomItems(itemList, count) {
        if (count > itemList.length) {
            throw new Error("Not enough items to select!");
        }
    
        const selectedItems = [];
        const usedIndices = new Set(); // Track already-used indices
    
        while (selectedItems.length < count) {
            const randomIndex = Math.floor(Math.random() * itemList.length);
    
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                selectedItems.push(itemList[randomIndex]);
            }
        }
    
        return selectedItems;
    }
    
    
    function distributeItems(randomItems) {
        // Distribute 3 items to each section (assuming 3 sections)
        const sections = document.querySelectorAll('.featured-clothings ul');
        
        for (let i = 0; i < sections.length; i++) {
            // Slice 3 items for the current section
            const itemsForSection = randomItems.slice(i * 3, (i + 1) * 3);
            
            itemsForSection.forEach(item => {
                addItemToList(item.title, item.imageSrc, item.newPrice, item.discount, item.quantity, i);
            });
        }
    }
    
    function addItemToList (title, imageSrc, newPrice,discount, quantity,section) {
        const preferedContainer = document.querySelectorAll('.featured-clothings ul')[section];

        const newItem = document.createElement('li');
        newItem.innerHTML = ` 
                <div class="title-design">
                        <h3>${title}</h3>
                </div>

                <div class="image-design">
                        <img src="${imageSrc}" alt="">
                </div>

                <div class="detail-design">
                        <div class="price">

                            <div class="new-price">
                                <span>$${newPrice}</span>
                            </div>

                            <div class="discount-price">
                                <span> $${discount}</span>
                            </div>

                        </div>

                        <div class="left-overs">
                            <span>Left:</span> <span>${quantity}(items)</span>
                        </div>

                        <div class="purchase-button">
                            <button>Buy</button>
                            <button>Add to Cart</button>
                            <button>&#8942;</button>
                        </div>
                </div>`;
        
        preferedContainer.appendChild(newItem);
    }

})


