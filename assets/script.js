//-----SEARCH BAR-----
//take user input and match city or zip code search to return weather data in HERO & eXTENDED FORECAST

let searchBtn = document.getElementById("search-btn");
let userSearch = document.getElementById("typed-search");
let heroDate = document.getElementById("hero-data");

searchBtn.addEventListener("click", () => {
  displayCurrentWeather();

  getZipWeatherForecast();
});

// API issue. not implementing search by zip only search by city for current weather. doesn't work for extended weather.
function getCurrentWeather() {
  // _____fetch API_____

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      userSearch.value +
      ",CO,us&appid=47659c28e771d77dde5b14c321e29f33"
  )
    .then((response) => response.json())

    .then((data) => console.log(data));
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
      userSearch.value +
      ",us&appid=47659c28e771d77dde5b14c321e29f33"
  )
    .then((response) => response.json())

    .then((data) => console.log(data));
}

function getZipWeatherForecast() {
  // _____fetch API_____
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?zip=" +
      userSearch.value +
      ",us&appid=47659c28e771d77dde5b14c321e29f33"
  )
    .then((response) => response.json())

    .then((data) => console.log(data));
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userSearch.value +
      ",CO,us&appid=47659c28e771d77dde5b14c321e29f33"
  )
    .then((response) => response.json())

    .then((data) => console.log(data));
}

//-----HERO WEATHER -----
//display City and current Date location with icon
// get weather data temp,
//wind, humidity, and UV index and their values. display for current searched by user.

displayCurrentWeather = () => {};

//-----EXTENDED FORECAST -----
//get 5 day forecast weather. Temp, Wind speed in MPH, Humidity %
//carosel for extended forcast??

//-----QUICK SEARCH -----
//Quick search of 5 cities that will fetch weather data to display HERO & eXTENDED FORECAST
