const employeeServices = require('../services/employeeServices')

  // CREATE AN EMPLOYEE
  exports.addEmployee = async (req,res) =>{
    try {
      let result = await employeeServices.addEmployee(req.body);  
    if(result) res.send({message:"Employee added succesfully",id : result._id});
    } catch (error) {
      console.error(error);
      res.redirect('/employees')
    }
  };

  // GET ALL EMPLOYEES
  exports.allEmployees = async (req,res) =>{ 
    let users = await employeeServices.allEmployees
    users ? res.send(users) : res.status(500).send({ message : err.message || "Error occured while retrieving user information"})
  }

  // GET AN EMPLOYEE BY ID
  exports.employee = async (req,res)=>{ 
    let idendity = (req.params.id).split('=')[1]
    let user = await employeeServices.employee(idendity)
    user ?  res.send(user) : res.json({message:'Employee not found'})
  }

  // DELETE AN EMPLOYEE BY ID
  exports.deleteEmployee = async (req,res)=>{
    let idendity = (req.params.id).split('=')[1]
    let query = {_id : idendity}
    let result = await employeeServices.deleteEmployee(query)
    result ? res.json({message:"Employee deleted successfully"}) : res.json({message:"Employee deleted failed"})
  }

  // EDIT AN EMPLOYEE
  exports.editEmployee = async (req,res)=>{
    try {
      let result = await employeeServices.editEmployee(req.params.id,req.body)
        result ? res.json({ message: "Employee updated successfully" }) : res.json({ message: "Employee updated failed" })
    } catch (error) {
        console.error("Error updating employee:", error);
    }}

  // POST AVATAR IN EDIT FORM
  exports.postAvatar = async (req,res)=>{
    let result = await employeeServices.postAvatar(req.params.id,{ avatar: req.file.filename })
    result ? res.json({message: 'avatar updated successfully'}) : res.json({message: 'avatar updated failed'}) 
  }

  // PAGINATION
  //controller file
exports.pagination = async (req, res) => {
  let page = parseInt(req.params.page);
  let limit = parseInt(req.params.limit);
  let text = req.params.search;
  let startIndex = (page - 1) * limit;
  let query = {};
  if (text!== 'undefined') {
      query = {
          $or: [
              { firstname: { $regex: text, $options: "i" } },
              { email: { $regex: text, $options: "i" } },
              { phone: { $regex: text, $options: "i" } },
              { state: { $regex: text, $options: "i" } },
              { country: { $regex: text, $options: "i" } }
          ]
      }};

  try {
      let result = await employeeServices.pagination(startIndex, limit, query);
      if (result) {
          res.json({ data: result.finalData[0], totalEmployee: result.totalCount, firstIndex: startIndex });
      } else {
          console.log('Fetching failed');
          res.status(500).json({ error: 'Failed to fetch data' });
      }
  } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}
