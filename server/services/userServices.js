const User = require('../model/user')
const Otp = require('../model/otp')
var {generateOTP} = require('../email/generateOTP')
const bcrypt = require('bcrypt')
var sendEmail = require('../email/storeAndSendOTP')

exports.userExist = async (query)=>{
    let result = await User.findOne(query);
    return result;
}

exports.saveOTPForVerification = async(Userfullname,Useremail,Userpassword)=>{
    let otpToken = generateOTP()
    let salt = await bcrypt.genSalt()
    let hashedPassword = await bcrypt.hash(Userpassword ,salt)
    let user = new Otp({
        fullname : Userfullname,
        email : Useremail,
        password : hashedPassword,
        otp : otpToken
    })
    await user.save();
  // send OTP to user via mail
  let mailOptions = {
      from: 'prichith@outlook.com', 
      to: Useremail, 
      subject: 'OTP', 
      text: `Your one time password is ${otpToken}`
      }
  await sendEmail(mailOptions)  //send mail
}

exports.otpVerification = async (query)=>{
    console.log('in service');

    let result = await Otp.findOne(query);
    if (result) { 
        let user = new User({
            fullname : result.fullname,
            email : result.email,
            password : result.password
        })
        user.save()
        console.log(user);

        let deleteQuery = {otp : result.otp}
        let deleteTempData = await Otp.deleteOne(deleteQuery)
    }else{
        console.log("no document in this otp");
    }
    return result
}