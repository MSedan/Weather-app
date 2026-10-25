const tempType = document.querySelectorAll('input[name="temp-type"]');
const apiKey = "038ccd02c25a408ba8a175919262510";
const city = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const suggestionsList = document.getElementById("suggestions-list");

let currentWeatherData = null;

city.addEventListener("input", async function(e) {
    e.preventDefault();
    const query = city.value.trim();

    if (query.length < 2) {
        suggestionsList.innerHTML = "";
        suggestionsList.style.display = "none";
        return;
    }

    const searchUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`;

    try {
        const res = await fetch(searchUrl);
        const locations = await res.json();
        console.log("Fetched locations:", locations);

        suggestionsList.innerHTML = "";
        if (locations.length > 0) {
            suggestionsList.style.display = "block";
            locations.forEach(loc => {
                const li = document.createElement("li");
                li.textContent = `${loc.name}, ${loc.country}`;
                
                // When a suggestion is clicked, fill the input and fetch weather
                li.addEventListener("click", function() {
                    city.value = loc.name;
                    suggestionsList.innerHTML = "";
                    suggestionsList.style.display = "none";
                    getWeather(loc.name);
                });

                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
});

// Hide suggestion list if user clicks anywhere outside of it
document.addEventListener("click", function(e) {
    if (!city.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.style.display = "none";
    }
});

async function getWeather(city) {

const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
try {
    const res = await fetch(url);
    currentWeatherData = await res.json();
    console.log(currentWeatherData);
  
    cityName = document.getElementById("city-name");
    cityName.textContent = currentWeatherData.location.name;

    temperature = document.getElementById("temperature");
    temperature.textContent = `Temperature: ${currentWeatherData.current.temp_c}°C`;

    description = document.getElementById("description");
    description.textContent = `Description: ${currentWeatherData.current.condition.text}`;
    weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
    weatherIcon.src = currentWeatherData.current.condition.icon;
    weatherIcon.alt = currentWeatherData.current.condition.text;

    windSpeed = document.getElementById("wind-speed");
    windSpeed.textContent = `Wind speed: ${currentWeatherData.current.wind_kph} kph`;
    forecastWeather();
} catch (error) {
    console.error("Error fetching weather data:", error);
}}

function forecastWeather() {

    // Display forecast for the next 3 days
    // Day 1 date
    forecastDay1 = document.getElementById("forecast-date-1");
    forecastDay1.textContent = `${formatDate(currentWeatherData.forecast.forecastday[0].date)}`;

// Day 1 temperature
    forecastTempDay1 = document.getElementById("forecast-temp-1");
    forecastTempDay1.textContent = `Temp: ${currentWeatherData.forecast.forecastday[0].day.avgtemp_c}°C`;

    //Day 1 icon
    forecastIconDay1 = document.getElementById("forecast-icon-1");
    forecastIconDay1.src = currentWeatherData.forecast.forecastday[0].day.condition.icon;
    forecastIconDay1.alt = currentWeatherData.forecast.forecastday[0].day.condition.text;
    forecastIconDay1.style.display = "block";

    // Day 1 description
    forecastDescriptionDay1 = document.getElementById("forecast-desc-1");
    forecastDescriptionDay1.textContent = `${currentWeatherData.forecast.forecastday[0].day.condition.text}`;

    //Day 1 wind speed
    forecastWindDay1 = document.getElementById("forecast-wind-1");
    forecastWindDay1.textContent = `Wind speed: ${currentWeatherData.forecast.forecastday[0].day.maxwind_kph} kph`;


    // Day 2 date
    forecastDay2 = document.getElementById("forecast-date-2");
    forecastDay2.textContent = `${formatDate(currentWeatherData.forecast.forecastday[1].date)}`;

    // Day 2 temperature
    forecastTempDay2 = document.getElementById("forecast-temp-2");
    forecastTempDay2.textContent = `Temp: ${currentWeatherData.forecast.forecastday[1].day.avgtemp_c}°C`;

    // Day 2 icon
    forecastIconDay2 = document.getElementById("forecast-icon-2");
    forecastIconDay2.src = currentWeatherData.forecast.forecastday[1].day.condition.icon;
    forecastIconDay2.alt = currentWeatherData.forecast.forecastday[1].day.condition.text;
    forecastIconDay2.style.display = "block";
    
    // Day 2 description
   forecastDescriptionDay2 = document.getElementById("forecast-desc-2");
    forecastDescriptionDay2.textContent = `${currentWeatherData.forecast.forecastday[1].day.condition.text}`;

    // Day 2 wind speed
    forecastWindDay2 = document.getElementById("forecast-wind-2");
    forecastWindDay2.textContent = `Wind speed: ${currentWeatherData.forecast.forecastday[1].day.maxwind_kph} kph`;


    // Day 3 date
    forecastDay3 = document.getElementById("forecast-date-3");
    forecastDay3.textContent = `${formatDate(currentWeatherData.forecast.forecastday[2].date)}`;

    //Day 3 temperature
    forecastTempDay3 = document.getElementById("forecast-temp-3");
    forecastTempDay3.textContent = `Temp: ${currentWeatherData.forecast.forecastday[2].day.avgtemp_c}°C`;

    //Day 3 icon
    forecastIconDay3 = document.getElementById("forecast-icon-3");
    forecastIconDay3.src = currentWeatherData.forecast.forecastday[2].day.condition.icon;
    forecastIconDay3.alt = currentWeatherData.forecast.forecastday[2].day.condition.text;
    forecastIconDay3.style.display = "block";

    //Day 3 description
    forecastDescriptionDay3 = document.getElementById("forecast-desc-3");
    forecastDescriptionDay3.textContent = `${currentWeatherData.forecast.forecastday[2].day.condition.text}`;

    //Day 3 wind speed
    forecastWindDay3 = document.getElementById("forecast-wind-3");
    forecastWindDay3.textContent = `Wind speed: ${currentWeatherData.forecast.forecastday[2].day.maxwind_kph} kph`;
}

tempType.forEach((radio) => {
    radio.addEventListener("change", function(e) {
        e.preventDefault();
        if (e.target.value === "fahrenheit") {
            temperature = document.getElementById("temperature");
            temperature.textContent = `Temperature: ${currentWeatherData.current.temp_f}°F`;
            temperature = document.getElementById("forecast-temp-1");
            temperature.textContent = `Day 1: ${currentWeatherData.forecast.forecastday[0].day.avgtemp_f}°F`;
            temperature = document.getElementById("forecast-temp-2");
            temperature.textContent = `Day 2: ${currentWeatherData.forecast.forecastday[1].day.avgtemp_f}°F`;
            temperature = document.getElementById("forecast-temp-3");
            temperature.textContent = `Day 3: ${currentWeatherData.forecast.forecastday[2].day.avgtemp_f}°F`;
        } else {
            temperature = document.getElementById("temperature");
            temperature.textContent = `Temperature: ${currentWeatherData.current.temp_c}°C`;
            temperature = document.getElementById("forecast-temp-1");
            temperature.textContent = `Day 1: ${currentWeatherData.forecast.forecastday[0].day.avgtemp_c}°C`;
            temperature = document.getElementById("forecast-temp-2");
            temperature.textContent = `Day 2: ${currentWeatherData.forecast.forecastday[1].day.avgtemp_c}°C`;
            temperature = document.getElementById("forecast-temp-3");
            temperature.textContent = `Day 3: ${currentWeatherData.forecast.forecastday[2].day.avgtemp_c}°C`;
        }
    });
});


document.getElementById("search-button").addEventListener("click", function(e){
    e.preventDefault();
    getWeather(city.value);
})

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}





