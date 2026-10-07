//Varibles
const apiKey = "rc_live_cfd4d1305e4a47ddbde93be69bc81312"
const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const countryCard = document.getElementById("countryCard");
const country = document.getElementById("countryName");
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
    const response = await fetch('https://api.restcountries.com/countries/v5/codes.alpha_2/CA?pretty=1', 
    { headers: { 'Authorization': ${apiKey} } });
    const result = await response.json();
    } catch(error) {

    }
}


searchBtn.addEventListener("click", searchCountry);