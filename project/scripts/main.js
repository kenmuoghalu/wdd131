// Current year and last modified date
const year = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const today = new Date();
const modificationDate = document.lastModified;

// Get current year
if (year) {
    year.innerHTML = `<span id="currentyear">&copy ${today.getFullYear()}</span>`;
}

// Get last modification date and time
if (modification) {
    modification.innerHTML = `<p id="lastModified">Last Modified: ${modificationDate}</p>`;
}

// Hamburger menu functionality
const burgerButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (burgerButton && navigation) {
    // Add click event for hamburger button
    burgerButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        burgerButton.classList.toggle("open");
        
        // Update aria-expanded attribute for accessibility
        const isExpanded = navigation.classList.contains("open");
        burgerButton.setAttribute("aria-expanded", isExpanded);
    });
}

// Newsletter form functionality
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

if (newsletterForm && formMessage) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'error';
            return;
        }
        
        // Simulate form submission
        formMessage.textContent = 'Thank you for subscribing to our newsletter!';
        formMessage.className = 'success';
        
        // Clear the form
        newsletterForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);
        
        // In a real application, you would send the data to a server here
        console.log('Newsletter subscription:', email);
    });
}

// Utility function to get saved data from localStorage
function getSavedData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
    }
}

// Utility function to save data to localStorage
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
        return false;
    }
}