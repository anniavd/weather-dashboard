var apiKey = "f859703a85a79facc803ec19e50f064c";
var now = moment().format("(L)"); //object moment
var weatherDay = document.querySelector("#showCurrentWeather")
var weatherInfo = document.querySelector("#weather-container")
//var daysFore = document.querySelector("#forecast")
//var divAllDay = document.querySelector("#allday")
var title= document.querySelector("#tittle5")
//forecast
var day1 = document.querySelector("#eachday1")
//var divTwo = document.querySelector("#two")
var day2 = document.querySelector("#eachday2")
var day3 = document.querySelector("#eachday3")
var day4 = document.querySelector("#eachday4")
var day5 = document.querySelector("#eachday5")

//var total=document.querySelector("#totalInfo")
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

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function (response) {
      return response.json()

    }).then(function (data) {
      // console.log(data)

      //show city name and current day
      var dateCity = document.createElement("p"); //add the icon
      dateCity.innerHTML = city + " " + now;
      weatherDay.innerHTML = "";
      weatherDay.classList = "currentStyle"
      weatherDay.appendChild(dateCity);

      //get info from API
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;
      var coordlat = data.coord.lat;
      var coordlon = data.coord.lon;

      //clear the info
      weatherInfo.innerHTML = "";
      listdata.innerHTML = "";

      //call UV for get that info passing coords
      searchUV(coordlat, coordlon);

      //display on page the weather data

      tempS.textContent = " Temperature:" + " " + temperature + " " + "ºF";
      humS.textContent = " Humidity:" + " " + humidity + " " + "%";
      windS.textContent = " Wind" + " " + "Speed:" + " " + windSpeed + " " + "MPH";

      weatherInfo.classList = "card"

      listdata.appendChild(weatherDay)
      listdata.appendChild(tempS)
      listdata.appendChild(humS)
      listdata.appendChild(windS)
      weatherInfo.appendChild(listdata)

    })

};

//function UV

function searchUV(lat, lon) {
  // console.log(lat,lon)

  fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(function (response) {

      return response.json()
    }).then(function (data) {

      //get the UV data
      var ultra = data.value;

      //create the button
      var buttonUVEL = document.createElement("button");
      buttonUVEL.classList = "btn";
      buttonUVEL.textContent = ultra;

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

      var UVel = document.createElement("div");
      UVel.innerText = "UV Index:" + " ";
      UVel.appendChild(buttonUVEL);

      //display on page the UV data
      listdata.appendChild(UVel)
      weatherInfo.appendChild(listdata)
    })
}


//function forecast

function searchForecast(city) {

  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("forescat", data)

     
      var titleforecast = document.createElement("h2")
      
      var firstDT = document.createElement("p")
      var firstDH = document.createElement("p")
      var secDT = document.createElement("p")
      var sectDH = document.createElement("p")
      var thiDT = document.createElement("p")
      var thiDH = document.createElement("p")
      var fourDT = document.createElement("p")
      var fourtDH = document.createElement("p")
      var fifDT = document.createElement("p")
      var fifDH = document.createElement("p")
     // var container = document.createElement("div")

      
      // tittle for show each day
      titleforecast.textContent = "5-Day Forecast:"
      
      // container.classList='card text-white bg-primary mb-3" style="max-width: 18rem;'
      firstDT.textContent = " Temperature:" + " " + data.list[4].main.temp + " " + "ºF";
      firstDH.textContent = " Humidity:" + " " + data.list[4].main.humidity; + " " + "%";
      day1.classList = 'text-white bg-primary  style  ';

      //second day
      secDT.textContent = " Temperature:" + " " + data.list[12].main.temp + " " + "ºF";
      sectDH.textContent = " Humidity:" + " " + data.list[12].main.humidity; + " " + "%";
      day2.classList = ' text-white bg-primary style';

      //third day
      thiDT.textContent = "Temperature:" + " " + data.list[20].main.temp + " " + "ºF";
      thiDH.textContent = " Humidity:" + " " + data.list[20].main.humidity; + " " + "%";
      day3.classList = 'text-white bg-primary  style';

      //fourth day
      fourDT.textContent = "Temperature:" + " " + data.list[28].main.temp + " " + "ºF";
      fourtDH.textContent = " Humidity:" + " " + data.list[28].main.humidity; + " " + "%";
      day4.classList = 'text-white bg-primary  style';

      //fifth day
      fifDT.textContent = "Temperature:" + " " + data.list[32].main.temp + " " + "ºF";
      fifDH.textContent = " Humidity:" + " " + data.list[32].main.humidity; + " " + "%";
      day5.classList = 'text-white bg-primary  style';

      //show  5 day forecast
       //clear the info
      title.textContent="";
      day1.textContent="";
      day2.textContent="";
      day3.textContent="";
      day4.textContent="";
      day5.textContent="";

     //display the info
      title.appendChild(titleforecast)
      day1.appendChild(firstDT)
      day1.appendChild(firstDH)
      day2.appendChild(secDT)
      day2.appendChild(sectDH)
      day3.appendChild(thiDT)
      day3.appendChild(thiDH)
      day4.appendChild(fourDT)
      day4.appendChild(fourtDH)
      day5.appendChild(fifDT)
      day5.appendChild(fifDH)
      
      
    })
}

/*
<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
*/

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









