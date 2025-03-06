import axios from "axios";

//const baseurl = 'http://localhost:3002/persons'

const baseurl = '/api/persons'

const create= newperson =>{
   const request = axios.post(baseurl, newperson)
   return request.then(response => {
    console.log('create contact api response',response)
    return response.data
   })
   .catch(error=>{
    console.log('error api response',error)
    return error.response.data
   }//.error.errors.name.message 
   /*  { 
        console.log('logging',error)
       return error.response.data.error.errors.name.message
    } */

   )
}

const getAll =()=>axios.get(baseurl).then(response=>response.data);

const remove=(id)=>{
    const delUrl = baseurl+'/'+id
    console.log(delUrl)
    return axios.delete(delUrl).then(response=>response.data)
}

const update=(updatePerson)=>{
    console.log('update person received at service',updatePerson);
    const updateUrl= baseurl+'/'+ updatePerson.id;
    console.log('update url is ',updateUrl);
    const request = axios.put(updateUrl,updatePerson);
    console.log(request);
    return request.then(res=>res.data);
}

 const personService= {
    create,
    getAll,
    remove,
    update
}

export default personService