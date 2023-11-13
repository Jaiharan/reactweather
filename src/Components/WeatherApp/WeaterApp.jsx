import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import mist_icon from '../Assets/mist.png'

const WeaterApp = () => {

  let api_key = "a8699aa95f247790d799f22e25407ce4";
  const [wicon, setWicon] = useState(cloud_icon);
  const [bgcolor, setBgColor] = useState("linear-gradient(180deg, #130754 0%, #3b2f80 100%)");
  const [error, setError] = useState(null);

  const search = async () =>{
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value===""){
      setError("Please enter a city name");
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    try{
      let response = await fetch(url);

      if(!response.ok){
        throw new Error("City not found. Please enter a valid city name.")
      }
      let data = await response.json();
      console.log(data);
      const humidity = document.getElementsByClassName("humidity-percent")
      const wind = document.getElementsByClassName("wind-rate")
      const temperature = document.getElementsByClassName("weather-temp")
      const location = document.getElementsByClassName("weather-location")

      
      humidity[0].innerHTML = data.main.humidity+" %";
      wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp)+" °C";
      location[0].innerHTML = data.name;
      


      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear_icon)
        setBgColor("linear-gradient(180deg, #130754 0%, #3b2f80 100%)")
      }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloud_icon)
        setBgColor("linear-gradient(180deg, #130754 0%, #3b2f80 100%)")
      }else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzle_icon)
        setBgColor("linear-gradient(180deg, #130754 0%, #3b2f80 100%)")
      }else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzle_icon)
        setBgColor("linear-gradient(180deg, #130754 0%, #3b2f80 100%)")
      }else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain_icon)
        setBgColor("radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)")
      }else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(rain_icon)
        setBgColor("radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)")
      }else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow_icon)
        setBgColor("radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)")
      }else if(data.weather[0].icon==="50d" || data.weather[0].icon==="50n"){
        setWicon(mist_icon)
        setBgColor("radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)")
      }else{
        setWicon(clear_icon)
        setBgColor("linear-gradient(180deg, #130754 0%, #3b2f80 100%)")
      }
      setError(null);
    }catch(error){
      console.error("Error fetching data:",error.message);
      setError(error.message);
    }

  }

  return (
    <div className='container' style={{background: bgcolor}}>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search'/>
        <div className="search-icon" onClick={() => {search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {
        error && <div className='error-message'>{error}</div>
      }
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        24°C
      </div>
      <div className="weather-location">
        London
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percent">
              64%
            </div>
            <div className="text">
              Humidity
            </div>
          </div>
        </div>
        <div className="element">
            <img src={wind_icon} alt="" className='icon'/>
            <div className="data">
              <div className="wind-rate">
                18 km/h
              </div>
              <div className="text">
                Wind
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WeaterApp