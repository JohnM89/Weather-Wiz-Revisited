# Weather Dashboard Project

[Screenshot](./Screenshot%202023-12-11%20at%2016-39-26%20Weather%20Dashboard.png)

## Overview
The Weather Dashboard is a dynamic web application that provides real-time weather information for multiple cities. Designed to help travelers plan their trips efficiently, it utilizes the OpenWeather API to display both current and forecasted weather conditions.

<details><summary><strong>User Story</strong></summary>
<p>

**AS A** traveler,  
**I WANT** to see the weather outlook for multiple cities,  
**SO THAT** I can plan a trip accordingly.

</p>
</details>

<details open><summary><strong>Acceptance Criteria</strong></summary>
<p>

**GIVEN** a weather dashboard with form inputs,  
**WHEN** I search for a city,  
**THEN** I am presented with current and future conditions for that city and that city is added to the search history.  

**WHEN** I view current weather conditions for that city,  
**THEN** I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed.  

**WHEN** I view future weather conditions for that city,  
**THEN** I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.  

**WHEN** I click on a city in the search history,  
**THEN** I am again presented with current and future conditions for that city.

</p>
</details>

<details><summary><strong>Additional Features and Notes</strong></summary>
<p>

- **Experimental API Calls:** While developing this dashboard, I experimented with additional API calls to enhance functionality and user experience.
- **Occasional Page Refresh Required:** ~~Please note, due to these experimental features, the page may need to be refreshed a few times for optimal performance.~~ Should Work!
- **Local Storage:** ~~Not sure if I've done this properly, but local storage exists for one previously entered city, however there isn't a history search bar, the page just loads the latest search instead.~~ Search history visible and clickable!
- **Weather Details:** ~~Only now realized I haven't included wind speed and humidity, couldn't get it to display nice in the container so I opted to not add but will resubmit if need be!~~ All required weather details now included!

</p>
</details>

## Technologies Used
- HTML
- CSS
- JavaScript
- OpenWeather API
- Google Api
- ~~LiveCam Api~~ (depreciated)

[Live Link!](https://johnm89.github.io/Weather-Wiz-Revisited/)
