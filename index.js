//Initializing all element constants
const tempField = document.querySelector(".weather1 span");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");

//Adding event listner to the form
form.addEventListener("submit", search);

//Default Location
let target = "surat";

//Function to fetch data from weather API
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=18a87d6050e54168b0461027230907&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();

        //destructring
        const { current: { temp_c, condition: { icon, text }
        }, location: { name, localtime } } = data;

        // calling update function
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location Not Found");
    }
}

//function to update DOM
function updateDom(temp, name, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullname(new Date(exactDate).getDay());

    tempField.innerText = temp;
    cityField.innerText = name;
    dateField.innerText = `${exactTime} - ${exactDay}  ${exactDate}`
    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);

//function to search the location
function search(e) {
    e.preventDefault();

    target = searchField.value;

    fetchData(target);
}

// function to get the  name of the day
function getDayFullname(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't know";
    }
}