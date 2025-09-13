const year = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const today = new Date();
const modificationDate = document.lastModified;

//get current year
year.innerHTML = `<span id="currentyear">&copy ${today.getFullYear()}</span>`;

//Get last modification date and time
modification.innerHTML = `<p id="lastModified">Last Modified: ${modificationDate}</p>`;

// Hamburger menu
const burgerButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

//add click event for hamburger button
burgerButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    burgerButton.classList.toggle("open");
});