function weatherInfo(response) {
  let temperature = document.querySelector('#current-temperature');
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let weatherCity = document.querySelector('#weather-city');
  weatherCity.innerHTML = response.data.city;
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

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', searchSubmit);

searchCity('Porto');
