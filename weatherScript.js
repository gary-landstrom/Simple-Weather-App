<<<<<<< HEAD
//Weather API config

const apiKey = 'd6e0bbf2a0a81b03bf516dca28a54090';
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityIn').value;

    if (city === '') {
        alert("Please enter a valid city name.");
        return;
    }

    //Former url only worked with a city name. 
    //const fullURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    /*conditonal will scan user input for 5 digits. if there are numbers 
    the api will pull locational data based on zipcode. If the user input
    is a string then the api will pull information for a city name. The 
    city name will need the country appended in the input: "Dave, US" */
    if(/^\d{5}$/.test(city)) {
        fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${city},US&appid=${apiKey}&units=imperial`;
    } else {
        fullURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    }


    // Fetch data
    fetch(fullURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {

                //gets the icon code from the API
                const iconCode = data.weather[0].icon;
                //icon URL 
                const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                //src attribute of img is passed to the iconURL
                document.getElementById('weatherIcon').src = iconURL;

                document.getElementById('cityName').textContent = data.name;
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

//TEST TEST Git Push
=======
//Weather API config

const apiKey = 'd6e0bbf2a0a81b03bf516dca28a54090';
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityIn').value;

    if (city === '') {
        alert("Please enter a valid city name.");
        return;
    }

    //Former url only worked with a city name. 
    //const fullURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    /*conditonal will scan user input for 5 digits. if there are numbers 
    the api will pull locational data based on zipcode. If the user input
    is a string then the api will pull information for a city name. The 
    city name will need the country appended in the input: "Dave, US" */
    if(/^\d{5}$/.test(city)) {
        fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${city},US&appid=${apiKey}&units=imperial`;
    } else {
        fullURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    }


    // Fetch data
    fetch(fullURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {

                //gets the icon code from the API
                const iconCode = data.weather[0].icon;
                //icon URL 
                const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                //src attribute of img is passed to the iconURL
                document.getElementById('weatherIcon').src = iconURL;

                document.getElementById('cityName').textContent = data.name;
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
>>>>>>> 0483355a5a8f0b9f782622e809e31b6f0048b07f
