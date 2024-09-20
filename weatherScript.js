//Weather API config

const apiKey = 'd6e0bbf2a0a81b03bf516dca28a54090';
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityIn').value;

    if (city === '') {
        alert("Please enter a valid city name.");
        return;
    }
    
    /*FIXME:: What does this do?*/
    let geoURL;
    if(/^\d{5}$/.test(city)) {
        geoURL = `https://api.openweathermap.org/geo/1.0/zip?zip=${city},US&appid=${apiKey}`;
    } else {
        geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    }

    //FIXME:: Fetch location data 
    let weatherURL;

    fetch(geoURL)
        .then(response => response.json())
        .then(locationData => {
            if(locationData.length > 0 || locationData.lat) {
                //extract lon and lat
                let lon, lat;
                if(Array.isArray(locationData)) {
                    lat = locationData[0].lat;
                    lon = locationData[0].lon;
                }else{
                    lat = locationData.lat;
                    lon = locationData.lon;
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
                const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                //src attribute of img is passed to the iconURL
                document.getElementById('weatherIcon').src = iconURL;

                //country code pull from the API
                const country = data.sys.country;
                //FIXME: Confirm the API returns the country code
                console.log(data.sys.country);
                document.getElementById('country').textContent = country;


                document.getElementById('cityName').textContent = `${data.name}, `;
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
