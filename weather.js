const apiKey = "62c61e0603bf6be36793c814d6c47f12";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
   const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

   if (response.status == 404) {
      document.querySelector(".error").style.display = 'block';
      document.querySelector(".weather").style.display = 'none';
   } else {
      var data = await response.json();

      console.log(data);
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°c'; // La fonction Math.round() retourne la valeur d'un nombre arrondi à l'entier le plus proche.
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      if (data.weather[0].main == 'Clouds') {
         weatherIcon.src = 'images/clouds.png';
      } else if (data.weather[0].main == 'Clear') {
         weatherIcon.src = 'images/clear.jpg';
      } else if (data.weather[0].main == 'Rain') {
         weatherIcon.src = 'images/rain.jpg';
      } else if (data.weather[0].main == 'Drizzle') {
         weatherIcon.src = 'images/drizzle.jpg';
      } else if (data.weather[0].main == 'Mist') {
         weatherIcon.src = 'images/mist.png';
      }


      document.querySelector('.weather').style.display = 'block'
      document.querySelector(".error").style.display = 'none';
   }


}

searchBtn.addEventListener('click', function () {
   checkWeather(searchBox.value);
});

searchBox.addEventListener('keydown', function (event) {
   if (event.keyCode === 13) { // 13 correspond à la touche "Enter"
      checkWeather(searchBox.value);
   }
});