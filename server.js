const express  = require("express")
const app = express()

app.use(express.json())

let persons =[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    let people = persons.length
    let reqTime = Date();
    res.send(`Phonebook has info for ${people} people <br> ${reqTime}`)
})

app.get('/api/persons/:id',(req,res)=>{
    const personId = req.params.id
    const person = persons.filter(p=>p.id==personId)
    if(person.length>0)
      res.json(person)
    else
    {
        res.statusMessage="No phonebook entry found for this ID "+ personId
        res.status(404)
        res.send(`No phonebook entry found for this ID  ${personId}`)

    }
      
})

app.delete('/api/persons/:id',(req,res)=>{
  const personId = req.params.id
  persons = persons.filter(p=>p.id!==personId)
  res.status(204).end()
})

app.post('/api/persons',(req,res)=>{
  const item = req.body
  try{


    if(item ){
      let errors = validate(item)

      

      if(errors ) 
      {

        console.log(errors)
        res.status(404)
        res.send(errors)
         

      }else{
        
        const person = {
          "id": GenerateId(1,100),
          "name": item.name,
          "number": item.number
        }
        
        persons.push(person)
    
        res.status(201).send(`New contact added to the phone with Id ${person.id} and name ${person.name} and number ${person.number}`)

      }
       

     
  
    }else{
       res.statusCode(400).send("Bad request. Invalid entry details")

    }

  } catch (error){
    res.send(`The following error occurred while adding new entries with details as ${error}`)
  }

  

})

const GenerateId=(min, max)=>
{
  minCeil = Math.ceil(min)
  maxFloor = Math.floor(max)
  return Math.floor(Math.random()*(maxFloor - minCeil+1)+ minCeil)
}

const validate=(payload)=>
{
  console.log('payload',payload)
  let error={}//[]
  if(!payload.name)
    error={"error":"name is missing"}//error.push({"error":"name is missing"})
  else if(!payload.number)
   error={"error":"number is missing"}// error.push({"error":"number is missing"})
  else if(persons.find(p=>p.name==payload.name))
  {
    console.log('duplicate',persons.find(p=>p.name==payload.name))
    error={"error":"name already exist in phonebook"}// error.push({"error":"name already exist in phonebook"})

  }
    console.log("validation error",error)
    return error
 }

const PORT = 3001
app.listen(PORT,()=>console.log(`APP running and listening on the port ${PORT}`))