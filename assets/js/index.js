
let dayNumber=document.querySelector(".DayNumber");
let day=document.querySelector(".day");
let monthWeather=document.querySelector(".Monthweather");
let weatherLocation=document.querySelector(".weatherlocation");
let weatherTempature=document.querySelector(".weathertempature");
let weatherImg=document.querySelector(".weatherimg");
let weatherStatus=document.querySelector(".weatherstatus");
let weatherDegree=document.querySelector(".weatherdegree");
let weatherSpeed=document.querySelector(".weatherdirection");
let weatherdirection=document.querySelector(".weatherdi");
let nextImg=document.getElementsByClassName("nextimg");
let nextMax=document.getElementsByClassName("nextmax");
let nextMin=document.getElementsByClassName("nextmin");
let nextStatus=document.getElementsByClassName("nextstatus");
let nextDay=document.getElementsByClassName("nextday");
let inputSearch=document.querySelector(".inputSearch");
let links=document.querySelectorAll("nav ul li")



async function getData(cityName){
    let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=774028c5893b4a06933182752251306&q=${cityName}&days=3`);
    let weatherData=await response.json();
return weatherData
}
function displayToday(data){
    let today=new Date();
    day.innerHTML=today.toLocaleDateString("en-us",{weekday:"long"});
dayNumber.innerHTML=today.getDate();
monthWeather.innerHTML=today.toLocaleDateString("en-us",{month:"long"})

weatherLocation.innerHTML=data.location.name;
weatherTempature.innerHTML=data.current.temp_c;
weatherImg.setAttribute("src",data.current.condition.icon);
weatherStatus.innerHTML=data.current.condition.text;
weatherDegree.innerHTML=data.current.humidity + "%";
weatherSpeed.innerHTML=data.current.wind_kph+"km/h";
weatherdirection.innerHTML=data.current.wind_dir;
}
function displayNextDay(data){
    let forecastData=data.forecast.forecastday;
    console.log(forecastData)
    
  for(let i=0 ; i<2 ; i++){
    let nextDate=new Date(forecastData[i+1].date);
    nextDay[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"});
    nextMax[i].innerHTML=forecastData[i+1].day.maxtemp_c;
    nextMin[i].innerHTML=forecastData[i+1].day.mintemp_c;
    nextImg[i].setAttribute("src",forecastData[i+1].day.condition.icon);
    nextStatus[i].innerHTML=forecastData[i+1].day.condition.text;    
  }
   
}

async function startApp(city="cairo"){
    let weatherResponse= await getData(city);
    if(!weatherResponse.error){
         displayToday(weatherResponse)
displayNextDay(weatherResponse)
    }
       
    

}
startApp()
inputSearch.addEventListener("input",function(){
startApp(inputSearch.value)
})
for(let i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        let activeLinks=document.querySelector("nav ul .active");
        activeLinks.classList.remove("active");
        e.target.classList.add("active");
    })
}