const  mongoose = require('mongoose')

var otpSchemaModel = new mongoose.Schema({
    fullname:{ type:String, required:true },
    email:{ type:String, required:true },
    password:{ type:String, required:true },
    otp:{ type:String, required:true }
})

const Otp = mongoose.model('otpSchema',otpSchemaModel)  // design a schema model with name "otpSchema"

module.exports = Otp