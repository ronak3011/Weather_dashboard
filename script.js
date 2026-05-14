const API_KEY = 'b9a304d2bee80113dc1ac6904f2d904e';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

function getWeather(){

    const city = cityInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {

        if(data.cod === '404'){
            document.getElementById('error').style.display = "block";
            document.getElementById('cityName').textContent = '—';
            document.getElementById('countryName').textContent = '—';
            document.getElementById('temperature').innerHTML = `—<span class="temp-unit">°C</span>`;
            document.getElementById('condition').textContent = '—';
            document.getElementById('humidity').textContent = '—';
            document.getElementById('wind').textContent = '—';
            document.getElementById('feelsLike').textContent = '—';
            document.getElementById('visibility').textContent = '—';
            return;
        }

        cityInput.value = ''; 

        document.getElementById('error').style.display = "none";
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('countryName').textContent = data.sys.country;
        document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}<span class="temp-unit">°C</span>`;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like);
        document.getElementById('wind').textContent = Math.round(data.wind.speed * 3.6);
        document.getElementById('visibility').textContent = (data.visibility / 1000).toFixed(1);
        document.getElementById('condition').textContent = data.weather[0].description;

        
    })
}
    searchBtn.addEventListener('click', function(){
        getWeather();
        
    })
        
    cityInput.addEventListener('keydown',function(e){
        if(e.key == "Enter") getWeather();
    })
        