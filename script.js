function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//update search city

function search(city) {
  let apiKey = "19528f2e11cf229686aeedd6a8df66ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput;
  search(cityInput);
}

let form = document.querySelector("#search-place");
form.addEventListener("submit", handleSubmit);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("click", handleSubmit);

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = `Sunrise: ${response.data.sys.sunrise}`;

  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `Sunset: ${response.data.sys.sunset}`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function retrievePosition(position) {
  let apiKey = "19528f2e11cf229686aeedd6a8df66ad";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#location-search");
currentLocationButton.addEventListener("click", getLocation);

search("copenhagen");
