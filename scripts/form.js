const year = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const today = new Date();
const modificationDate = document.lastModified;

year.innerHTML = `<span id="currentyear">&copy ${today.getFullYear()}</span>`;
modification.innerHTML = `<p id="lastModified">Last Modified: ${modificationDate}</p>`;

// product array
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

//select element in html
const prodName = document.querySelector("#prod-name"); //select options
const reviewButton = document.querySelector("#rev-button"); //post review button


//populate options in select element
for (let i = 0; i < products.length; i++) {
    const prodItem = products[i];
    prodName.innerHTML += `<option value="${prodItem.id}">${prodItem.name}</option>`;
}

let revCounter = (localStorage.getItem('reviewCount')) || 0;
//When "Post Review" is clicked, do the following:
reviewButton.addEventListener("click", () => {
    revCounter++; //update count
    localStorage.setItem('reviewCount', revCounter); //update local storage counter
});