import { useState,useEffect } from "react";
import countryService from "./services/country"
import ShowMessage from "./ShowMessage"
import DisplayList from "./DisplayList"
import ShowDetail from "./Detail";
import weatherService from "./services/weather";

const App=()=>{

 //const [country,setCountry]=useState('');

 const [countries,setCountries]= useState([])
 //const [message,setMessage]= useState(<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
 //No  matches. Specify another filter</div>)
 const [search,setSearch]= useState('')
 const [weather,setWeather]=useState(null)
 const [country,setCountry]= useState(null)
let message = <div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
No  matches. Specify another filter</div>
  

  useEffect( ()=>{
    
    const loadData= async ()=>{ 
      console.log('countries data loading')
      //let isToExecute=true;
      await countryService.getAll().then(res=>{
        console.log('countries data',res);
       setCountries(res)
      }).catch(error=>{
        setCountries([])
       // setMessage(<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
        //  The countries data could not be retrieved. {error}</div>)
        message = <div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
         The countries data could not be retrieved. {error}</div>
  }) 
    //return ()=>isToExecute==false;
 }
   loadData();
  } ,[]);

  useEffect(()=>{
    console.log('calling useEffect to load weather')
    const getcityWeather = async ()=>{
       const res=await weatherService.getCurrentWeatherByCity(country.capital,APIKey)//.then(res=>{
        console.log("weather data",res)
    
        if(country) console.log('calling useEffect to load weather after country is set')
        setWeather(res)
     
    }
    if (country)  getcityWeather();

  },[country]);

 const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
 console.log('api key', APIKey)

  let   countryNames =[]
  if(search)
  {
    console.log('type search term', search)
    const filterCountries = countries.filter(f=>f["name"]["common"].toLowerCase().includes(search.toLowerCase()))
    let count= filterCountries.length;
    let refreshCountry= false,refreshWeather=false;
     console.log('filtered countries',filterCountries)
     refreshWeather =  country?.name!==filterCountries[0]?.name.common? true : false
     refreshCountry =  country?.name!==filterCountries[0]?.name.common? true : false
     console.log('refreshWeather',refreshWeather)
     console.log(country)
    if (count>10)
   
      message=<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
      Too many matches . Please specify another filter</div>
    else if(count>1)
      {
         countryNames = filterCountries.map(c=> c.name.common)
         console.log('Country names',countryNames)
         message =''
      }
       

    else if(count===1 && refreshCountry)
     {
       console.log('filtered country',filterCountries[0])
       
       let selectedCountry={}
       selectedCountry.name= filterCountries[0].name.common;
       selectedCountry.capital= filterCountries[0].capital[0];
       selectedCountry.area= filterCountries[0].area;
       selectedCountry.languages= filterCountries[0].languages;
       selectedCountry.flag=filterCountries[0].flags.png;
       selectedCountry.latitude = filterCountries[0].latlng[0];
       selectedCountry.longitude = filterCountries[0].latlng[1];
       console.log('country',country);
       message='';
       setCountry(selectedCountry);     
         
     }
     else{
       message='';
     }
        
  }
      
     return (
        <div>
        find countries<input name='search' value={search} onChange={(event)=>{ event.preventDefault(); setSearch(event.target.value)}}/>
          <ShowMessage message={message} />
          <DisplayList list={countryNames} showDetail={setSearch}  />
          <ShowDetail country={country} weather={weather} />
        </div>
     )
      


}
export default App;
