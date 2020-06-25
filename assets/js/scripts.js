var apiKey = "f859703a85a79facc803ec19e50f064c";
var now = moment().format("(L)"); //object moment
var weatherDay = document.querySelector("#showCurrentWeather")
var weatherInfo = document.querySelector("#weather-container")
//elements for show wether data
var listdata = document.createElement("div")
var tempS = document.createElement("p");
var humS = document.createElement("p");
var windS = document.createElement("p");
var UVS = document.createElement("p");


function searchCurrent(city) {
    console.log("current");
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json()
            // response.json();
        }).then(function (data) {
            console.log(data)


            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var coordlat = data.coord.lat;
            var coordlon = data.coord.lon;
            
            //call UV for get that info
            searchUV(coordlat, coordlon);

            //display on page the weather data
           
            tempS.textContent = " Temperature:" + " " + temperature + " " + "ºF";
            humS.textContent = " Humidity:" + " " + humidity + " " + "%";
            windS.textContent = " Wind" + " " + "Speed:" + " " + windSpeed + " " + "MPH";;

            listdata.appendChild(tempS)
            listdata.appendChild(humS)
            listdata.appendChild(windS)
            weatherInfo.appendChild(listdata)

            //show city name and current day
            var dateCity = document.createElement("p"); //add the icon
            dateCity.innerHTML = city + " " + now;

            weatherDay.appendChild(dateCity);

        })

};

//function UV

function searchUV(lat, lon) {

    //console.log("UV");
    fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log("rayos ultra" + data)

        })

}

//function forecast

function searchForecast(city) {

    // buscar y mostrar el 5 dias prevision

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

        })
}






// listener onclick button

document.getElementById("searchC").addEventListener("click", function (event) {
    event.preventDefault();
    var cityIn = document.getElementById("city").value;

    if (cityIn) {
        searchCurrent(cityIn);
        searchForecast(cityIn);
        //limpiar el input
    } else {
        alert("You need in a City")
    }

})


var listCitySearch = function (cities) {

    // for(var i=0; i<cities.lenght.i++){

    // }
}

// UV necesitas otra llamada basada en las coordenadas





