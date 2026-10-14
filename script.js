//Varibles
const apiKey = "rc_live_cfd4d1305e4a47ddbde93be69bc81312"
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

//request info from API (async func)
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


searchBtn.addEventListener("click", searchCountry);