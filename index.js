const weatherEl = document.querySelector('.weather');

let geolocation = navigator.geolocation;
const date = new Date();

function getLocation() {
  geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(`Местоположение: lat:${lat}, long:${lon}`);
  getWeather(lat, lon); // вызов функции для получения погоды
}

function getWeather(lat, lon) {
    const API_KEY = "2e7139c6a4f80c6748f001736e0d42cb";
    const BASE_URL="https://api.openweathermap.org/data/2.5/weather"
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => { drawWeather(data); })
        .catch(error => console.log(error));
    
}

getLocation();

function drawWeather(data) {
    console.log(data);
   
    const markup = `<span class="degree">${data.main.temp}°</span><span class="description">|${data.weather[0].main}</span>
<span class="location">${data.name}</span>
<img src="./img/sunny.svg" alt="" class="weatherImg" width="165px" height="156px">
<p class="date">${date.toDateString()}</p>
<a class="weekWeather" href="https://openweathermap.org/city/${data.id}">weather for week</a>`;
    weatherEl.innerHTML=markup;  
}
