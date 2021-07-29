import React ,{useState,useEffect}from 'react'
import WeatherCard from './WeatherCard';
import './style.css';

const Temp = () => {
    const [searchValue,setSearchValue] = useState("bhopal");
    const [tempInfo,setTempInfo] = useState({});
    const getWeatherInfo = async () =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=18182e215847a2ee36e1d53f1650a9fd`;
            const res = await fetch(url);
            const data = await res.json();
            
            const { temp, humidity, pressure } = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country,sunset} = data.sys;
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                country,
                speed,
                sunset,

            }
            setTempInfo(myNewWeatherInfo);

        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getWeatherInfo();
    }, [])
    return (
        <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder="search.."
                 autoFocus id="search" className="searchTerm"
                 value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)} />
                 <button type="button" className="searchButton"
                 onClick={getWeatherInfo}>Search</button>
            </div>
        </div>
        {/* our temp card */}
        <WeatherCard tempInfo={tempInfo}/>
        </>
    )
}

export default Temp
