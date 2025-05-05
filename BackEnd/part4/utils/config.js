 require('dotenv').config()

 const MONGODB_URL = process.env.NODE_ENV==="test"? process.env.MONGODB_TestURL: process.env.MONGODB_URL
 const PORT =process.env.PORT || 3002

 module.exports = {
    MONGODB_URL,
    PORT
 }