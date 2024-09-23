//Weather API config
const apiKey = 'd6e0bbf2a0a81b03bf516dca28a54090';

window.onload = () => {
    const homeCity = localStorage.getItem('homeCity');

    window.onload = ()=> {
        if (!homeCity) {
            homeCity = 'New York';
        }
        document.getElementById('cityIn').value = homeCity;
        document.getElementById('getWeatherBtn').click();
    }

    if(homeCity){
        document.getElementById('cityIn').value=homeCity;
        document.getElementById('getWeatherBtn').click();
    }
};

document.querySelector('.setHome').addEventListener('click', ()=> {
    const city = document.getElementById('cityIn').value;
    if(city){
        localStorage.setItem('homeCity', city);
        alert(`Home city set to ${city}`);
    }else{
        alert('Please enter a city or zip first.');
    }
});

/*document.querySelector('.clearHomeBtn').addEventListener('click', ()=> {
        localStorage.removeItem('homeCity');
        alert('Home city was removed.');
    });*/


document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityIn').value;

    if (city === '') {
        alert("Please enter a valid city name.");
        return;
    }
    
    /*geoURL is initialized with the url based on the user input. If it is 5 digits then the first url is used
    if the user enters a city name then the second url is invoked*/
    let geoURL;
    if(/^\d{5}$/.test(city)) {
        geoURL = `https://api.openweathermap.org/geo/1.0/zip?zip=${city},US&appid=${apiKey}`;
    } else {
        geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    }

    fetch(geoURL)
        .then(response => response.json())
        .then(locationData => {
            if ((Array.isArray(locationData) && locationData.length > 0) || locationData.lat) {
                let lon, lat;
                if (Array.isArray(locationData) && locationData.length > 0) {
                    lat = locationData[0].lat;
                    lon = locationData[0].lon;
                } else if (locationData.lat && locationData.lon) {
                    lat = locationData.lat;
                    lon = locationData.lon;
                } else {
                    throw new Error("Location not found.");
                }

                //fetch the weather data using the lon,lat collected
                const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
                //console.log(`Weather API URL: ${weatherURL}`);

                //FIXME:: Testing locational data for accuracy
                console.log(`Weather API URL: ${weatherURL}`);

                return fetch(weatherURL)
            }else{
                throw new Error("Location not found.");
            }        
        })


        // Fetch data
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {

                //gets the icon code from the API
                const iconCode = data.weather[0].icon;
                //icon URL 
                const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                //src attribute of img is passed to the iconURL
                document.getElementById('weatherIcon').src = iconURL;

                //country code pull from the API
                const country = data.sys.country;

                //FIXME: Confirm the API returns the country code
                console.log(data.sys.country);
                
                document.getElementById('country').textContent = country;

                document.getElementById('cityName').textContent = data.name ? `${data.name}, ` : '';
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °F`;
                document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            } else {
                alert("City not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data: ", error);
        });
});
