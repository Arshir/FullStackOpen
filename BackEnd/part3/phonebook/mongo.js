const { default: mongoose } = require("mongoose");

if(process.argv.length<3)
{
    console.log('Please provide the password to connect to the database')
    process.exit(1)
}
 let inputArray = process.argv.slice(2)
console.log('process argument:',inputArray)
const [password,name, number] = inputArray
console.log('password:',password)
//          mongodb+srv://sa:<db_password>@cluster0.hewaq.mongodb.net/?retryWrites=true&w=majority&appName=cluster0
const url =`mongodb+srv://sa:${password}@cluster0.hewaq.mongodb.net/?retryWrites=true&w=majority&appName=cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({name: String, number: String})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const contactModel= mongoose.model('Contact',contactSchema)



if(name && number){
    const contactNew = new contactModel({
        name: name,
        number:  number,
    })

    contactNew.save().then(result=>{
        console.log(`Added ${name} number ${number} to the phonebook`)

        mongoose.connection.close()
    })
}else{

    contactModel.find({}).then(result=>{
        console.log('Phonebook: \n')
       result.forEach(contact=> console.log(contact.toJSON()))
        mongoose.connection.close()
    })

}
