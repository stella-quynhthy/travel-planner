//Varibles
const weatherApiKey = "edb38b2af3a0eef8f2645a44050d7b75";
const attApiKey = "5ae2e3f221c38a28845f05b6ed12a88f8f963a26230fa7119d9da444"
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
const attList = document.getElementById("attractions");



//request info from API (async func)
//Country info
async function searchCountry(input){
    input = searchBox.value.trim();
    if (input === "") {
        message.textContent = "Please Enter the Name of a Country";
        return;
    }
    try {
    //const url = `https://api.restcountries.com/countries/v5/names.common/${encodeURIComponent(country)}`;
    const response = await fetch(`https://countries.dev/name/${encodeURIComponent(input)}`);
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

    return result[0];
    } catch(error) {
        console.log(error);
    }
}

//handeling search
async function handleSearch() {
    const country = searchBox.value.trim();
    const data = await searchCountry(country);
    if (!data) {
        return;
    }
    //const capitalName = data[0].capital;
    const capitalName = Array.isArray(data.capital) ? data.capital[0] : data.capital;
    await Promise.allSettled([
        getWeather(capitalName),
        getAttraction(capitalName)
    ]);
}
//request info from API (async func)
//Get weather for country
async function getWeather(city) {
    try {
    //const loc = searchBox.value.trim();
    const weatherResponse = await fetch(`https://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`);
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
        console.log(error);
    }
}

//Get attractions
async function getAttraction(city){
    try {
        //const country = searchBox.value.trim();
        const geo = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${attApiKey}`);
        const attResult = await geo.json();
        const places = await fetch (`https://api.opentripmap.com/0.1/en/places/radius?radius=30000&lon=${attResult.lon}&lat=${attResult.lat}&rate=3&limit=15&format=json&apikey=${attApiKey}`);
        if (!geo.ok) {
            throw new Error ("Unable to get attraction");
        }
        const placeResult = await places.json();
        console.log(attResult);
        console.log(placeResult);
        attList.innerHTML = "";
        for (i = 0; i < placeResult.length; i++) {
            const att = placeResult[i].name;
            const li = document.createElement("li");
            li.textContent = att;
            attList.appendChild(li);
        }
    } catch(error){
        console.log(error);
    }
}

//search button
searchBtn.addEventListener("click", () => {
   handleSearch();
});