const express = require('express')
const route = express.Router()
const employeeController = require('../controller/employeeController')
const path = require('path')
const { generateAvatarId } = require('../email/generateOTP')
const multer = require('multer')

// save avatar into a folder [multer]
const storage = multer.diskStorage({
    destination : (req,file,cb) =>{ cb(null,"assets/img/public/avatars") },
    filename: (req,file,cb) =>{ cb(null,generateAvatarId()+ path.extname(file.originalname)) }
})
const upload = multer({storage : storage})
//END save avatar into a folder

// RestAPI for Employee record
route.get('/employee/:page/:limit/:search',employeeController.pagination)
route.post('/employee',employeeController.addEmployee)
route.get('/employee/:id',employeeController.employee)
route.delete('/employee/:id',employeeController.deleteEmployee)
route.put('/employee/:id',employeeController.editEmployee)
route.put('/employee/:id/avatar',upload.single('avatar') ,employeeController.postAvatar)

module.exports = route