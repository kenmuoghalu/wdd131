const year = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const today = new Date();
const modificationDate = new Date(document.lastModified);

// Format the modification date for better readability
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const formattedModDate = modificationDate.toLocaleDateString('en-US', options);

year.innerHTML = `<span id="currentyear">&copy ${today.getFullYear()}</span>`;
modification.innerHTML = `<p id="lastModified">Last Modified: ${formattedModDate}</p>`;