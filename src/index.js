function formatDate(date) {
  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];

  let currentMonth = date.getMonth();
  let month = [
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
  let months = month[currentMonth];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let todayDate = date.getDate();
  let year = date.getFullYear();

  return `${day}, ${months} ${todayDate}, ${year} | ${hours} : ${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = `${city.value}`;

  let fiveDayDisplay = document.querySelector("#selected-city");
  fiveDayDisplay.innerHTML = `${city.value}`;

  let apiKey = "87674b91999873f45e8ffe2337e0d7e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchLocation(position) {
  let apiKey = "87674b91999873f45e8ffe2337e0d7e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 21;
}

let dateElement = document.querySelector("#current-date");
let currentDate = new Date();

dateElement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", searchCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
