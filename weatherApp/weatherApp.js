async function Weather(cityName, showError) {
    let response = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=#put_your_own_app_id_here#&units=metric`);
    try {
        if (!(response.ok)) throw (new Error(response.statusText));
    }
    catch (error) {
        showError.innerHTML = error;
        return;
    }

    let data = await response.json();
    document.getElementById("name").innerHTML = data["name"];

    document.getElementById("celcius").innerHTML = data["main"]["temp"] + "<span>&#176;</span>C";

    document.getElementById("minTemp").innerHTML = data["main"]["temp_max"] + "<span>&#176;</span>C";

    document.getElementById("maxTemp").innerHTML = data["main"]["temp_min"] + "<span>&#176;</span>C";


    document.getElementById("weatherImage").setAttribute("src", `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`);

    document.getElementById("weatherName").innerHTML = data["weather"][0]["main"];

    document.getElementById("weatherDesc").innerHTML = data["weather"][0]["description"];

    document.getElementById("latLog").innerHTML = `Lat : ${data["coord"]["lat"]} | Log:${data["coord"]["lon"]}`;
    document.getElementById("feelsLike").innerHTML = `Feels Like ${data["main"]["feels_like"]} &#176;C`;
    document.getElementById("pressure").innerHTML = `Pressure : ${data["main"]["pressure"]} hPa`;
    document.getElementById("humidity").innerHTML = `Humidity : ${data["main"]["humidity"]} %`;
    document.getElementById("seaLevel").innerHTML = `SeaLevel : ${data["main"]["sea_level"]} hPa`;
    document.getElementById("groundLevel").innerHTML = `GroundLevel:${data["main"]["grnd_level"]} hPa`;

    document.getElementsByClassName("hide-on-error")[0].style = "display:block";

}
function isValidCityName(cityName) {
    const regex = /^[a-zA-Z\s'-]+$/; // only allows letters, spaces, apostrophes, and hyphens
    return regex.test(cityName);
}
let serach = document.getElementById("search");
serach.addEventListener('click', () => {
    let cityName = document.getElementById("cityName");
    let showError = document.getElementsByClassName("show-error")[0];
    if (!isValidCityName(cityName.value.trim())) {
        showError.innerHTML = "Please Enter a Valid City Name";
        cityName.focus();
    }
    else {
        showError.innerHTML = "";
        Weather(cityName.value, showError);
        cityName.value = "";
    }
})

