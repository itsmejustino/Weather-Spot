//----!IMPORTANT KEY AND FETCH URL!----
let apiKey = "47659c28e771d77dde5b14c321e29f33";
let fetchURL = "https://api.openweathermap.org/data/2.5/";

//button, input area, and data containers
let searchBtn = document.getElementById("search-btn");
let userSearch = document.getElementById("typed-search");
let heroData = document.getElementById("hero-data");
let weatherCard = document.getElementById("weather-card");

//take user input and match city to query parameter
//-----SEARCH BAR-----
searchBtn.addEventListener("click", () => {
  let cityValue = userSearch.value;
  localStorage.setItem("city", cityValue);

  showSearchedWeather();
});

showSearchedWeather = () => {
  if( typeof userSearch.value === "string"){
    fetch(`${fetchURL}weather?q=${userSearch.value}&appid=${apiKey}`)
    .then((response) => response.json())

    .then((data) => {
      console.log(data.coord.lat, data.coord.lon);
      getWeatherData(data.coord.lat, data.coord.lon);
    });
  }else if(typeof userSearch.value === "number"){
  // _____fetch API_____
  fetch(`${fetchURL}weather?zip=${userSearch.value},us&appid=${apiKey}`)
    .then((response) => response.json())

    .then((data) => {
      console.log(data.coord.lat, data.coord.lon);
      getWeatherData(data.coord.lat, data.coord.lon);
    });
  }
};

getWeatherData = (latitude, longitude) => {
  fetch(
    `${fetchURL}onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showWeatherData(data);
      showExtendedWeatherData(data);
    });
};

//-----HERO WEATHER -----
//display City and current Date location with icon
// get weather data temp, wind, humidity, and UV index and their values. display for current searched by user.
showWeatherData = (data) => {
  let { temp, feels_like, wind_speed, humidity, uvi } = data.current;
  let icon = data.current.weather[0].icon;
  let timeStamp = data.current.dt;
  let dayValue = moment.unix(timeStamp).format("ddd. MMM D")
  console.log(dayValue);
  heroData.innerHTML = `<div class="city-data" id="hero-data">

  <h1>Current Weather in ${userSearch.value}, ${dayValue}</h1>
  <img src= "https://openweathermap.org/img/wn/${icon}.png" alt = "Weather-icon" class = "weather-icon">
     <p> Temperature: ${temp} °F <br>
     Temperature Feels Like: ${feels_like}°F <br>
     Pressure: ${wind_speed}<br>
      Humidity: ${humidity}%<br>
      UV Index: ${uvi}
      </p>      
</div>`;
};

//-----EXTENDED FORECAST -----
//get 5 day forecast weather. Temp, Wind speed in MPH, Humidity %
let extendedForecast = "";
showExtendedWeatherData = (data) => {
  for (let i = 0; i < 5; i++) {
    let { temp, wind_speed, humidity, feels_like } = data.daily[i];
    let extIcon = data.daily[i].weather[0].icon;
    let futureTimeStamp = moment.unix(data.daily[i].dt).format("ddd. MMMM D");
    console.log(extendedForecast);
    if (i == 0) {
      weatherCard.innerHTML = `
    <div class="card-style" id="weather-card">
    <h2>${futureTimeStamp}</h2>
    <img src = "http://openweathermap.org/img/wn/${extIcon}.png" alt = "Weather-icon" class = "weather-icon">
      <p>
      Temperature: ${temp.day}°F <br>
      Temperature Feels Like: ${feels_like.day}°F <br>
      Pressure: ${wind_speed}<br>
       Humidity: ${humidity}%<br>
      </p>
    </div>
  `;
    } else {
      weatherCard.innerHTML += `
  <div class="card-style" id="weather-card" >
  <h2>${futureTimeStamp}</h2>
  <img src = "http://openweathermap.org/img/wn/${extIcon}.png" alt = "Weather-icon" class = "weather-icon">
    <p>
    Temperature: ${temp.day}°F <br>
    Temperature Feels Like: ${feels_like.day}°F <br>
    Pressure: ${wind_speed}<br>
     Humidity: ${humidity}%<br>

    </p>
  </div>
`;
    }
  }
};

// if searched item in local storage then pass city param into userSearch function and call userSearch


//-----QUICK SEARCH -----
//Quick search of 5 cities that will fetch weather data to display HERO & eXTENDED FORECAST

//Append list of previously searched cities
// fetch('people.json')
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     appendData(data);
// })
// .catch(function (err) {
//     console.log('error: ' + err);
// });
// function appendData(data) {
// var mainContainer = document.getElementById("myData");
// for (var i = 0; i < data.length; i++) {
//     var div = document.createElement("div");
//     div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
//     mainContainer.appendChild(div)
