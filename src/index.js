//Current time
function dateToday(currentDate) {
  let year = currentDate.getFullYear();
  let date = currentDate.getDate();
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = currentDate.getDay();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthIndex = currentDate.getMonth();

  let day = days[dayIndex];
  let month = months[monthIndex];
  return `${day} ${month} ${date} ${year}, ${hour}:${minutes}`;
}
let newDate = document.querySelector("#current-date");
let fullDate = new Date();
newDate.innerHTML = dateToday(fullDate);

//Display show city weather

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  celciusTemperature = response.data.main.temp;

  let currentCityTemp = document.querySelector("#current-temperature");
  let tempcity = Math.round(response.data.main.temp);
  currentCityTemp.innerHTML = tempcity;

  let currentCountryName = document.querySelector("#country-name");
  let changeCountryNameTo = response.data.sys.country;
  currentCountryName.innerHTML = changeCountryNameTo;

  let sky = document.querySelector("#sky");
  let skyCondition = response.data.weather[0].description;
  sky.innerHTML = skyCondition;

  let feel = document.querySelector("#feel");
  let feelCondition = Math.round(response.data.main.feels_like);
  feel.innerHTML = `Feels Like: ${feelCondition}℃`;

  let humidity = document.querySelector("#humidity");
  let humidityCondition = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityCondition}%`;

  let wind = document.querySelector("#wind");
  let windCondition = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windCondition}km/h`;
}

function showCityTemperature(cityCountry) {
  let unit = "metric";
  let apiKey = "b975b52f3f47d45db1282dbfc7eb6580";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${cityCountry}&APPID=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

//Search City Display

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-name");
  let searchInput = document.querySelector("#city-input");
  searchCity.innerHTML = searchInput.value;
  let cityCountry = searchInput.value;
  showCityTemperature(cityCountry);
}
let cityName = document.querySelector("#search-city-form");
cityName.addEventListener("submit", showCity);

//Display temperature unit

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitTempLink = document.querySelector("#fahrenheit-temperature");
fahrenheitTempLink.addEventListener("click", displayFahrenheit);

let celsiusTempLink = document.querySelector("#celsius-temperature");
celsiusTempLink.addEventListener("click", displayCelsius);

//Display current location temperature

function showLocationTemperature(response) {
  let currentLocationTemp = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  currentLocationTemp.innerHTML = temperature;

  let currentCityName = document.querySelector("#city-name");
  let changeCityNameTo = response.data.name;
  currentCityName.innerHTML = changeCityNameTo;

  let currentCountryName = document.querySelector("#country-name");
  let changeCountryNameTo = response.data.sys.country;
  currentCountryName.innerHTML = changeCountryNameTo;

  let sky = document.querySelector("#sky");
  let skyCondition = response.data.weather[0].description;
  sky.innerHTML = skyCondition;

  let feel = document.querySelector("#feel");
  let feelCondition = Math.round(response.data.main.feels_like);
  feel.innerHTML = `Feels Like: ${feelCondition}℃`;

  let humidity = document.querySelector("#humidity");
  let humidityCondition = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityCondition}%`;

  let wind = document.querySelector("#wind");
  let windCondition = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windCondition}km/h`;
}
//Run current location

function showPosition(position) {
  let apiKey = "b975b52f3f47d45db1282dbfc7eb6580";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showLocationTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Search City Display Default
showCityTemperature("Santo Domingo");
