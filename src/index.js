function weatherInfo(response) {
  let temperature = document.querySelector('#current-temperature');
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let weatherCity = document.querySelector('#weather-city');
  weatherCity.innerHTML = response.data.city;
  let weatherDescription = document.querySelector('#weather-description');
  weatherDescription.innerHTML = response.data.condition.description;
  let humidity = document.querySelector('#specific-humidity-conditions');
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector('#specific-wind-conditions');
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  let currentTime = document.querySelector('#current-time');
  let date = new Date(response.data.time * 1000);
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  currentTime.innerHTML = `${hours}:${minutes}`;

  let weatherIcon = document.querySelector('#weather-icon');
  weatherIcon.innerHTML = `<img src=${response.data.condition.icon_url} />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = '052t6596f0376314513oae46624edf8b';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherInfo);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#input-search-form');
  searchCity(searchInput.value);
}

function getForecast(city) {
  apiKey = '052t6596f0376314513oae46624edf8b';
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = '';

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div> 
      <img src="${
        day.condition.icon_url
      }" id="forecast-weather-icon" class="forecast-weather-icon"/>
    
        <div class="forecast-weather-temperature" id="forecast-weather-temperature">
        <span class="forecast-min-temperature" id="forecast-min-temperature">${Math.round(
          day.temperature.minimum
        )}°</span>
        <span class="forecast-max-temperature" id="forecast-max-temperature">${Math.round(
          day.temperature.maximum
        )}°</span>
        </div>
        <hr />
        <div class="forecast-weather-weekday" id="forecast-weather-weekday">${formatDate(
          day.time
        )}</div>
        </div>`;
    }
  });

  function formatDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thrusday',
      'Friday',
      'Saturday',
    ];

    return days[date.getDay()];
  }

  let forecast = document.querySelector('#forecast');
  forecast.innerHTML = forecastHTML;
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', searchSubmit);

searchCity('Porto');
