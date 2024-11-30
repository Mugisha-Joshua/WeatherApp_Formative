const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const forecastSection = document.getElementById('forecast-section');
const errorMessage = document.getElementById('error-message');

// Weather icons mapping
const weatherIcons = {
    0: '☀️', // Clear sky
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️', // Overcast
    45: '🌫️', // Foggy
    48: '🌫️', // Depositing rime fog
    51: '🌧️', // Light drizzle
    53: '🌧️', // Moderate drizzle
    55: '🌧️', // Dense drizzle
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    71: '❄️', // Slight snow fall
    73: '❄️', // Moderate snow fall
    75: '❄️', // Heavy snow fall
    77: '❄️', // Snow grains
    80: '🌧️', // Slight rain showers
    81: '🌧️', // Moderate rain showers
    82: '🌧️', // Violent rain showers
    85: '❄️', // Slight snow showers
    86: '❄️', // Heavy snow showers
    95: '⛈️', // Thunderstorm
    96: '⛈️', // Thunderstorm with light hail
    99: '⛈️'  // Thunderstorm with heavy hail
};

// Geocoding function to get coordinates
async function getCoordinates(city) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('City not found');
        }

        return {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            name: data.results[0].name,
            country: data.results[0].country
        };
    } catch (error) {
        throw new Error('Unable to find location');
    }
}

// Fetch weather data
async function fetchWeatherData(coordinates) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
        const data = await response.json();

        return {
            ...coordinates,
            current: {
                temp: Math.round(data.current_weather.temperature),
                windSpeed: Math.round(data.current_weather.windspeed),
                weatherCode: data.current_weather.weathercode
            },
            daily: data.daily
        };
    } catch (error) {
        throw new Error('Unable to fetch weather data');
    }
}

// Update UI with weather data
function updateWeatherUI(weatherData) {
    // Clear previous error
    errorMessage.textContent = '';

    // Update location and date
    cityName.textContent = `${weatherData.name}, ${weatherData.country}`;
    currentDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Update temperature
    currentTemp.textContent = weatherData.current.temp;

    // Update weather icon
    weatherIcon.innerHTML = `<div style="font-size: 80px;">${weatherIcons[weatherData.current.weatherCode] || '🌈'}</div>`;

    // Update additional details
    windSpeed.textContent = `${weatherData.current.windSpeed} km/h`;
    humidity.textContent = `-`; // Humidity is not provided in the current API request but can be added if needed

    // Update forecast
    forecastSection.innerHTML = weatherData.daily.time
        .map((date, index) => {
            return `
                <div class="forecast-item">
                    <p>${new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <div>${weatherIcons[weatherData.daily.weathercode[index]] || '🌈'}</div>
                    <p>${weatherData.daily.temperature_2m_min[index]}°C / ${weatherData.daily.temperature_2m_max[index]}°C</p>
                </div>`;
        })
        .join('');
}

// Handle search click
searchBtn.addEventListener('click', async () => {
    const city = locationInput.value.trim();

    if (!city) {
        errorMessage.textContent = 'Please enter a city name';
        return;
    }

    try {
        const coordinates = await getCoordinates(city);
        const weatherData = await fetchWeatherData(coordinates);
        updateWeatherUI(weatherData);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
