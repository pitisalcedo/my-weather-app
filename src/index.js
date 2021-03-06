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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="card-group">
          <div class="card bg-transparent">
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"/>
            <div class="card-body">
              <p class="card-text">
                ${Math.round(forecast.main.temp_max)}° |
                ${Math.round(forecast.main.temp_min)}°
              </p>
              <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
            </div>
          </div>
        </div>`;
  }
}

function searchCity(city) {
  let apiKey = "87674b91999873f45e8ffe2337e0d7e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;

  document.querySelector("h1").innerHTML = "#city-search".value;
  document.querySelector("#selected-city").innerHTML = "#city-search".value;

  searchCity(city);
}

function chooseNewYork(event) {
  event.preventDefault();
  searchCity("New York");
}

function chooseSanFrancisco(event) {
  event.preventDefault();
  searchCity("San Francisco");
}

function chooseParis(event) {
  event.preventDefault();
  searchCity("Paris");
}

function chooseTokyo(event) {
  event.preventDefault();
  searchCity("Tokyo");
}

function showTemperature(response) {
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

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

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let dateElement = document.querySelector("#current-date");
let currentDate = new Date();

dateElement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

let newYorkButton = document.querySelector("#new-york-button");
newYorkButton.addEventListener("click", chooseNewYork);

let sanFranciscoButton = document.querySelector("#san-francisco-button");
sanFranciscoButton.addEventListener("click", chooseSanFrancisco);

let parisButton = document.querySelector("#paris-button");
parisButton.addEventListener("click", chooseParis);

let tokyoButton = document.querySelector("#tokyo-button");
tokyoButton.addEventListener("click", chooseTokyo);

searchCity("Chicago");
