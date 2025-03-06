const { default: mongoose } = require('mongoose')
//const {  } = require('uuid')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URL

mongoose.connect(url).
  then(() => console.log('MongoDB connection succeeded')).
  catch(error => {
    console.log('Failure establishing connection to MONGODB',error.message)
  })

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    minLength:5
  },

  number: {
    type: String,
    validate: {
      validator: function(v){
        return /^(\d{2,3}-\d{5,})$/.test(v)
      },
      message: props => `${ props.value} is not a valid phone number!`
    },
    required:[true,'User phone number required']
  }
}
)

contactSchema.set('toJSON',{
  transform: (document, returnedDocument) => {
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



