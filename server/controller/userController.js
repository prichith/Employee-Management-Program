const userServices = require("../services/userServices");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// load env variables
dotenv.config({ path: "config.env" });
const jwtSecret = process.env.JWT_Secret;

// create and save new user in DB and send otp via email
exports.signUp = async (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content cannot be empty" });
  try {
    let query = { email: req.body.signupEmail };
    let userExist = await userServices.userExist(query);
    let fullname = req.body.signupFullName;
    let email = req.body.signupEmail;
    let password = req.body.signupPassword;
    if(userExist){
      res.send({message:"Email already registered!"})
    }else{
      await userServices.saveOTPForVerification(fullname, email, password);
      res.send({message:"Please verify your OTP",otpSend:true})
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// validate otp
exports.otpverification = async (req, res) => {
  let otpNumber = "";
  for (let i = 1; i < 5; i++) {
    otpNumber += req.body["otp" + i];
  }
  let query = { otp: otpNumber };
  let result = await userServices.otpVerification(query);
  if(result){
  res.redirect("/employees");    
  }else{
    res.redirect('/');
  }
};

// user login
exports.userLogin = async (req, res) => {
  const query = { email: req.body.email };
  let result = await userServices.userExist(query);
  if (!result) {
    res.json({ message: "Cannot find User" });
  }
  try {
    if (await bcrypt.compare(req.body.password, result.password)) {
      let tokens = jwt.sign({ email: req.body.email }, jwtSecret);
      res.cookie("loginToken", tokens, { httpOnly: true });
      await res.redirect("/employees");
    }
  } catch {
    console.error("Error occurred:");
  }
};

exports.logOut = async (req, res) => {
  res.clearCookie("loginToken");
  res.redirect("/");
};

exports.registerLogin = (req, res) => {
  req.user ? res.render("employees") : res.redirect("/");
};
