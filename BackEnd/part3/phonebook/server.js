require('dotenv').config()


const express  = require("express")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(express.static('build'))

const contactModel = require('./models/phonebook.js')

// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body'))

// app.use(morgan('combined'))
morgan.token('body', req=> {
  return JSON.stringify(req.body)
})

//  morgan.token('body',function getReqBodyToken(req){
//        req.logBody = req.body
// })


 app.use(morgan(':body :method :url :response-time :req[header]'))
// app.use(morgan('tiny'))



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
  
    contactModel.find({})
    .then(ls=> {
       console.log('result ',ls)
      res.json(ls)})
    .catch(error=>{
      next(error)
      //res.status(400).json({error: `Error encountered when getting all contacts ${error.message}`})
    })    
})

app.get('/info',(req,res)=>{
    
    let count = contactModel.countDocuments().then(count=>{
      let reqTime = Date();
      res.send(`Phonebook has info for ${count} people <br> ${reqTime}`)
      
    }
      ).catch(error=> res.send('error occurred when getting contact count'))
  
    
     

});
  

app.get('/api/persons/:id',(req,res)=>{
    const personId = req.params.id
    contactModel.findById(personId).
    then( person=>{
        if(person){
          res.json(person)
        }else{
          res.statusMessage="No phonebook entry found for this ID "+ personId
         res.status(404)
         res.send(`No phonebook entry found for this ID  ${personId}`)

        }
    }
     
    ).catch(error=>
        next(error)
     // res.status(400).send(`Bad request receive from client. Please send proper request.${error}`)
    )
        
})

app.delete('/api/persons/:id',(req,res,next)=>{
  const personId = req.params.id
  contactModel.findByIdAndDelete(personId).
  then(result=>
     res.status(204).end()
  )
  .catch(error=> next(error))
})

app.patch('/api/persons/:id',(req,res,next)=>{
   const body = req.body
   if(body)
   {
     const person = {
      name: body.name,
      number: body.number
     }
       console.log('update person',person)
     contactModel.findByIdAndUpdate(req.params.id, person,{new:true})
     .then(result=> res.json(result))
     .catch(error=>next(error))
   }

})

app.post('/api/persons',(req,res,next)=>{
  const item = req.body
  try{


    if(item ){
      let errors = validate(item)

      

      if(errors ) 
      {

        console.log('validation error',errors)
        res.status(404)
        res.send(errors)
         

      }else{

        console.log('no error')

        const personContact = new contactModel({
          "name": item.name,
          "number": item.number
        })
        
       /* const person = {
         /// "id": GenerateId(1,100),
          "name": item.name,
          "number": item.number
        }
        */
        //persons.push(person)
        personContact.save().then(person=>{
    
        res.status(201).send(`New contact added to the phone with Id ${person.id} and name ${person.name} and number ${person.number}`)
          }).catch(error=>{
            console.log('logging',error)
            res.status(500).json({error:error})
          })
      }
       

     
  
    }else{
       res.statusCode(400).send("Bad request. Invalid entry details")

    }

  } catch (error){
   // res.send(`The following error occurred while adding new entries with details as ${error}`)
     next(error)
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
  let error=null//[]
  if(!payload.name)
    error={"error":"name is missing"}//error.push({"error":"name is missing"})
  else if(!payload.number)
   error={"error":"number is missing"}// error.push({"error":"number is missing"})
  else if(persons.find(p=>p.name===payload.name))
  {
    console.log('duplicate',persons.find(p=>p.name===payload.name))
    error={"error":"name already exist in phonebook"}// error.push({"error":"name already exist in phonebook"})

  }
    console.log("validation error",error)
    return error
 }

 const errorHandler =(error,req,res,next)=>{
     res.status(500).send(`An error was encountered while running the task ${error}. Please try again or contact Administrator`)
     
 }

 app.use(errorHandler)


 const PORT = process.env.PORT || 3001


app.listen(PORT,()=>console.log(`APP running and listening on the port ${PORT}`))