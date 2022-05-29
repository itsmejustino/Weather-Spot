//-----SEARCH BAR-----
//take user input and match city or zip code search to return weather data in HERO & eXTENDED FORECAST
let searchBtn = document.getElementById("search-btn");
let userSearch = document.getElementById("typed-search");
let heroData = document.getElementById("hero-data");
let weatherCardOne = document.getElementById("weath-car1");


searchBtn.addEventListener("click", () => {
  getCurrentWeather();
  // getZipWeatherForecast();
  displayCurrentWeather();
});
function getCurrentWeather() {
  //   // _____fetch API_____

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

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log('success');

    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=47659c28e771d77dde5b14c321e29f33`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
        
      });
  });
}

function showWeatherData(data) {
  let { temp, wind_speed, humidity, uvi } = data.current;
  heroData.innerHTML = `<div class="city-data" id="hero-data">

     <p> Temperature: ${temp} <br>
     Pressure: ${wind_speed}<br>
      Humidity: ${humidity}<br>
      UV Index: ${uvi} 
      </p>      
</div>`;

let extendedForecast = ''
  data.daily.forEach((day, i) => {
  if(i == 0){
    extendedForecast += `
    <div class="card-style1" id="weath-car1">
      <p>
      Temperature: ${day.temp.day}°F <br>
      Pressure: ${wind_speed}<br>
       Humidity: ${humidity}%<br>
       UV Index: ${uvi} 
      </p>
    </div>
  `;

  }else{

  extendedForecast += `
  <div class="card-style1" id="weath-car1">
    <p>
    Temperature: ${day.temp.day}°F <br>
    Pressure: ${wind_speed}<br>
     Humidity: ${humidity}%<br>
     UV Index: ${uvi} 
    </p>
  </div>
`;
  weatherCardOne.innerHTML = extendedForecast

}
})
}
// function getZipWeatherForecast() {
//   // _____fetch API_____
//   fetch(
//     "https://api.openweathermap.org/data/2.5/forecast?zip=" +
//       userSearch.value +
//       ",us&appid=47659c28e771d77dde5b14c321e29f33"
//   )
//     .then((response) => response.json())

//     .then((data) => console.log(data));
//   fetch(
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//       userSearch.value +
//       ",CO,us&appid=47659c28e771d77dde5b14c321e29f33"
//   )
//     .then((response) => response.json())

//     .then((data) => console.log(data));
// }

//-----HERO WEATHER -----
//display City and current Date location with icon
// get weather data temp,
//wind, humidity, and UV index and their values. display for current searched by user.

// function displayCurrentWeather() {
//   fetch(
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//       userSearch.value +
//       ",CO,us&appid=47659c28e771d77dde5b14c321e29f33"
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       appendData(data);
//     })
//     .catch(function (err) {
//       console.log("error: " + err);
//     });

//   function appendData(data) {
//     let mainContainer = document.getElementById("hero-data");
//     for (let i = 0; i < data.length; i++) {
//     var heroDiv = document.createElement("div");
//     heroDiv.innerHTML = "Weather: " + data[i].weather{main};
//     mainContainer.appendChild(heroDiv);
//     console.log(mainContainer);
//   }
// }

// };

//-----EXTENDED FORECAST -----
//get 5 day forecast weather. Temp, Wind speed in MPH, Humidity %





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