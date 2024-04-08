const  mongoose = require('mongoose')

var schema = new mongoose.Schema({
    fullname : { type : String , required: true },
    email : { type : String, required : true },
    password : { type : String, required : true }
})

const User = mongoose.model('userSchema',schema)  // design a schema model in userschemas collection

module.exports = User