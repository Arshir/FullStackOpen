import axios from "axios";
const weatherBaseUrl ='https://api.openweathermap.org/data/2.5/weather' //?lat={lat}&lon={lon}&appid={API key}';
const weatherIconUrl='https://openweathermap.org/img/wn/{iconCode}@2x.png'

console.log('data source url',weatherBaseUrl)


const  getCurrentWeatherByCity=  async (city,key)=> {
  try {
     console.log('city and the key',city, key)
    let currentWeatherUrlByCity=weatherBaseUrl+'?q='+city+'&appid='+key;
    console.log('weather url:',currentWeatherUrlByCity)
    const res = await axios.get(currentWeatherUrlByCity)
    console.log('weather api response',res)

   const weather= {
        temp:res.data.main.temp,
        name:res.data.weather[0].main,
        description: res.data.weather[0].description,
        speed: res.data.wind.speed,
        deg: res.data.wind.deg,
        iconCode:res.data.weather[0].icon,
        iconUrl:weatherIconUrl.replace('{iconCode}',res.data.weather[0].icon)
        
    }

    return weather;
 
  } catch (error) {
      console.log('Error occurred when attempting to get weather by city',error)
  }

}




console.log('data load completed')

const weatherService = {getCurrentWeatherByCity}

export default weatherService;