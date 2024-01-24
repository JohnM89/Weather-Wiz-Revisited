// initializes google places autocomplete
function initAutocomplete() {
    // create the autocomplete object, restricting the search to geographical location types.
    var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('city-search'), {types: ['geocode']});

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }

        var lat = place.geometry.location.lat();
        var lon = place.geometry.location.lng();
        var name = place.name;

        displaySelectedCity(lat, lon, name);
    });
}

// fetches weather data from openweather api
function fetchWeatherData(lat, lon, name) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aba3f63d59afd904c4284a22b4abce80&units=metric`;
    $.ajax({
        url: weatherApiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(weatherData) {
            displayWeatherData(weatherData, name);
            fetchWeatherGif(weatherData.weather[0].description);
        },
        // error handling
        error: function(textStatus, errorThrown) {
            console.error('Weather API error:', textStatus, errorThrown);
        }
    });
}

// fetches 5-day forecast data from openweather api
function fetchForecastData(lat, lon) {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=aba3f63d59afd904c4284a22b4abce80&units=metric`;
    $.ajax({
        url: forecastApiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(forecastData) {
            displayForecastData(forecastData);
        },
        // error handling
        error: function(textStatus, errorThrown) {
            console.error('Forecast API error:', textStatus, errorThrown);
        }
    });
}

// fetches gif from giphy api
function fetchWeatherGif(description) {
    const giphyApiKey = 'blXxFpwLERXSIKJhGmvWsJxWNe5McfrC';
    const searchQuery = `${description}`; //description for gif search (sometimes produces unrelated gifs lol)
    const giphyApiUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=${searchQuery}`;

    $.ajax({
        url: giphyApiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            displayWeatherGif(response.data.images.fixed_height.url);
        },
        error: function(textStatus, errorThrown) {
            console.error('Giphy API error:', textStatus, errorThrown);
        }
    });
}

// displays current weather data including temperature, description, wind speed, and humidity
function displayWeatherData(weatherData, cityName) {
    $('#current-weather > h2').html(`Weather in ${cityName}`);
    $('#weather-details').html(`
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Description: ${weatherData.weather[0].description}</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
    `);
}


// displays 5-day weather forecast
function displayForecastData(forecastData) {
    let addedDays = {};
    var forecastHtml = forecastData.list.filter(forecast => {
        const date = new Date(forecast.dt * 1000).toDateString();
        if (!addedDays[date]) {
            addedDays[date] = true;
            return true;
        }
        return false;
    }).map(forecast => {
        const date = new Date(forecast.dt * 1000).toDateString();
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        // return each forecast item in html
        return `<div class="forecast-item">
                    <h3>${date}</h3>
                    <p>Temperature: ${temp}°C</p>
                    <p>Description: ${description}</p>
                </div>`;
    }).join('');

    $('#forecast-container').html(forecastHtml);
}

// displays weather gif in specified elements
function displayWeatherGif(gifUrl) {
    var gifHtml = `<img src="${gifUrl}" alt="Weather Gif" class="gif">`;
    $('#weather-gif').html(gifHtml);
    $('#weather-gif-2').html(gifHtml);
}

// saves selected city to local storage
function saveSelectedCity(lat, lon, name) {
    const selectedCity = { lat, lon, name };
    localStorage.setItem('selectedCity', JSON.stringify(selectedCity));

    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.unshift(selectedCity); // add the new city to the beginning of the array
    searches = searches.slice(0, 3); // last 3 searches
    localStorage.setItem('searches', JSON.stringify(searches));
}

// displays search history in footer with onclick event
function displaySearchHistory() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    let searchHistoryHtml = searches.map(city => 
        `<button onclick="displaySelectedCity(${city.lat}, ${city.lon}, '${city.name}', true)">${city.name}</button>`
    ).join('');
    $('#search-history').html(searchHistoryHtml);
}


// displays selected city's weather and saves to local storage
function displaySelectedCity(lat, lon, name, fromHistory = false) {
    $('#current-weather > h2').html(name);
    if (!fromHistory) {
        saveSelectedCity(lat, lon, name);
    }
    fetchWeatherData(lat, lon, name);
    fetchForecastData(lat, lon);
    if (!fromHistory) {
        displaySearchHistory();
    }
}


$(document).ready(function() {
    initAutocomplete();

    // display the most recent city's weather data
    const storedCity = JSON.parse(localStorage.getItem('selectedCity'));
    if (storedCity && storedCity.lat && storedCity.lon && storedCity.name) {
        displaySelectedCity(storedCity.lat, storedCity.lon, storedCity.name);
    }

    // display search history in the footer
    displaySearchHistory();
});
