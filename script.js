//Varibles
const weatherApiKey = "edb38b2af3a0eef8f2645a44050d7b75";
const attApiKey = "5ae2e3f221c38a28845f05b644538cc805c2abb1238c713f3273494d"
const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const countryCard = document.getElementById("countryCard");
const countryName = document.getElementById("countryName");
const flag = document.getElementById("flag");
const capital = document.getElementById("capitalName");
const region = document.getElementById("region");
const subregion = document.getElementById("subregion");
const population = document.getElementById("population");
const currency = document.getElementById("currency");
const languages = document.getElementById("languages");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const weatherDescription = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");



//request info from API (async func)
//Country info
async function searchCountry(){
    const country = searchBox.value.trim();
    if (country === "") {
        message.textContent = "Please Enter the Name of a Country";
        return;
    }
    try {
    //const url = `https://api.restcountries.com/countries/v5/names.common/${encodeURIComponent(country)}`;
    const response = await fetch(`https://countries.dev/name/${encodeURIComponent(country)}`);
    if (!response.ok) {
        throw new Error("Country not found");
    }
    const result = await response.json()
    console.log(result);
    countryName.innerHTML = result[0].name;
    capital.innerHTML = result[0].capital;
    region.innerHTML = result[0].region;
    subregion.innerHTML = result[0].subregion;
    population.innerHTML = result[0].population;
    currency.innerHTML = result[0].currencies[0].name;
    languages.innerHTML = result[0].languages[0].name;
    flag.innerHTML = result[0].flag;
    } catch(error) {

    }
}

//request info from API (async func)
//Get weather for country
async function getWeather() {
    try {
    const loc = searchBox.value.trim();
    const weatherResponse = await fetch(`https://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${loc}`);
    if (!weatherResponse.ok) {
        throw new Error("Unable to display weather");
    }
    const weatherResult = await weatherResponse.json();
    console.log(weatherResult);
    temp.textContent = weatherResult.current.temperature;
    feelsLike.innerHTML = weatherResult.current.feelslike;
    weatherDescription.innerHTML = weatherResult.current.weather_descriptions[0];
    weatherIcon.src = weatherResult.current.weather_icons[0];
    } catch(error){

    }
}

//Get attractions
/*
async function getAttraction(){
    try {
        const attResponse = await fetch(`http://api.opentripmap.com/0.1/ru/places/xid/Q372040?apikey=${attApiKey}`)
        if (!attResponse.ok) {
            throw new Error ("Unable to get attraction");
        }
        const attResult = await attResponse.json();
        console.log(attResult);
    } catch(error){

    }
}
*/

//search button
searchBtn.addEventListener("click", () => {
    searchCountry();
    getWeather();
    //getAttraction();
});