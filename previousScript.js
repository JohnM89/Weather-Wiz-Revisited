// $(document).ready(function() {
//     // Initialize the Google Places Autocomplete
//     var autocomplete;
//     initAutocomplete();

//     // Define initAutocomplete function
//     function initAutocomplete() {
//         // Create the autocomplete object, restricting the search to geographical location types.
//         autocomplete = new google.maps.places.Autocomplete(
//             document.getElementById('city-search'), { types: ['geocode'] });

//         // When the user selects an address from the dropdown, fetch weather data.
//         autocomplete.addListener('place_changed', function() {
//             var place = autocomplete.getPlace();
//             if (!place.geometry) {
//                 console.log("No details available for input: '" + place.name + "'");
//                 return;
//             }

//             // Using the coordinates of the selected place to fetch weather data
//             var lat = place.geometry.location.lat();
//             var lon = place.geometry.location.lng();
//             var name = place.name;

//             // Display the selected city
//             displaySelectedCity(lat, lon, name);
//         });
//     }

//     function fetchWeatherData(lat, lon, name) {
//         const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aba3f63d59afd904c4284a22b4abce80&units=metric`;
//         $.ajax({
//             url: weatherApiUrl,
//             method: 'GET',
//             dataType: 'json',
//             success: function(weatherData) {
//                 displayWeatherData(weatherData, name);
//             },
//             error: function(textStatus, errorThrown) {
//                 console.error('Weather API error:', textStatus, errorThrown);
//             }
//         });
//     }

//     function fetchForecastData(lat, lon) {
//         const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=aba3f63d59afd904c4284a22b4abce80&units=metric`;

//         $.ajax({
//             url: forecastApiUrl,
//             method: 'GET',
//             dataType: 'json',
//             success: function(forecastData) {
//                 displayForecastData(forecastData);
//             },
//             error: function(textStatus, errorThrown) {
//                 console.error('Forecast API error:', textStatus, errorThrown);
//             }
//         });
//     }

//     // Function to fetch GIF from Giphy API
// function fetchWeatherGif(description) {
//     const giphyApiKey = 'blXxFpwLERXSIKJhGmvWsJxWNe5McfrC';
//      const searchQuery = `nature ${description}`;
//     const giphyApiUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=${searchQuery}`;

//     $.ajax({
//         url: giphyApiUrl,
//         method: 'GET',
//         dataType: 'json',
//         success: function(response) {
//             displayWeatherGif(response.data.images.fixed_height.url);
//         },
//         error: function(textStatus, errorThrown) {
//             console.error('Giphy API error:', textStatus, errorThrown);
//         }
//     });
// }

// function fetchNearbyWebcams(lat, lon) {
//     const webcamsApiKey = 'b0boBHgQldxFvHwZRo1uO7u8ht6nNL30';
//     const radius = 50; // Radius in kilometers
//     const webcamsApiUrl = `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},${radius}?show=webcams:location,image,player&key=${webcamsApiKey}&limit=10`; // Adjust limit to show more webcams

//     $.ajax({
//         url: webcamsApiUrl,
//         method: 'GET',
//         dataType: 'json',
//         success: function(response) {
//         if (response.result && response.result.webcams && response.result.webcams.length > 0) {
//             // Randomly select one webcam from the list
//             const randomIndex = Math.floor(Math.random() * response.result.webcams.length);
//             const selectedWebcam = response.result.webcams[randomIndex];
            
//             displayWebcam(selectedWebcam);
//         } else {
//             console.log('No webcams found');
//         }
//     },
//     error: function(textStatus, errorThrown) {
//         console.error('Webcams API error:', textStatus, errorThrown);
//     }
//     });
// }

// function displayWebcam(webcam) {
//     // Create HTML for a single webcam
//     var webcamHtml = `
//         <div class="webcam-item">
//             <h3>${webcam.title}</h3>
//             <img src="${webcam.image.current.preview}" alt="${webcam.title}">
//         </div>`;

//     $('#map').html(webcamHtml);
// }


//     function displayForecastData(forecastData) {
//         // Create an object to track the days we have added to the forecast
//         let addedDays = {};

//         var forecastHtml = forecastData.list.filter(forecast => {
//             const date = new Date(forecast.dt * 1000).toDateString();
//             // Check if this date has already been added to the forecast
//             if (!addedDays[date]) {
//                 addedDays[date] = true;
//                 return true; // Keep this forecast
//             }
//             return false; // Skip this forecast
//         }).map(forecast => {
//             const date = new Date(forecast.dt * 1000).toDateString();
//             const temp = forecast.main.temp;
//             const description = forecast.weather[0].description;
//             return `<div class="forecast-item">
//                         <h3>${date}</h3>
//                         <p>Temperature: ${temp}°C</p>
//                         <p>Description: ${description}</p>
//                     </div>`;
//         }).join('');

//         $('#forecast-container').html(forecastHtml);
//     }

//     function displayWeatherData(weatherData, cityName) {
//         // Update the web page with weather data
//         const temperature = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;

//          // Call the fetchWeatherGif function with the weather description
//     fetchWeatherGif(weatherDescription);
        
//         $('#current-weather > h2').html(`Weather in ${cityName}`);
//         $('#weather-details').html(`
//             <p>Temperature: ${temperature}°C</p>
//             <p>Description: ${weatherDescription}</p>
            
//         `);
//     }

//     // Function to display the GIF in the HTML element
// function displayWeatherGif(gifUrl) {
//     $('#weather-gif').html(`<img src="${gifUrl}" alt="Weather Gif" class="gif">`);
// }



//     function saveSelectedCity(lat, lon, name) {
//         const selectedCity = { lat, lon, name };
//         localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
//     }

//     function displaySelectedCity(lat, lon, name) {
//         $('#current-weather > h2').html(name);
//         saveSelectedCity(lat, lon, name);
//         fetchWeatherData(lat, lon, name);
//         fetchForecastData(lat, lon); // Fetch the 5-day forecast data
//         fetchNearbyWebcams(lat, lon); // Fetch nearby webcams
//     }

//     // Handle clicks outside of city search
//     $(window).on('click', function(event) {
//         if (!$(event.target).closest('#city-search, #search-list').length) {
//             $('#search-list').hide();
//         }
//     });

//     // Check if a selected city is stored in localStorage
//     const storedCity = JSON.parse(localStorage.getItem('selectedCity'));
//     if (storedCity && storedCity.lat && storedCity.lon && storedCity.name) {
//         displaySelectedCity(storedCity.lat, storedCity.lon, storedCity.name);
//     }
// });