

//-----HERO WEATHER -----
//display City and current Date location with icon
// get weather data temp, wind, humidity, and UV index and their values

// _____fetch API_____

let currentFore = fetch(
  "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=39.5183&lon=-104.7595&dt=1653080053&appid=861580140589909a9bfb6990ee8d23ba"
)
  .then((response) => response.json())

  .then((data) => console.log(data));

//-----eXTENDED FORECAST -----
//get 5 day forecast weather. Temp, Wind speed in MPH, Humidity %
//carosel for extended forcast??


// _____fetch API_____

let extendedFore = fetch(
  "http://api.openweathermap.org/data/2.5/forecast?q=Parker,Denver,CO,USA&appid=861580140589909a9bfb6990ee8d23ba"
)
  .then((response) => response.json())

  .then((data) => console.log(data));

//-----SEARCH BAR-----
//take user input and match city or zip code search to return weather data in HERO & eXTENDED FORECAST

//-----QUICK SEARCH -----
//Quick search of 5 cities that will fetch weather data to display HERO & eXTENDED FORECAST
