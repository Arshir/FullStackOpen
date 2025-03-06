const ShowDetail=({country,weather})=>{
  if(!country || !weather)
    return

  console.log('showing details')
  let languages=[];
  Object.keys(country.languages).forEach(key=>{
    console.log('languages',country.languages["ara"]);
    languages.push(country.languages[key])
  }
   
  )
  return (
  <div>
    <h3>{country.name}</h3>
    <h4>capital {country.capital}</h4>
    <h4>area {country.area} </h4>

   
    
       <h3><em>languages: </em> </h3>
        <ul>
          <em>{languages.map(l=><li>{l}</li>)}</em>
       </ul>

    <img src={country.flag} alt="country flag" height={50} width={50} />

    <h3><em>Weather in {country.capital}</em></h3>

    <p>temperature: {weather.temp} Celcius</p>

    <p><img src={weather.iconUrl} alt="weather icon" height={50} width={50} /></p>

    {/* <p><img src={country.weatherIcon} alt="weather icon" height={50} width={50} /></p> */}

    <em>wind {weather.speed} m/s</em>
    


</div>
  )
}

  export default ShowDetail;