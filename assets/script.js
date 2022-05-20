// fetch API
fetch('https://api.openweathermap.org/data/3.0/onecall?lat=39.51833126&lon=-104.759496962&appid=47659c28e771d77dde5b14c321e29f33')
  .then(response => response.json())
  //promise
  .then(data => console.log(data));


//-----HERO WEATHER -----  
//display City and current Date location with icon
// get weather data temp, wind, humidity, and UV index and their values

//-----eXTENDED FORECAST -----  
//get 5 day forecast weather. Temp, Wind speed in MPH, Humidity %

//-----SEARCH BAR-----
//take user input and match city or zip code search to return weather data in HERO & eXTENDED FORECAST

//-----QUICK SEARCH -----
//Quick search of 5 cities that will fetch weather data to display HERO & eXTENDED FORECAST