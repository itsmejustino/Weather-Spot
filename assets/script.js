//----!IMPORTANT KEY AND FETCH URL!----
let apiKey = "47659c28e771d77dde5b14c321e29f33";
let fetchURL = "https://api.openweathermap.org/data/2.5/";

//button, input area, and data containers
let searchBtn = document.getElementById("search-btn");
let userSearch = document.getElementById("typed-search");
let heroData = document.getElementById("hero-data");
let weatherCard = document.getElementById("weather-card");

//storage handling
let cityStorage = JSON.parse(localStorage.getItem("cityName")) || [];

//take user input and match city to query parameter
//-----SEARCH BAR-----
//++++++MAIN FUNCTION++++++
searchBtn.addEventListener("click", () => {
  stringOrInt(userSearch.value);
  showSearchedWeather();
  setHistory();
  clearCard();
  clearHero();
  appendSearchBtn();
});

function setHistory() {
  let cityValue = userSearch.value;
  console.log(cityValue);
  localStorage.setItem("cityName", JSON.stringify(cityValue));
  if (cityStorage.indexOf(cityValue) === 1) {
    cityStorage.push(cityValue);
    localStorage.setItem("cityName", cityValue);
  }
}

//-----QUICK SEARCH -----
//Quick search of 5 cities that will fetch weather data to display HERO & eXTENDED FORECAST
//appends search input
appendSearchBtn = () => {
  let searchedCity = userSearch.value;
  let searchedItem = document.getElementById("past-searched-items");
  let appendCityBtn = document.createElement("button");
  appendCityBtn.id = "saved-city-btn";
  appendCityBtn.textContent = searchedCity;
  searchedItem.append(appendCityBtn);
  appendCityBtn.setAttribute("value", searchedCity);
  appendCityBtn.addEventListener("click", () => {
    userSearch.value = appendCityBtn.textContent;
    stringOrInt(searchedCity);
    showSearchedWeather();
    clearCard();
    clearHero();
  });
};

stringOrInt = (i) => {
  let numChar = i.charCodeAt();
  console.log(numChar);
  if (numChar >= 48 && numChar <= 57) {
    console.log("int");
    return false;
  } else {
    console.log("str");
    return true;
  }
};
//checks value of userSearch.value
showSearchedWeather = () => {
  console.log(stringOrInt(userSearch.value));
  if (stringOrInt(userSearch.value)) {
    fetch(`${fetchURL}weather?q=${userSearch.value}&appid=${apiKey}`)
      .then((response) => response.json())

      .then((data) => {
        console.log(data.coord.lat, data.coord.lon);
        getWeatherData(data.coord.lat, data.coord.lon);
      });
  } else if (!stringOrInt(userSearch.value)) {
    let stringValue = userSearch.value.toString();

    fetch(`${fetchURL}weather?zip=${stringValue},us&appid=${apiKey}`)
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        console.log(data.coord.lat, data.coord.lon);
        getWeatherData(data.coord.lat, data.coord.lon);
      });
  }
};

//gets data from using lat long generated from user search by zip or city name
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

let isHeroOn = false;
clearHero = () => {
  if (isHeroOn == true) {
    let heroClear = document.getElementsByClassName("city-data");
    console.log(heroClear.length);
    for (let j = 0; j <= heroClear.length; j++) {
      heroClear[j].remove();
    }
  }
};
//-----HERO WEATHER -----
//display City and current Date location with icon
// get weather data temp, wind, humidity, and UV index and their values. display for current searched by user.
showWeatherData = (data) => {
  isHeroOn == true;
  let { temp, feels_like, wind_speed, humidity, uvi } = data.current;
  let icon = data.current.weather[0].icon;
  let timeStamp = data.current.dt;
  let dayValue = moment.unix(timeStamp).format("ddd. MMM D");

  console.log(dayValue);
  console.log(data.current.uvi);

  // let uviColor = ;
  //  let uvVal= uviColor.innerHTML
  console.log(data.current.uvi);

  heroData.innerHTML = `<div class="city-data" id="hero-data">

  <h1>Current Weather in ${userSearch.value}, ${dayValue}</h1>
  <img src= "https://openweathermap.org/img/wn/${icon}.png" alt = "Weather-icon" class = "weather-icon">
     <p> Temperature: ${temp} °F <br>
     Temperature Feels Like: ${feels_like}°F <br>
     Wind Speed: ${wind_speed} MPH<br>
      Humidity: ${humidity}%<br>
     UV Index:<span id="uvi-color"> ${uvi}</span>
    </p>      
</div>`;
  if (data.current.uvi < 4) {
    document.getElementById("uvi-color").classList.add("good-uv");
  }
  if (data.current.uvi > 4 && data.current.uvi <= 7) {
    document.getElementById("uvi-color").classList.add("okay-uv");
  }
  if (data.current.uvi > 7) {
    document.getElementById("uvi-color").classList.add("not-good-uv");
  }
};

let isCardOn = false;
clearCard = () => {
  if (isCardOn == true) {
    let cardClear = document.getElementsByClassName("card-style");
    console.log(cardClear.length);
    for (let j = 0; j <= cardClear.length; j++) {
      cardClear[j].remove();
    }
  }
};

//-----EXTENDED FORECAST -----
//get 5 day forecast weather. Temp, Wind speed in MPH, Humidity %

let extendedForecast = "";
showExtendedWeatherData = (data) => {
  isCardOn = true;
  for (let i = 1; i < 6; i++) {
    let { temp, wind_speed, humidity, feels_like } = data.daily[i];
    let extIcon = data.daily[i].weather[0].icon;
    let futureTimeStamp = moment.unix(data.daily[i].dt).format("l");
    console.log(extendedForecast);
    if (i == 1) {
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
