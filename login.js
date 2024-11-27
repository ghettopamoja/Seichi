document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-button button');
    const SignUpBtn = document.querySelector('.signup-button button'); 
    const FirstAuth = document.querySelectorAll('main .auth-div')[0];
    const SecAuth = document.querySelectorAll('main .auth-div')[1];
    const leftDiv = document.querySelector('.left-auth-div');
    const rightDiv = document.querySelector('.right-auth-div');
    const overlay = document.querySelector('.congratulation-overlay');
    const closeBtn = document.querySelector('.congratulation-close span');
    const inputFields = document.querySelectorAll('#signup-form input');

    // Function to show the overlay
    function showOverlay() {
        overlay.classList.add('active');
    }

    // Function to hide the overlay
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });


    const toggleDivs = (showDiv, hideDiv, imageUrl) => {
        hideDiv.classList.remove('active');
        hideDiv.classList.add('inactive');
        showDiv.classList.remove('inactive');
        showDiv.classList.add('active');
        leftDiv.style.backgroundImage = `url("${imageUrl}")`;
    };

    loginBtn.onclick = () => {
        toggleDivs(SecAuth, FirstAuth, 'img1.jpg');
    };

    SignUpBtn.onclick = () => {
        toggleDivs(FirstAuth, SecAuth, 'img2.jpg');
    };


    // Loop through each input field and handle them one by one
    inputFields.forEach((input, index) => {
        console.log(`Input ${index + 1}:`, input); // Log each input field with its index

        // Example: Access each input value and do something with it
        console.log(`Value of Input ${index + 1}:`, input.value);

        // You can also add event listeners for individual inputs
        input.addEventListener('focus', () => {
            console.log(`Input ${index + 1} focused`);
            input.style.backgroundColor = '#e0f7fa'; // Example: change background color on focus
            input.style.color = "#e91e63";
        });

        input.addEventListener('blur', () => {
            console.log(`Input ${index + 1} lost focus`);
            input.style.backgroundColor = ''; // Reset background color
        });
    });


    const fullNameInput = document.querySelector('.form-group #fullName');
    const emailInput = document.querySelector('.form-group #email');
    const passwordInput = document.querySelector('.form-group #password');
    const confirmPasswordInput = document.querySelector('.form-group #confirmPassword');
    
    function ScrollElementToFocus (elements) {
        elements.focus();
        elements.select();
        elements.scrollIntoView({behavior:"smooth", block:"center"});
        elements.style.borderBottom = "red";
    }
    // Now you can perform actions on each input individually
    fullNameInput.addEventListener('focus', () => {
        const isTrue = validateInputs(fullNameInput);
        if(!isTrue){ ScrollElementToFocus(fullNameInput)};
        console.log("Full Name Input focused");
    });
    
    emailInput.addEventListener('focus', () => {
        const isTrue = validateInputs(emailInput);
        if(!isTrue){ ScrollElementToFocus(emailInput)};
        console.log("Email Input focused");
    });
    
    passwordInput.addEventListener('focus', () => {
        const isTrue = validateInputs(passwordInput);
        if(!isTrue){ ScrollElementToFocus(passwordInput)};
        console.log("Password Input focused");
    });
    
    confirmPasswordInput.addEventListener('focus', () => {
        const isTrue = validateInputs(passwordInput);
        if(!isTrue){ ScrollElementToFocus(passwordInput)};
        console.log("Confirm Password Input focused");
    });
    
    // Validation function to check if the input is valid
    function validateInputs(input) {
        if (input.type === "text") {
            // Check if the text input is not empty
            return input.value.trim() !== "";
        } else if (input.type === "email") {
            // Check if the email input is a valid email
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(input.value);
        } else if (input.type === "password") {
            // Check if the password is at least 6 characters long
            return input.value.length >= 6;
        }
        return false; // Default case if input type is unhandled
    }

    
    document.querySelector('#signup-form').onsubmit = async function (e) {
        e.preventDefault(); // Prevent default form submission
    
        const allInputs = [fullNameInput, emailInput, passwordInput, confirmPasswordInput];
        const submitButton = this.querySelector('button');
        submitButton.textContent = "Wait submitting";
    
        let isFormValid = true; // Flag to track if form is valid
    
        // Loop through each input to validate
        for (const field of allInputs) {
            const isValid = validateInputs(field);
            if (!isValid) {
                isFormValid = false; // If any input is invalid, set the flag to false
                field.style.borderColor = 'red'; // Optionally, highlight the invalid field
            } else {
                field.style.borderColor = 'green'; // Optionally, highlight the valid field
            }
        }
    
        if (isFormValid) {
            // If form is valid, proceed with the DOM update and show congratulatory message
            displayCongrats();
    
            submitButton.textContent = 'Sign Up';
            showOverlay(); // Show overlay after form submission
        } else {
            submitButton.textContent = 'Please fix the errors';
        }
    };
    
    // Function to display congratulatory message in the DOM
    function displayCongrats() {
        const liContainer = document.querySelector('.congratulation-content ul');
        const nameUser = document.querySelector('#nameUser');
    
        // Clear any previous content in the list
        liContainer.innerHTML = '';
    
        // Add the full name
        nameUser.textContent = `Welcome, ${fullNameInput.value}`;
    
        // Add other field values to the list
        const fields = [
            { label: 'Full Name', value: fullNameInput.value },
            { label: 'Email', value: emailInput.value },
            { label: 'Password', value: passwordInput.value ? '******' : '' }, // Hide password
            { label: 'Confirm Password', value: confirmPasswordInput.value ? '******' : '' } // Hide password
        ];
    
        // Loop through fields and create list items
        fields.forEach(field => {
            const newLi = document.createElement('li');
            newLi.textContent = `${field.label}: ${field.value}`;
            liContainer.appendChild(newLi);
        });
    }
    
    const userName = document.querySelector('.form-group #username');
    const userEmail = document.querySelector('.form-group #userEmail');
    const userPassword = document.querySelector('.form-group #userPassword');
    const reConfirmPassword = document.querySelector('.form-group #user-confirm-password');
    
    // Display congratulatory message upon successful login
    function displayLoginCongrats() {
        const liContainer = document.querySelector('.congratulation-content ul');
        const nameUser = document.querySelector('#nameUser');
    
        // Clear previous content
        liContainer.innerHTML = '';
    
        // Display username or email
        nameUser.textContent = `Welcome back, ${userName.value || userEmail.value}`;
    
        // Append other field values to the list
        const fields = [
            { label: 'Username', value: userName.value },
            { label: 'Email', value: userEmail.value },
            { label: 'Password', value: userPassword.value ? '******' : '' },  // Hide password
            { label: 'Confirm Password', value: reConfirmPassword.value ? '******' : '' }  // Hide password
        ];
    
        fields.forEach(field => {
            const newLi = document.createElement('li');
            newLi.textContent = `${field.label}: ${field.value}`;
            liContainer.appendChild(newLi);
        });
    }
    
    // Handle login form submission
    document.querySelector('.login-form').onsubmit = function (e) {
        e.preventDefault();
    
        // You can add validation logic here before displaying the congratulations
        if (userName.value && userPassword.value) {
            displayLoginCongrats();  // Show congratulations
            showOverlay();  // Assuming you have a function for displaying the overlay
        } else {
            console.log("Please fill out all fields");
        }
    }
    
});
