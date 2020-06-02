import React, {useState} from 'react';
import './App.css';
const api = 'YOUR API KEY';


function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})


  const datebuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${month} ${date} , ${year}`
  }


  const search = evt=>{
    if(evt.key === "Enter")
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api}`)
        .then(res => res.json())
        .then(result=>{
          setWeather(result);
          setQuery('')
          console.log(result)
        })
        
  }

  const setBackground = (weather)=>{
    if(typeof weather.main === 'undefined')
      return 'app';
    else if(weather.weather[0].main === 'Clouds')
      return 'app';
    else if(weather.weather[0].main === 'Rain')
      return 'app rain'
    else if(weather.weather[0].main === 'Snow')
      return 'app snow'
    else if(weather.weather[0].main === 'Thunderstorm')
      return 'app thunderstorm'
    else if(weather.weather[0].main === 'Drizzle')
      return 'app drizzle'
    else 
      return 'app'
  }

  const setIcon = (weather)=>{
    if(weather === 'Clouds')
      return "fas fa-cloud"
    else if(weather === 'Rain')
      return "fas fa-cloud-showers-heavy"
    else if(weather === 'Snow')
      return "fas fa-snowflake"
    else if(weather === 'Thunderstorm')
      return "fas fa-bolt"
    else if(weather === 'Drizzle')
      return "fas fa-cloud-rain"
    else
      return "fas fa-sun"

  }
  return (
    <div className={setBackground(weather)}>
        
        <main>
          <div className = "search-box">
              <input 
                  name= "search"
                  type = "text"
                  className = "search-bar"
                  placeholder = "Search"
                  onChange = {e=>setQuery(e.target.value)}
                  value = {query}
                  onKeyPress = {search}
              />
          </div>

          {(typeof weather.main != "undefined") ?(
          <div className = "weather-container">
            <div className="location-box">
                <div className="location"> {weather.name}, {weather.sys.country}</div>
                <div className = "date">{datebuilder(new Date())}</div>
            </div>

            <div className = "weather-box">
                <div className = "temp">
                    {Math.round(weather.main.temp)}ºC
                </div>

                <div className = "weather">
                    <i className = {setIcon(weather.weather[0].main)}
                    />
                    {'  '}
                    {weather.weather[0].main}
                    
                </div>

                <div className = "wind">
                    <i className = "fas fa-wind" />
                    {' '}
                    {weather.wind.speed}{' '} m/s
                </div>
            </div>

          </div>
          ): ('')}
        </main>
    </div>
  );
}

export default App;
