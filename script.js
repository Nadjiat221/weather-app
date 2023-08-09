const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherData = document.getElementById('weatherData');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const loading = document.getElementById('loading');

const apiKey = 'd5b5d5e0bc34672065b36ee975cb27b0'; // Replace with your actual API key from a weather service provider.

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location === '') {
        alert('Please enter a location.');
        return;
    }
    getWeatherData(location);
});

function showLoading() {
    weatherData.classList.add('hidden');
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
    weatherData.classList.remove('hidden');
}

async function getWeatherData(location) {
    console.log("++++++++++++", location)
    showLoading();

    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    
        const data = await response.json();
        console.log(data, "##################");
        if (data.cod !== 200) {
            console.log(data, "#########error happen#########");
            throw new Error(data.message);
        }
        const weatherInfo = processWeatherData(data);
        displayWeatherData(weatherInfo);
        hideLoading();
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        hideLoading();
    }
}

function processWeatherData(data) {
    return {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
    };
}

function displayWeatherData(weatherInfo) {
    locationName.textContent = `Location: ${weatherInfo.location}`;
    temperature.textContent = `Temperature: ${weatherInfo.temperature}°C`;
    description.textContent = `Description: ${weatherInfo.description}`;
}
