var apiKey = "f859703a85a79facc803ec19e50f064c";
var now = moment().format("(L)"); //object moment
var weatherDay = document.querySelector("#showCurrentWeather")
var weatherInfo = document.querySelector("#weather-container")
var daysFore=document.querySelector("#forecast")
var  divAllDay =document.querySelector("#allday")

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
   // console.log(lat,lon)
   
    fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
        .then(function (response) {
      
            return response.json()
        }).then(function (data) {
           
            //get the UV data
           var ultra=data.value;

           //create the button
           var buttonUVEL=document.createElement("button");
           buttonUVEL.classList= "btn";        
           buttonUVEL.textContent= ultra;
          
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
          UVel.innerText = "UV Index:"+" ";
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
          console.log("forescat",data)

        //queremos los indices de 4, 12, 20, 28, y 36
        //nos da la informacion de noon por cada dia
            console.log("displaying temps");
      /*  for (var i = 4; i < 37; i += 8) {
            console.log(data.list[i].main.humidity)
            console.log(data.list[i].main.temp)
        }*/
        var titleforecast=document.createElement("h2")
        var firstDT=document.createElement("p")
        var firstDH=document.createElement("p")
        var container=document.createElement("div")

       // var secondDT=data.list[12].main.humidity;
       // var secondDH=data.list[12].main.temp;
        
        titleforecast.textContent="5-Day Forecast:"
        container.classList='card text-white bg-primary mb-3" style="max-width: 18rem;'
        firstDT.textContent = " Temperature:" + " " + data.list[4].main.temp + " " + "ºF";
        firstDH.textContent = " Humidity:" + " " +data.list[4].main.humidity;+ " " + "%";
        
        //show  5 day forecast
        divAllDay.appendChild(firstDT)  
        divAllDay.appendChild( firstDH) 
        container.appendChild(divAllDay)
           
        daysFore.appendChild(titleforecast)
        daysFore.appendChild( container)



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









