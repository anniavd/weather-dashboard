var apiKey = "f859703a85a79facc803ec19e50f064c";
var now = moment().format("(L)"); //object moment
var weatherDay =document.querySelector("#showCurrentWeather")


function searchCurrent(city) {
    console.log("current");
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function (response) {
        console.log(response);
        response.json();


   
    });

   // var temperature=response.main.temp;
   // console.log(temperature);
    
    //show city name and current day
    var dateCity =document.createElement("p"); //add the icon
    dateCity.innerHTML= city +" " + now;

    weatherDay.appendChild(dateCity);

};

function searchForecast(city) {

    // buscar y mostrar el 5 dias prevision
   // var url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    console.log("5 days");
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(function (response) {
        console.log(response);
        response.json();
    });

}


//fuction UV

function searchUV( lat,lon) {

     console.log("UV");
    fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(function (response) {
        console.log(response);
        response.json();
    });

}



// listener onclick button

document.getElementById("searchC").addEventListener("click", function (event) {
      event.preventDefault();
    var cityIn = document.getElementById("city").value;

    if(cityIn){
      searchCurrent(cityIn);
     searchForecast(cityIn);  
                              //limpiar el input
    }else{
        alert("You need in a City")
    }
   
})


var listCitySearch=function(cities){

   // for(var i=0; i<cities.lenght.i++){

   // }
}







