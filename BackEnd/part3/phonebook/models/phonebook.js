const { default: mongoose } = require("mongoose");

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URL

mongoose.connect(url).
then(success=> console.log('MongoDB connection succeeded')).
catch(error=>{
    console.log('Failure establishing connection to MONGODB',error.message)
})

const contactSchema = mongoose.Schema(
    {
        name: String,
        number: String,
     }
)

contactSchema.set('toJSON',{
    transform: (document, returnedDocument)=>{
        returnedDocument.id = returnedDocument._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v
    }
})

/*contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })*/


 module.exports = mongoose.model('contactModel',contactSchema)



