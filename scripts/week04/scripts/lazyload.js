// Footer: Last Modified Date and Current Year
const year = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const today = new Date();
const modificationDate = document.lastModified;

year.innerHTML = `<span id="currentyear">&copy ${today.getFullYear()}</span>`;
modification.innerHTML = `<p id="lastModified">Last Modified: ${modificationDate}</p>`;