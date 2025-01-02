import { useState,useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Button from './Button'
import TextInput from './TextInput'
import ShowMessage from './ShowMessage'
//import axios from 'axios'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')
  const [displayMessage,setDisplayMessage]=useState('')

   const getPerson =()=>{
    personService.getAll()
    .then (personList=> 
      setPersons(personList)
     
    )
    .catch(error=>{
      alert('Error when getting person data list from the server. Please try again.')
      setPersons([])
    })
   

   };
  
   useEffect(getPerson,[])


  const searchOnchange =(event)=>{
    
    const search = event.target.value
      setSearch(search)
  }
   console.log('search',search)
  const personsToShow = search? persons.filter(p=>p.name.toUpperCase().startsWith(search.toUpperCase())): persons

  const handleRemove=(event,id)=>{
      event.preventDefault()
      console.log('remove button is clicked to remove person with id',id);
      if(id>0){
        if(window.confirm(`Are you sure you want to delete ${id}`))
        {

          personService.remove(id).then(response=>{
            
            const ls = persons.filter(p=>p.id!==id)
            console.log('Person data list',ls);
            setPersons(ls)
            setDisplayMessage(<div style={{color:'red',borderStyle:'solid',borderColor:'green'}}>The contact has been removed successfully</div>)
            setTimeout(()=>{setDisplayMessage(null)},5000)
          })
          .catch(error=>{
              alert('Error occurred when attempting to remove a person contact. Please try again')
              setPersons(persons)
          })
        }
        }
       
  }

  const handleSubmit = (event)=>{
     event.preventDefault()
     if(!newName) return
    
     const newperson= {
      name : newName,
      number:phoneNumber
     }
     
     
     if(persons.filter(p=>p.name===newName).length>0)
       { 
          console.log('New name',newName);
          console.log('Persons list during update',persons);
          const updatePerson= persons.find(p=>p.name===newName);
          updatePerson.number= phoneNumber;
          console.log('update person',updatePerson);
          if( !window.confirm(`${updatePerson.name} is already added to phonebook, replace the old number with a new one`))
              return ;
        // setNewName('') 
        //return

            personService.update(updatePerson).then(res=>{
              console.log('Update request response',res);
            const personLst = persons.map((p)=>
              { 
                console.log(p);
                if(p.name===newName){
                      return { ...p, number:phoneNumber};
                }
                console.log(p);
              return p;
              });

              setPersons(personLst);

              setDisplayMessage(<div style={{color:'green',borderStyle:'solid',borderColor:'green'}}>The phonenumber for  {newName} has been updated successfully to {phoneNumber}</div>)
              setTimeout(()=>{setDisplayMessage(null)},5000)
            }).catch(error=>{
              setDisplayMessage(<div style={{color:'red',borderStyle:'Solid',borderColor:'red'}}>Sorry,the contact has already been removed </div>)
              setTimeout(()=>{setDisplayMessage(null)},5000)
            });
          }else{

            personService.create(newperson).then(addedPerson=>{ 
              setPersons([...persons,newperson])
              setDisplayMessage(<div style={{color:'green',borderStyle:'solid',borderColor:'green'}}>The contact {addedPerson.name} was added  successfully with phone number: {addedPerson.number}</div>)
              setTimeout(()=>{setDisplayMessage(null)},5000)
            }).catch(error=>{
              alert('Error adding new person to the list at the server. Please try again');
              setPersons(persons)
            })
          }
     

    // setPersons(persons.concat(newperson))

     setNewName('')
     setPhoneNumber(' ')
  }
  console.log(persons);
  const submitButton=<Button label='add' onSubmitHandler={handleSubmit}  />
  //const removeButton=<Button label='remove' OnSubmitHandler={handleRemove} />
  const nameInput =<TextInput label='name' value={newName} onChangeHandler={(event)=>setNewName(event.target.value)} placeholder='type person name here' />
  const numberInput =<TextInput label='number' value={phoneNumber} onChangeHandler={(event)=>setPhoneNumber(event.target.value)} placeholder='type phone number here' />
  return (
    <div>
      <h2>Phonebook</h2>
    
      <ShowMessage message={displayMessage} />
      <Filter label='filter to show' value={search} onChangeHandler={searchOnchange} />
       <PersonForm nameInput={nameInput} numberInput={numberInput} submitButton={submitButton} />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((p)=><li key={p.name}>{p.name} {p.number}  <Button label='remove' onSubmitHandler={(event)=>handleRemove(event,p.id)} /> </li>)}
       
      </ul>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App

