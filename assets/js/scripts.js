var apiKey = "f859703a85a79facc803ec19e50f064c";
var now = moment().format("(L)"); //object moment
var weatherDay = document.querySelector("#showCurrentWeather")
var weatherInfo = document.querySelector("#weather-container")
var total=document.querySelector("#totalInfo")
//elements for show wether data
var listdata = document.createElement("div")
var tempS = document.createElement("p");
var humS = document.createElement("p");
var windS = document.createElement("p");
var UVS = document.createElement("p");


// cuando empiezas lees localstorage si vacio creas el array con []
// si tiene algo lo salva
// llamas a show the city history

function searchCurrent(city) {
    console.log("current");
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json()
           
        }).then(function (data) {
            console.log(data)

             //show city name and current day
             var dateCity = document.createElement("p"); //add the icon
             dateCity.innerHTML = city + " " + now;
             weatherDay.innerHTML="";
             weatherDay.classList="currentStyle"
             weatherDay.appendChild(dateCity);
            
            //get info from API
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var coordlat = data.coord.lat;
            var coordlon = data.coord.lon;
            
           //clear the info
            weatherInfo.innerHTML="";
            listdata.innerHTML="";

             //call UV for get that info passing coords
            searchUV(coordlat, coordlon);

            //display on page the weather data
           
            tempS.textContent = " Temperature:" + " " + temperature + " " + "ºF";
            humS.textContent = " Humidity:" + " " + humidity + " " + "%";
            windS.textContent = " Wind" + " " + "Speed:" + " " + windSpeed + " " + "MPH";

            weatherInfo.classList="card"

            listdata.appendChild( weatherDay)
            listdata.appendChild(tempS)
            listdata.appendChild(humS)
            listdata.appendChild(windS)           
            weatherInfo.appendChild(listdata)

           
        })
       
};

//function UV

function searchUV(lat, lon) {
    console.log(lat,lon)
   
    fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
        .then(function (response) {
      
            return response.json()
        }).then(function (data) {
            console.log("rayos ultra", data)
            //get the UV data
           var ultra=data.value;

           //create the button
           var buttonUVEL=document.createElement("button");
           buttonUVEL.classList= "btn";        
           buttonUVEL.textContent= " UV Index: " + ultra;
          
           //condicional for the conditions are favorable (green), moderate(yellow) or severe(red)
          if (ultra < 3) {
            buttonUVEL.classList.add("btn-success");
          }
          else if (ultra < 7) {
            buttonUVEL.classList.add("btn-warning");
          }
          else {
            buttonUVEL.classList.add("btn-danger");
          }
         
          //display on page the UV data
           listdata.appendChild(buttonUVEL)
           weatherInfo.appendChild(listdata)
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
        // verificar si existe en el array y si no existe entonce push el el array y salvar en local storage // show the list
        searchCurrent(cityIn);
        searchForecast(cityIn);
        //limpiar el input
    } else {
        alert("You need in a City")
    }
  
})









