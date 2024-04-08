const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const session = require('express-session')
const connectDB = require('./server/database/connection.js')
const cookies = require('cookie-parser')
const flash = require('connect-flash')

app.use(cookies())

//load env variables
dotenv.config({path:'config.env'}) // merges them into the "process.env" object
const PORT = process.env.PORT || 8080

// log request
app.use(morgan('tiny'))

// mongodb connection
connectDB()

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))  //Parse incoming request bodies
app.use(bodyparser.json())  //used to deal json objects

// set view engine
app.set("view engine","ejs")

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/avatars',express.static(path.resolve(__dirname,"assets/img/public/avatars")))

app.use(session({ secret: 'prichith',cookie : {}, resave: false, saveUninitialized: true }))
app.use(flash())

// load routers
app.use('/', require('./server/routes/usersRouter.js'))
app.use('/', require('./server/routes/employeeRouter.js'))

app.listen(PORT,() => console.log(`server is running on http://localhost:${PORT}`))