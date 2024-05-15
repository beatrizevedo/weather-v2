function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#input-search-form');
  let weatherCity = document.querySelector('#weather-city');
  weatherCity.innerHTML = searchInput.value;
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', searchSubmit);
