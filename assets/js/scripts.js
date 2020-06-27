var apiKey = "f859703a85a79facc803ec19e50f064c";
//date
var now = moment().format("(L)"); //object moment
var date1 = moment().add(1, 'days').format("(L)");
var date2 = moment().add(2, 'days').format("(L)"); 
var date3 = moment().add(3, 'days').format("(L)"); 
var date4 = moment().add(4, 'days').format("(L)"); 
var date5 = moment().add(5, 'days').format("(L)"); 

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

var list=[];
 


function searchCurrent(city) {

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function (response) {
      return response.json()
  
    }).then(function (data) {
       console.log(data)

      //show city name and current day
      var dateCity = document.createElement("div"); //add the icon
      var image=document.createElement("img")
      var imageUrl="http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

      image.setAttribute("src", imageUrl)
      dateCity.innerHTML = city + " " + now + image ;
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

     //create elements
      var titleforecast = document.createElement("h2")
      
      var firstDT = document.createElement("p")
      var firstDH = document.createElement("p")
      var time1=document.createElement("h6")
      var secDT = document.createElement("p")
      var secDH = document.createElement("p")
      var time2=document.createElement("h6")
      var thiDT = document.createElement("p")
      var thiDH = document.createElement("p")
      var time3=document.createElement("h6")
      var fourDT = document.createElement("p")
      var fourDH = document.createElement("p")
      var time4=document.createElement("h6")
      var fifDT = document.createElement("p")
      var fifDH = document.createElement("p")
      var time5=document.createElement("h6")
     // var container = document.createElement("div")

      
      // tittle for show each day
      titleforecast.textContent = "5-Day Forecast:"
      
      // container.classList='card text-white bg-primary mb-3" style="max-width: 18rem;'
      time1.textContent=date1;
      firstDT.textContent = " Temperature:" + " " + data.list[4].main.temp + " " + "ºF";
      firstDH.textContent = " Humidity:" + " " + data.list[4].main.humidity; + " " + "%";
      day1.classList = 'text-white bg-primary  style  ';

      //second day
      time2.textContent=date2;
      secDT.textContent = " Temperature:" + " " + data.list[12].main.temp + " " + "ºF";
      secDH.textContent = " Humidity:" + " " + data.list[12].main.humidity; + " " + "%";
      day2.classList = ' text-white bg-primary style';

      //third day
      time3.textContent=date3;
      thiDT.textContent = "Temperature:" + " " + data.list[20].main.temp + " " + "ºF";
      thiDH.textContent = " Humidity:" + " " + data.list[20].main.humidity; + " " + "%";
      day3.classList = 'text-white bg-primary  style';

      //fourth day
      time4.textContent=date4;
      fourDT.textContent = "Temperature:" + " " + data.list[28].main.temp + " " + "ºF";
      fourDH.textContent = " Humidity:" + " " + data.list[28].main.humidity; + " " + "%";
      day4.classList = 'text-white bg-primary  style';

      //fifth day
      time5.textContent=date5;
      fifDT.textContent = "Temperature:" + " " + data.list[32].main.temp + " " + "ºF";
      fifDH.textContent = " Humidity:" + " " + data.list[32].main.humidity; + " " + "%";
      day5.classList = 'text-white bg-primary  style';

      //show  5 day forecast
       //clear the info
      title.textContent=""; day1.textContent="";   day2.textContent=""; day3.textContent="";  day4.textContent="";    day5.textContent="";
     
     //display the info
      title.appendChild(titleforecast)
      day1.appendChild(time1)
      day1.appendChild(firstDT)
      day1.appendChild(firstDH)

      day2.appendChild(time2)
      day2.appendChild(secDT)
      day2.appendChild(secDH)

      day3.appendChild(time3)
      day3.appendChild(thiDT)
      day3.appendChild(thiDH)

      day4.appendChild(time4)
      day4.appendChild(fourDT)
      day4.appendChild(fourDH)

      day5.appendChild(time5)
      day5.appendChild(fifDT)
      day5.appendChild(fifDH)
      
   })
}
 
// list of cities
var listado=document.querySelector("#listCity");
var listcities= function(cityIn){
  
  var firstC=document.createElement("button")
  //firstC.classList.add("newbutton")

  firstC.textContent=cityIn;
  listado.appendChild(firstC)

}

/*document.getElementById("listCity").addEventListener("click","button", function (){
 
  searchCurrent(this.text);
  searchForecast(this.text);
} )*/

// listener onclick button

document.getElementById("searchC").addEventListener("click", function (event) {
  event.preventDefault();
  var cityIn = document.getElementById("city").value;
  listcities(cityIn);  
  if (cityIn) {
    list.push(cityIn)
    localStorage.setItem("name",list);
    
    searchCurrent(cityIn);
    searchForecast(cityIn);
    //limpiar el input
  } else {
    alert("You need in a City")
  }

})









