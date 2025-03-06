import axios from "axios";
const countryDSUrl ='https://studies.cs.helsinki.fi/restcountries/api/all';
console.log('data source url',countryDSUrl)

const  getAll= async ()=> 
    // {
    // console.log('getting the data')
    await axios.get(countryDSUrl).then(res=>res.data)
        
      /*   const data=res.data;
        console.log(data)
        return data;
    })
}; */

console.log('data load completed',getAll)

const countryService = {getAll}

export default countryService;