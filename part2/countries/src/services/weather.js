import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const getUrl = ({lat, lng}) => {
    return `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&appid=${api_key}`
}


const getWeather = ({lat, lng}) => {
  const request = axios.get(getUrl({lat: lat, lng: lng}))
  return request.then(response => {
    return response.data})
}

export default {getWeather}