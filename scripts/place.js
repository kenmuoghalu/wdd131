const year = document.querySelector("#currentyear");
const modification = document.querySelector("#lastModified");
const today = new Date();
const modificationDate = document.lastModified;

//Get last modified date and time ; get current year
year.innerHTML = `<span id="currentyear">&copy ${today.getFullYear()}</span>`;
modification.innerHTML = `<p id="lastModified">Last Modified: ${modificationDate}</p>`;

//Calculate Wind Chill
//Wind Chill (ºC) = 13.12 + 0.6215 T - 11.37 (V^0.16) + 0.3965 T (V^0.16)
// Where: T - Air Temperature in Celsius
//        V - Wind speed in kilometers per hour (km/h)

const windChillstr = document.querySelector("#windChill");
const tempstr = document.querySelector("#temp"); //container for temperature in Celsius
const windSpeedstr = document.querySelector("#windSpeed"); //container for windSpeed in km.h

//Function to calculate wind Chill
function calculateWindChill(temp, windSpeed) {
    return 13.12 + (0.6216 * temp) - (11.37 * (windSpeed ** 0.16)) + (0.3965 * temp * (windSpeed ** 0.16));

}

//Convert values into numbers
let tempVal = Number(tempstr.innerHTML);
let windSpeedVal = Number(windSpeedstr.innerHTML);
let windChillVal = 0;

//Evaluate result
if (tempVal <= 10 && windSpeedVal > 4.8) {
    windChillVal = calculateWindChill(tempVal, windSpeedVal);
} else {
    windChillVal = 0;
}

if (windChillVal != 0) {
    windChillstr.innerHTML = `<td id="#windChill">${String(windChillVal)}</td>`;
} else {
    windChillstr.innerHTML = `<td id="#windChill"> N/A </td>`;
}