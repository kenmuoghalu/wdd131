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

// Temple object:
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "Urdaneta Philippines",
        location: "Urdaneta City, Pangasinan, Philippines",
        dedicated: "2024, April, 28",
        area: 32604,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45856.jpg"
    },
    {
        templeName: "Manila Philippines",
        location: "Metro Manila, Philippines",
        dedicated: "1984, September, 27",
        area: 26683,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/_temp/029-Manila-Philippines-Temple.jpg"
    },
    {
        templeName: "Calgary Alberta",
        location: "Calgary, Alberta, Canada",
        dedicated: "2012, October, 28",
        area: 33000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/calgary-alberta-temple/calgary-alberta-temple-3888.jpg"
    },

];


//select buttons
const homeLink = document.querySelector("#home");
const oldLink = document.querySelector("#old");
const newLink = document.querySelector("#new");
const largeLink = document.querySelector("#large");
const smallLink = document.querySelector("#small");

//select the Page title
const pageHeading = document.querySelector("#page-title");

//populate photo grid
createTempleCards(temples);


//add event listeners to navigation
homeLink.addEventListener("click", () => {
    pageHeading.textContent = 'Home';
    createTempleCards(temples);
});

oldLink.addEventListener("click", () => {
    pageHeading.textContent = 'Old Temples';
    createTempleCards(temples.filter(temple => Number(temple.dedicated.substring(0, 4)) < 1900));
});

newLink.addEventListener("click", () => {
    pageHeading.textContent = 'New Temples';
    createTempleCards(temples.filter(temple => Number(temple.dedicated.substring(0, 4)) > 2000));
});

largeLink.addEventListener("click", () => {
    pageHeading.textContent = 'Large Temples';
    createTempleCards(temples.filter(temple => temple.area > 90000));
});

smallLink.addEventListener("click", () => {
    pageHeading.textContent = 'Small Temples';
    createTempleCards(temples.filter(temple => temple.area < 10000));
});



/*---------------------------------------------------------------------------------------------------------- 
Function: createTempleCards (templeObj, container)
Purpose: create temple cards which will populate in the HTML element specified.
Description: Has one arguements, "templeObj" which is the name of the obj you want to iterate through.
            It will populate the photo grid with temple cards when called.
------------------------------------------------------------------------------------------------------------*/
function createTempleCards(templeObj) {
    //select the div
    const templeDiv = document.querySelector(".photo-grid");

    //empty the div
    templeDiv.innerHTML = "";

    //populate the div
    for (let i = 0; i < templeObj.length; i++) {
        const temple = templeObj[i];
        templeDiv.innerHTML += `
            <figure>
                <h3>${temple.templeName}</h3>
                <ul>
                    <li>LOCATION: ${temple.location}</li>
                    <li>DEDICATED: ${temple.dedicated}</li>
                    <li>SIZE: ${temple.area} sq ft</li>
                </ul>
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading = lazy>
            </figure>`;
    }
}