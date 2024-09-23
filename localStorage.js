//save the home city
function saveHomeCity(cityName) {
    localStorage.setItem('homeCity', cityName);
}

//retrieve home city from localstorage
function getHomeCity() {
    return localStorage.getItem('homeCity');
}

//if the home city needs to be cleared
function clearHomeCity() {
    localStorage.removeItem('homeCity');
}

export { saveHomeCity, getHomeCity, clearHomeCity};